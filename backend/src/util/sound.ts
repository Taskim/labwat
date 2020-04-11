import { v4 as uuidv4 } from 'uuid'

export const setDropboxDownloadParamater = (url: string): string =>
    url.replace(/(dl=).*?(&|$)/g, '$1' + '1' + '$2')

export const replaceFilenameByUuid = (filename: string): string =>
    filename.replace(/.*(?=\.)/g, uuidv4())
