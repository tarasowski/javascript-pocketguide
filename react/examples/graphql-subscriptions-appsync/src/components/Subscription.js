import React from "react";
import { Subscription } from "react-apollo";
import { gql } from "apollo-boost";

const newNums = gql`
  subscription {
    newNum
  }
`

export default () => (
  <Subscription subscription={newNums}>
    {({ data }) => {
      return <h3>Newest num: {!data ? "waiting..." : data.newNum}</h3>;
    }}
  </Subscription>
);
