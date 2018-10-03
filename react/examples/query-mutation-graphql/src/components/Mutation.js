import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { gql } from 'apollo-boost'


const GET_TODOS = gql`
query getAllTodos {
    getTodos {
        id
        type            
    }
}
`

const ADD_TODO = gql`
mutation addNewTodo($type: String!) {
    addTodo(type: $type) {
        id
        type
    }
}
`

const QueryBlock = () => (
    <Query query={GET_TODOS}>
        {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error: ${error.message}`
            return (
                <ul>
                    {data.getTodos.map(element => (
                        < li key={element.type} > {element.type}</li>
                    )
                    )}
                </ul>
            )
        }}
    </Query>
)

const update = (cache, { data: { addTodo } }) => {
    if (addTodo) {
        console.log('this is the addTodo result', addTodo)
        const { getTodos } = cache.readQuery({ query: GET_TODOS })
        console.log('this comes from update', getTodos)
        cache.writeQuery({
            query: GET_TODOS,
            data: { getTodos: getTodos.concat([addTodo]) }
        })
    }
}


const QueryMutation = () => {
    let input
    return (
        <>
            <Mutation mutation={ADD_TODO} update={update}>
                {(mutate) => (
                    < div >
                        <form onSubmit={e => {
                            e.preventDefault()
                            mutate({ variables: { type: input.value } })
                            input.value = ""
                        }}
                        >
                            <input ref={node => {
                                input = node
                            }}
                            />
                            <button type="submit">Add Todo</button>
                        </form>
                    </div>
                )}
            </Mutation>
            <QueryBlock />
        </>
    )
}




export default QueryMutation