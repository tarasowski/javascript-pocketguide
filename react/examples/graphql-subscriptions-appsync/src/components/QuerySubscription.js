import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import List from './List'

const getNums = gql`
  {
    getNums
  }
`;

const newNums = gql`
  subscription {
    newNum
  }
`;


export default () => (
    <Query query={getNums}>
        {({ subscribeToMore, ...result }) => (
            < List
                {...result}
                subscribeToNewNumbers={() =>
                    subscribeToMore({
                        document: newNums,
                        updateQuery: (prev, { subscriptionData }) => {
                            if (!subscriptionData.data) return prev;
                            const { newNum } = subscriptionData.data;
                            return {
                                ...prev,
                                getNums: [...prev.getNums, newNum]
                            }
                        }
                    })
                }
            />
        )}
    </Query>
);