import { createStore, applyMiddleware } from 'redux'
import combinedReducer from './combinedReducer'
import thunk from 'redux-thunk'

export default function (state = {}) {
    let composeStore
    const store = createStore(combinedReducer, state, applyMiddleware(thunk))
    return store
}

