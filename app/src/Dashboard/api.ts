import axios from 'axios'

import { UploadFields } from './types'

export const getAllSounds = () => {
    return axios.get('api/sound/all').then((response) => response.data)
}

export const upload = ({ name, file, svgPaths }: UploadFields) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)
    formData.append('svgPaths', 'todo')
    return axios({
        method: 'post',
        url: 'api/sound/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => response.data)
}
