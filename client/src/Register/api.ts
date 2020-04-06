import axios from 'axios'

import { Fields } from './types'

const API_URL = 'http://localhost:8080/'

export const register = ({ username, email, password }: Fields) => {
    return axios.post(API_URL + 'register', {
        username,
        email,
        password,
    })
}
