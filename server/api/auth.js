
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from './jwt.js'
import { PubSub } from 'graphql-subscriptions';
import { AuthenticationError } from 'apollo-server';

const pubsub = new PubSub();


const verifyWebsocket = (params)=>{
    if(!params)
        new AuthenticationError("subscription failed");

    const promise = new Promise((resolve, reject)=>{
        const token = params.split('Bearer ')[1];
        const decode = jwt.verify(token, JWT_SECRET);
        resolve(token);
    })
    return promise;
};

const verifyJWT = async (context) => { //
    
    const auth = await context.req.headers.authorization;

    if(!auth)
        return new Error("인증이 되지 않은 사용자입니다.");

    if (context.req && auth) {
        const token = auth.split('Bearer ')[1]
        console.log("token", token)
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            console.log("decode : ",decodedToken)
            context.user = decodedToken;
        })
    }
    console.log("user =", context.user);
    return {context ,pubsub};
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

export default verifyJWT;