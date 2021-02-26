
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './jwt.js'
import { PubSub } from 'graphql-subscriptions';
import { AuthenticationError } from 'apollo-server';

export const verifyWebsocket = (params) => {
    console.log("there is verifyWebsocket");
    if (!params)
        new AuthenticationError("subscription failed");
   
    const promise = new Promise((resolve, reject) => {
        const token = params.split('Bearer ')[1];
        const decode = jwt.verify(token, JWT_SECRET);
        resolve(decode);
    })
    console.log("promise value :",promise)
    return promise;
};

//context에 websocket도 접근...
//토큰이 있다면 헤더에 담겨서 올테니까
export const verifyJWT = async (req) => { //subscription할 때도 여기로 들어간다..
        console.log("there is verifyJWT");
        const auth = await req.headers.authorization;

        if (!auth)
            return new Error("인증이 되지 않은 사용자입니다.");

        //토큰으로 유저를 가져와서 다시 되돌려주는데, 이는 context로 resolver들에게 전달되므로 모든 리졸버가 user에 접근 가능

        const token = auth.split('Bearer ')[1]
        const user = jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            return decodedToken;
        })
        //if (!user) throw new AuthenticationError('you must be logged in');
        
    return { user };
}

// user
// const getUser = async auth =>{
//     if(!auth) throw new AuthenticationError('you must be logged in!');

//     const user = jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
//         console.log("decode : ",decodedToken)
//         return decodedToken;
//     });
//     return user;
// }
