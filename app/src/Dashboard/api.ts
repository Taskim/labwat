import axios from 'axios'

export const getAllSounds = () => {
    return axios.get('api/sound/all').then((response) => response.data)
}
