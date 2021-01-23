import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {graphqlHTTP} from 'express-graphql';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import cors from 'cors';

import typeDefs from './typeDefs.js';
import resolvers from './resolver.js';
import Channel from './routes/Channel.js'
const app = express();
const __dirname = path.resolve();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
// app.use(/\/((?!graphql).)*/, bodyParser.json());
// app.use(bodyParser.json({ type: 'application/graphql' }));

const schema = makeExecutableSchema({typeDefs, resolvers})


console.log(resolvers.Query.Channel());

//graphql 스키마를 기반으로 express 애플리케이션 구성
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

// apollo server express의 모듈을 각 API에 맵핑.
const server = new ApolloServer({
    schema : schema,
    playground : true
})

//apollo server와 http 프레임워크를 연결해줌
server.applyMiddleware({
    app,
    path:'/graphql'
});


app.listen({port : 3002}, ()=>{
    console.log('server is open');
})

export default app;
