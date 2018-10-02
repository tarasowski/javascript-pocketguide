import React, { Component } from 'react'

class List extends Component {
    render() {
        if (this.props.loading) return `Loading...`
        return (
            <div>{this.props.data.getNums.map((x, i, a) => <h3 key={i}>{x}</h3>)}</div>
        )

    }
    componentDidMount() {
        this.props.subscribeToNewNumbers();
    }
}

export default List