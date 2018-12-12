# Redux with Dan Abramov

[Source](https://egghead.io/lessons/react-redux-writing-a-counter-reducer-with-tests)

```js
const test = require('tape')
const expect = require('expect')

// The first principle is that you are going to represent the whole state of your application as a single JS object (state or state tree)

// The second principle of redux is that the state tree is read-only, you can modify or write to it. Instead if you want to change or modify the state you need to dispatch an action
// a) an action is a plain JS object describing the change, the action is the minimal representation of the change of the data. The only requirement has a type property

// When you need to change the state the components don't know what is going to be changes, they only need to dispatch an action. This is the only thing they know.

const showFilterAction = () => ({ filter: 'SHOW_COMPLETED', type: 'SET_VISIBILITY_FILTER' })

// The UI layer is more predictable when it is described as a pure function of the application state.
// In Redux the state mutation needs to be described as a pure function that takes the previous state and action being dispatched and returns the next state of your application

// The third principles in Redux is in order to change the state you have to write a function. That takes the previous state of the app, the action being dispatched and returns the next state of the app. This function has to be PURE. This function is called the reducer!

// If reducer receives undefined as the state argument, it must return what is considers to be the initial state of the application. In this case it's 0.

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }

}

expect(
    counter(0, { type: 'INCREMENT' })
).toEqual(1)

expect(
    counter(1, { type: 'INCREMENT' })
).toEqual(2)

expect(
    counter(2, { type: 'DECREMENT' })
).toEqual(1)

expect(
    counter(1, { type: 'DECREMENT' })
).toEqual(0)

expect(
    counter(1, { type: 'SOMETHING' })
).toEqual(1)

```

## Redux Store Implementation

```js
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }

}

//import { createStore } from 'redux'

const createStore = (reducer) => {
    let state
    let listeners = []
    const getState = () =>
        state
    const dispatch = action => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }
    const subscribe = listener => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }
    dispatch({})
    return { getState, dispatch, subscribe }
}

const store = createStore(counter)

const render = () =>
    document.body.innerText = store.getState()

store.subscribe(render)
render()

document.addEventListener('click', () =>
    store.dispatch({ type: 'INCREMENT' }))
```

## deepFreeze & Immutability with Arrays

```js
'use strict'
const expect = require('expect')
const deepFreeze = require('./node_modules/deep-freeze')


const addCounter = list =>
    [...list, 0]


const removeCounter = list => index =>
    [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ]

const incrementCounter = list => index =>
    [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
    ]


const testAddCounter = before => after =>
    expect(
        addCounter(deepFreeze(before)) // deepFreeze makes the value immutable
    ).toEqual(after)


testAddCounter([])([0])

const testRemoveCounter = before => after =>
    expect(
        removeCounter(deepFreeze(before))(1)
    ).toEqual(after)

testRemoveCounter([0, 10, 20])([0, 20])

const testIncrementCounter = before => after =>
    expect(
        incrementCounter(deepFreeze(before))(1) // deepFreeze makes the value immutable
    ).toEqual(after)


testIncrementCounter([0, 10, 20])([0, 11, 20])
```
## deepFreeze && Immutability with Objects

```js
'use strict'
const expect = require('expect')
const deepFreeze = require('./node_modules/deep-freeze')


const toggleTodo = todo =>
    ({
        ...todo,
        completed: !todo.completed
    })

//this is mutable version
// const toggleTodo = todo => {
//     todo.completed = !todo.completed
//     return todo
// }


const testToggleTodo = before => after =>
    expect(
        toggleTodo(deepFreeze(before))
    ).toEqual(after)


testToggleTodo(
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    })(
        {
            id: 0,
            text: 'Learn Redux',
            completed: true
        }
    )
```
## Todos Reducer Example

```js
'use strict'
const expect = require('expect')
const deepFreeze = require('./node_modules/deep-freeze')


const todos = (state = []) => action =>
    action.type === 'ADD_TODO'
        ? [...state, { id: action.id, text: action.text, completed: false }]
        : state

const testAddTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)


testAddTodo([])({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
})([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    }
])
```
## Toggle Todo Example

```js
'use strict'
const expect = require('expect')
const deepFreeze = require('./node_modules/deep-freeze')


const todos = (state = []) => action => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: action.id, text: action.text, completed: false }]
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.id
                    ? { ...todo, completed: !todo.completed }
                    : todo)
        default:
            return state
    }
}

const testAddTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)


testAddTodo([])({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
})([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    }
])

const testToggleTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action)) // reducer must be a pure function, therefore we use deepFreeze to make the values immutable so if reducers tries to modify a value instead of returning a new one, it's going to show an error: TypeError: Cannot assign to read only property 'completed' of object '#<Object>' 
    ).toEqual(after)

testToggleTodo([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: false
    }
])(
    {
        id: 1,
        type: 'TOGGLE_TODO'
    }
)([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: true
    }
])
```
## Toggle Todo Reducer Composition

```js
'use strict'
const expect = require('expect')
const deepFreeze = require('./node_modules/deep-freeze')

const todo = todo => action => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            return todo.id === action.id
                ? { ...todo, completed: !todo.completed }
                : todo
        default:
            return todo
    }
}


const todos = (state = []) => action => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo(undefined)(action)]
        case 'TOGGLE_TODO':
            return state.map(td => todo(td)(action))
        default:
            return state
    }
}

const testAddTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)


testAddTodo([])({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
})([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    }
])

const testToggleTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action)) // reducer must be a pure function, therefore we use deepFreeze to make the values immutable so if reducers tries to modify a value instead of returning a new one, it's going to show an error: TypeError: Cannot assign to read only property 'completed' of object '#<Object>' 
    ).toEqual(after)

testToggleTodo([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: false
    }
])(
    {
        id: 1,
        type: 'TOGGLE_TODO'
    }
)([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: true
    }
])
```
## Combined Reducers

```js
'use strict'
const expect = require('expect')
const deepFreeze = require('./node_modules/deep-freeze')
const combineReducers = require('./src/utils/combine-reducers')

const todo = (todo = {}) => action => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            return todo.id === action.id
                ? { ...todo, completed: !todo.completed }
                : todo
        default:
            return todo
    }
}


const todos = (state = []) => action => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo(undefined)(action)]
        case 'TOGGLE_TODO':
            return state.map(td => todo(td)(action))
        default:
            return state
    }
}

const visibilityFilter = (state = 'SHOW_ALL') => action => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}


const todoApp = combineReducers({
    todos: todos, // key = state field, value = reducer function
    visibilityFilter: visibilityFilter // key = state field, value = reducer function
})


const testSetVisitiblityFilter = before => action => after =>
    expect(
        todoApp(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)

testSetVisitiblityFilter('')(
    {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'SHOW_COMPLETED'
    })
    ({
        todos: [],
        visibilityFilter: 'SHOW_COMPLETED'
    })

const testAddTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)


testAddTodo([])({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
})([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    }
])

const testToggleTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action)) // reducer must be a pure function, therefore we use deepFreeze to make the values immutable so if reducers tries to modify a value instead of returning a new one, it's going to show an error: TypeError: Cannot assign to read only property 'completed' of object '#<Object>' 
    ).toEqual(after)

testToggleTodo([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: false
    }
])(
    {
        id: 1,
        type: 'TOGGLE_TODO'
    }
)([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: true
    }
])
```
