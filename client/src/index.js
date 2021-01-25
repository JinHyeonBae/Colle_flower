import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks';
import {createHttpLink} from 'apollo-link-http';


//연동할 graphql 서버의 uri를 설정해야해야 함.

const httpLinks = createHttpLink({
  uri :'/graphql'
});

const client = new ApolloClient({
  link : httpLinks,
  cache: new InMemoryCache()
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
