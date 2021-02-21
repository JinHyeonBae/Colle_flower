
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from './jwt.js'
import { PubSub } from 'graphql-subscriptions';
import { AuthenticationError } from 'apollo-server';

const pubsub = new PubSub();


const verifyJWT = (context) => {
    if(!context.req.headers.authorization)
        return new Error("인증이 되지 않은 사용자입니다.");

    if (context.req && context.req.headers.authorization) {
        const token = context.req.headers.authorization.split('Bearer ')[1]
        console.log("token", token)
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            console.log("decode : ",decodedToken)
            context.user = decodedToken;
        })
    }
    console.log("user =", context.user);
    //console.log("context :",context);
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