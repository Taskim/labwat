import {
    Sound,
    GetAllSoundsRequestAction,
    GetAllSoundsSuccessAction,
    GetAllSoundsFailureAction,
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
