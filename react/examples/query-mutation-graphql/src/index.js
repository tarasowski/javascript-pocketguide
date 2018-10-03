import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { ApolloProvider } from 'react-apollo'
import AWSAppSyncClient from 'aws-appsync'
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";

const client = new AWSAppSyncClient({
    url: 'https://btg2p6d6ibeknm2rmav3jxa23e.appsync-api.eu-west-1.amazonaws.com/graphql',
    region: 'eu-west-1',
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: 'TOKEN'
    }
})


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
