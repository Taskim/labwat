import axios from 'axios'

import { RegisterFields, LoginFields } from './types'

export const register = ({ username, email, password }: RegisterFields) => {
    return axios
        .post('api/users', {
            username,
            email,
            password,
        })
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data.message)
        })
}

export const login = ({ email, password }: LoginFields) => {
    return axios
        .post('api/session', {
            email,
            password,
        })
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        })
}

export const logout = () => axios.delete('api/session')
