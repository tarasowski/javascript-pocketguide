import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

// GraphQL
// https://code.tutsplus.com/tutorials/code-an-app-with-graphql-react-native-and-aws-appsync-the-app--cms-30569
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';

// Components
import Data from './components/data'


const client = new AWSAppSyncClient({
  url: 'https://mivapprffrazfbqgid7f3ivw2q.appsync-api.eu-west-1.amazonaws.com/graphql',
  region: 'eu-west-1',
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => {
      let session = await Auth.currentSession()
      return session.accessToken.jwtToken
    }      
  }
})




class App extends Component {
  displayMessage = () => {
    const data = this.props.data
    if (data.loading) {
      return <h1>Loading ....</h1>
    } else {
      return <h1>{this.props.data}</h1>
    }

  }
  render() {
    return (
      <ApolloProvider client={client}>
      <Rehydrated>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>You are authenticated!</p>
        <Data />
      </div>
      </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default withAuthenticator(App);
