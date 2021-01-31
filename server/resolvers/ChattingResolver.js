import { UserInputError } from 'apollo-server-express';
import { introspectionFromSchema } from 'graphql';
import { connection } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import {PubSub} from 'graphql-subscriptions';

const pubsub = new PubSub();
const MSG_ADD = 'MSG_ADD';

// 채팅방을 만들었을 시 서버코드를 클라이언트에게 보내므로, GET 요청을 보낼 때는 반드시 서버 코드가 있음
// 서버코드로 채널을 구별하므로 각자 서버코드에 맞는 채팅방을 보내야 함.  
// 채널에는 서로 고유의 서버코드 존재함 그걸 구별해주는 것이 채널 테이블
// 채널 테이블이 굳이 필요한 이유는?

const ChattingResolver = {
    Query: {
        Channel: async (_,{StuNumber}) => {
            console.log("S :",StuNumber)
            let Room=[];
            const [rows, field] = await connection.promise().query(`SELECT * from channel where StuNumber="${StuNumber}"`);

            return rows;
        },
        getMessage: async (parent, {ServerCode})=>{  
            
            const [rows, field] = await connection.promise().query(`SELECT * from messages where ServerCode="${ServerCode}"`);
            console.log("m :", rows);
            return rows;
        }   
    },
    Mutation: {
        CreateChannel: async (_, { Host, ChannelTitle, TeamMember,StuNumber }) => {
            console.log("studentNum :",StuNumber);
            console.log("host :",Host);
            
            const id = await uuid();
            let ServerCode;
            console.log("id :",id);
            
            if(id)
                ServerCode = `http://colleflower/pknu${StuNumber}/${id}`;

            connection.promise().query(`insert into channel(Host,ChannelTitle,TeamMember,ServerCode,StuNumber) Values ("${Host}","${ChannelTitle}","${TeamMember}", "${ServerCode}", "${StuNumber}")`);
            //console.log(rows);
            return 1;
        },
        SendMessage: async (parent, args, context)=>{
            try{
                // user authentication 확인
                // 보내는 당사자가 *이면 채팅방에, To가 명확히 나와있으면 일대일 
                // const recipient = await connection.promise().query(`SELECT TeamMember from channel where ServerCode="${ServerCode}"`);
                // console.log(parent);
                pubsub.publish(MSG_ADD, {
                    newChat : args
                })

                const msgId = uuid();
                const [rows, err] = await connection.promise().query(`insert into messages(MsgFrom,MsgTo,CreatedAt,MessageContent,MessageId,ServerCode) Values ("${args.MsgFrom}","${args.MsgTo}","${args.CreatedAt}","${args.MessageContent}","${msgId}","${args.ServerCode}")`);
                return 1;
                  
            }
            catch(err){
                throw err;
            }
        }
    },
    Subscription:{
        newChat:{
            subscribe : ()=>pubsub.asyncIterator([MSG_ADD])
        }
    }   
}

export default ChattingResolver;

