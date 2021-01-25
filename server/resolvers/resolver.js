import { UserInputError } from 'apollo-server-express';
import { introspectionFromSchema } from 'graphql';
import { connection } from '../config/db.js';


// 채팅방을 만들었을 시 서버코드를 클라이언트에게 보내므로, GET 요청을 보낼 때는 반드시 서버 코드가 있음
// 서버코드로 채널을 구별하므로 각자 서버코드에 맞는 채팅방을 보내야 함.  
// 채널에는 서로 고유의 서버코드 존재함 그걸 구별해주는 것이 채널 테이블
// 채널 테이블이 굳이 필요한 이유는?

const resolver = {
    Query: {
        Channel: async (_,{ServerCode}) => {
            let result, Team=[];
            const [rows, field] = await connection.promise().query(`SELECT * from channel`);
            console.log(rows);

            rows.map((element,index)=>{
                Team.push(element.TeamMember);
            })

            result = {
                "Host" :rows[0].Host,
                "ChannelTitle" : rows[0].ChannelTitle,
                "ServerCode": rows[0].Servercode,
                "TeamMember": Team
            }
            console.log(result)
            return result;
        }
    },
    Mutation: {
        CreateChannel: (_, { Host, ChannelTitle, TeamMember }) => {
            //servercode는.. 또 암호화를 해야하는데요.
            console.log(ChannelTitle);
            connection.query(`insert into channel(Host,ChannelTitle,TeamMember) Values ("${Host}","${ChannelTitle}","${TeamMember}")`, (err, rows, field) => {
                if (err) throw err;
                console.log(rows);
            });
            return 1;
        },
    //     sendMessage : async(parent, {To, From, ServerCode, MessageContent, CreatedAt}, context)=>{
    //         try{
    //             //user authentication 확인
    //             //보내는 당사자가 *이면 채팅방에, To가 명확히 나와있으면 일대일 
    //             const recipient = await connection.promise().query(`SELECT TeamMember from channel`);
    //             console.log(parent);
                
    //             if(MessageContent.trim() === '')
    //                 throw new UserInputError('Message is empty');
    //             const message = await connection.promise().query(`insert into messages(From, To, CreatedAt, MessageContent) values("${From}", "${To}", "${CreatedAt}", "${MessageContent}")`);
    //             console.log(message);     
    //         }
    //         catch(err){
    //             throw err;
    //         }
    //     }
    // }
    }   
}

export default resolver;

