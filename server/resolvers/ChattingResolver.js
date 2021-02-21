import { UserInputError } from 'apollo-server-express';
import { introspectionFromSchema } from 'graphql';
import { connection } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../api/jwt.js'
const MSG_ADD = "MSGADD";
// 채팅방을 만들었을 시 서버코드를 클라이언트에게 보내므로, GET 요청을 보낼 때는 반드시 서버 코드가 있음
// 서버코드로 채널을 구별하므로 각자 서버코드에 맞는 채팅방을 보내야 함.  
// 채널에는 서로 고유의 서버코드 존재함 그걸 구별해주는 것이 채널 테이블
// 채널 테이블이 굳이 필요한 이유는?


const ChattingResolver = {
    Query: {
        Channel: async (_, { StuNumber }) => {
            const [rows, field] = await connection.promise().query(`SELECT * from Chatting where StuNumber="1111"`);

            return rows;
        },
        getMessage: async (parent, { ServerCode }) => {
            const [rows, field] = await connection.promise().query(`SELECT * from Messages where ServerCode="${ServerCode}" ORDER BY CreatedAt`);

            console.log("row :", rows);
            return rows;
        },
        userLogin: async (_, { nickname, password }) => {

            const [rows] = await connection.promise().query(`SELECT * from user where NickName="${nickname}" && UserPassword="${password}"`);
           
            let AccessToken, RefreshToken;
            
            if (rows[0].NickName == undefined)
                return new Error("정보가 틀렸습니다.")

            AccessToken = jwt.sign({ nickname }, JWT_SECRET, { expiresIn: 60 * 60 });
            console.log("token :", AccessToken);

            return {
                AccessToken: AccessToken,
                NickName : rows[0].NickName
            };
            //회원가입 후 로그인의 인증 방식이므로 회원가입에서 찾고난 후 토큰을 발급
        },

    },
    Mutation: {
        CreateChannel: async (_, { HostMember, ChannelTitle, TeamMember, StuNumber }) => {
            const id = await uuid();
            let ServerCode;
            console.log("id :", id);

            if (id)
                ServerCode = `pknu${StuNumber}${id}`;

            await connection.promise().query(`insert into Chatting(HostMember,ChannelTitle,TeamMember,ServerCode,StuNumber) Values ("${HostMember}","${ChannelTitle}","${TeamMember}", "${ServerCode}", "${StuNumber}")`);
            return 1;
        },
        SendMessage: async (_, args, context) => {
            const msgId = uuid();
            console.log(typeof args.CreatedAt)
            const integerDate = parseInt(args.CreatedAt);

            await connection.promise().query(`insert into Messages(MsgFrom,MsgTo,CreatedAt,MessageContent,MessageId,ServerCode) Values ("${args.MsgFrom}","${args.MsgTo}","${args.CreatedAt}","${args.MessageContent}","${msgId}","${args.ServerCode}")`);

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

