import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {graphqlHTTP} from 'express-graphql';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';

import typeDefs from './typeDefs/typeDefs.js';
import resolvers from './resolvers/ChattingResolver.js';


const app = express();
const __dirname = path.resolve();
const PORT = 3002;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('port', process.env.PORT || 3002);

const schema = makeExecutableSchema({typeDefs, resolvers})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

// apollo server express의 모듈을 각 API에 맵핑.
const server = new ApolloServer({
    schema : schema,
    playground : true,
    context : async({req, connection})=>{
        if(connection)
            return connection.context
    },
    subscriptions :{
        path: '/subscriptions',
        onConnect: (connectionParams, webSocket) => {
            console.log("Subscription ok!");
        }
    }
})

server.applyMiddleware({
    app,
    path:'/graphql'
});

//server 객체를 하나 더 만들고 등록해주니 되네
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, ()=>{
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})

export default app;
