import {
    Sound,
    GetAllSoundsRequestAction,
    GetAllSoundsSuccessAction,
    GetAllSoundsFailureAction,
    UploadSoundRequestAction,
    UploadSoundSuccessAction,
    UploadSoundFailureAction,
    UploadFields,
} from './types'

export const getAllSoundsRequest = (): GetAllSoundsRequestAction => ({
    type: 'dashboard/GET_ALL_SOUNDS_REQUEST',
})

export const getAllSoundsSuccess = (
    sounds: Sound[]
): GetAllSoundsSuccessAction => ({
    type: 'dashboard/GET_ALL_SOUNDS_SUCCESS',
    sounds,
})

export const getAllSoundsFailure = (
    error: string
): GetAllSoundsFailureAction => ({
    type: 'dashboard/GET_ALL_SOUNDS_FAILURE',
    error,
})

export const uploadSoundRequest = (
    fields: UploadFields
): UploadSoundRequestAction => ({
    type: 'dashboard/UPLOAD_SOUND_REQUEST',
    fields,
})

export const uploadSoundSuccess = (sound: Sound): UploadSoundSuccessAction => ({
    type: 'dashboard/UPLOAD_SOUND_SUCCESS',
    sound,
})

export const uploadSoundFailure = (
    error: string
): UploadSoundFailureAction => ({
    type: 'dashboard/UPLOAD_SOUND_FAILURE',
    error,
})
