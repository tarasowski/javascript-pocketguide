import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const query = gql`query data { get }`

class Data extends Component {
    displayMessage = () => {
        const data = this.props.data
        if (data.loading) {
            return (<div>Loading....</div>)
        } else {
            return (<div>{data.get}</div>)
        }
    }
    render() {
        return (
            <div>{this.displayMessage()}</div>

        )
    }
}


export default graphql(query)(Data)