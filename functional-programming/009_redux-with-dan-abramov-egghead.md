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
