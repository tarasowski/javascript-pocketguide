import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import AWSAppSyncClient from 'aws-appsync'
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { ApolloProvider } from 'react-apollo';


import Subscription from "./components/Subscription";
import QuerySubscription from "./components/QuerySubscription";

const client = new AWSAppSyncClient({
  url: 'https://cc7ppvtfd5gxrcmufktnudqliy.appsync-api.eu-west-1.amazonaws.com/graphql',
  region: 'eu-west-1',
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: 'da2-vumpzveckzb53pou3yjuovefny'
  }
})

const addNum = gql`
mutation add {
	addNums(numberToAdd: 9080)
}
`

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <div>
            <h1>Query with subscribeToMore</h1>
            <QuerySubscription />
          </div>
          <div style={{ width: 300, display: "flex", justifyContent: "center" }}>
            <Mutation mutation={addNum}>
              {mutate => (
                <div>
                  <button onClick={mutate}>Add Number</button>
                </div>
              )}
            </Mutation>
          </div>
          <div>
            <h1>Subscription component</h1>
            {/* <Subscription /> */}
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App
