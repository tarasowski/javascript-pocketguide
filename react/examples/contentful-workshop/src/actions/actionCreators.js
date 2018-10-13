import { get } from '../utils/request'
import { setBusy, storeResult } from '../actions/actions'

export const searchActionCreator = (userName) => {
    return dispatch => {
        dispatch(setBusy(true))
        return get(`https://github-user.now.sh?username=${userName}`)
            .then(data => {
                dispatch(setBusy(false))
                console.log(data)
                dispatch(storeResult(data.data))
            })
    }
}