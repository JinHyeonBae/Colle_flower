import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {graphqlHTTP} from 'express-graphql';
import { ApolloServer, AuthenticationError, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { PubSub } from 'graphql-subscriptions';

import typeDefs from './typeDefs/typeDefs.js';
import resolvers from './resolvers/ChattingResolver.js';
import auth from './api/auth.js'
import jwt from 'jsonwebtoken'

const app = express();
const PORT = 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('port', process.env.PORT || 4000);

//const schema = makeExecutableSchema({typeDefs, resolvers})

app.use('/graphql', bodyParser.json());

const formatError = (err) => {
    console.error("--- GraphQL Error ---")
    console.error("Path:", err.path)
    console.error("Message:", err.message)
    console.error("Code:", err.extensions.code)
    console.error("Original Error", err.originalError)
    return err
}

// apollo server express의 모듈을 각 API에 맵핑.
const server = new ApolloServer({
    typeDefs : typeDefs,
    resolvers : resolvers,
    context : auth,
    playground : true,
    tracing: true,
    subscriptions : {
        path: '/subscriptions',
        keepAlive : 1,
        onConnect: (connectionParams, webSocket,context) => {
            console.log("Subscription ok!");
        },
        onDisconnect:(WebSocket,context)=>{
            console.log("Subscription disconnect!")
        }
    },
    formatError,
    engine : true
})


//server 객체를 하나 더 만들고 등록해주니 되네
const httpServer = http.createServer(app);

server.applyMiddleware({app,path:'/graphql'});
server.installSubscriptionHandlers(httpServer);
//웹소켓을 구동시키는 함수. subscroption 기능을 사용할 때 필요한 핸들러가 아폴로 서버에 추가됨
//이제 ws로 들어오는 요청도 받을 수 있도록 준비 완료. 

httpServer.listen(PORT, ()=>{
    console.log(`Apollo Server is now running on http://localhost:${PORT}`);
    console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
})

export default app;
