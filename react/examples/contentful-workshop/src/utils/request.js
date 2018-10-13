import axios from 'axios'

export const get = (url, params) => {
    return axios.get(url, params)
}

export const post = (url, params) => {
    return axios.post(url, params)
}