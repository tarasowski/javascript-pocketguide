export default function (state = {
    busy: false,
    repoDetails: null,
    history: []
}, action) {
    switch (action.type) {
        case 'SET_BUSY':
            return {
                ...state,
                busy: action.data.busy
            }
        case 'STORE_RESULT':
            return {
                ...state,
                repoDetails: action.data,
                history: [...state.history, action.data.userInfo]
            }
        default:
            return state
    }
}