import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { onError } from "@apollo/client/link/error";
import {setContext} from  '@apollo/client/link/context';


//연동할 graphql 서버의 uri를 설정해야해야 함.

let httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

httpLink = authLink.concat(httpLink);

//terminating link. it sends data to server and accepts returning data
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      // Pass any arguments you want for initialization
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
})


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

splitLink.setOnError((err) =>{
  console.log("e:", err)
})



//uri를 http로 쓰니까 ws가 다 무시된건가? 옵션의 명을 잘 봐야겠다
//apolloClient에서의 authorization은 뭐지? authLink를 만들어주는 것과 client에서 authrization 옵션은 뭐가 다른 걸까
const client = new ApolloClient({
  link : splitLink,
  cache: new InMemoryCache({
    typePolicies:{
      Channel : {
        keyFields : ["ServerCode"]
      }
    }
  }),
});
//for fetching data


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
