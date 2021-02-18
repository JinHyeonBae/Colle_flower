import { UserInputError } from 'apollo-server-express';
import { introspectionFromSchema } from 'graphql';
import { connection } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import {PubSub} from 'apollo-server-express'

const MSG_ADD = "MSGADD";

// 채팅방을 만들었을 시 서버코드를 클라이언트에게 보내므로, GET 요청을 보낼 때는 반드시 서버 코드가 있음
// 서버코드로 채널을 구별하므로 각자 서버코드에 맞는 채팅방을 보내야 함.  
// 채널에는 서로 고유의 서버코드 존재함 그걸 구별해주는 것이 채널 테이블
// 채널 테이블이 굳이 필요한 이유는?


const ChattingResolver = {
    Query: {
        Channel: async (_, { StuNumber }) => {
            const [rows, field] = await connection.promise().query(`SELECT * from channel where StuNumber="${StuNumber}"`);
            return rows;
        },
        getMessage: async (parent, { ServerCode }) => {
            const [rows, field] = await connection.promise().query(`SELECT * from messages where ServerCode="${ServerCode}" ORDER BY CreatedAt`);
            
            console.log("row :",rows);
            return rows;
        }
    },
    Mutation: {
        CreateChannel: async (_, { Host, ChannelTitle, TeamMember, StuNumber }) => {
            const id = await uuid();
            let ServerCode;
            console.log("id :", id);

            if (id)
                ServerCode = `pknu${StuNumber}/${id}`;

            await connection.promise().query(`insert into channel(Host,ChannelTitle,TeamMember,ServerCode,StuNumber) Values ("${Host}","${ChannelTitle}","${TeamMember}", "${ServerCode}", "${StuNumber}")`);
            return 1;
        },
        SendMessage: async (_, args, context) => {
            const msgId = uuid();
            console.log(typeof args.CreatedAt)
            const integerDate = parseInt(args.CreatedAt);
            
            await connection.promise().query(`insert into messages(MsgFrom,MsgTo,CreatedAt,MessageContent,MessageId,ServerCode) Values ("${args.MsgFrom}","${args.MsgTo}","${args.CreatedAt}","${args.MessageContent}","${msgId}","${args.ServerCode}")`);

            //이벤트와 데이터를 subscription Resolver로 전송하는 매커니즘
            context.pubsub.publish(MSG_ADD, { newChat: args })

            return args
        }
    },
    Subscription: {
        newChat: {
            // Manipulate and return the new value => resolve
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(MSG_ADD)
        }
    }
}

export default ChattingResolver;

