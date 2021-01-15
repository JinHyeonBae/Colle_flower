import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typeDefs.js';
import resolvers from './resolver.js';

const app = express();
const __dirname = path.resolve();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const schema = makeExecutableSchema({typeDefs, resolvers})

// apollo server express의 모듈을 각 API에 맵핑.

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({
    app,
    path:'/graphql'
});

app.listen({port : 3002}, ()=>{
    console.log('server is open');
})



export default app;
