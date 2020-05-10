import { v4 as uuidv4 } from 'uuid'

// this function set the parameter dl to 1 and replace the dropbox url by dl.dropboxusercontent
// in order to avoid bugs on safari: resetting the sound current time
export const setDropboxDownloadParamater = (url: string): string =>
    url
        .replace(/(dl=).*?(&|$)/g, '$1' + '1' + '$2')
        .replace('www.dropbox', 'dl.dropboxusercontent')

export const replaceFilenameByUuid = (filename: string): string =>
    filename.replace(/.*(?=\.)/g, uuidv4())
