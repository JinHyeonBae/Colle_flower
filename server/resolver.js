import { introspectionFromSchema } from 'graphql';
import { connection } from './config/db.js';

// 음.. 
const resolver = {
    Query: {
        Channel: async () => {
            let result, Team=[];
            const [rows, field] = await connection.promise().query('SELECT * from channel');
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
        }
    }
}

export default resolver;

