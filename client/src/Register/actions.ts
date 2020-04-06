import {
    Fields,
    RegisterRequestActionType,
    RegisterSuccessActionType,
    RegisterFailureActionType,
} from './types'

export const registerRequest = (fields: Fields): RegisterRequestActionType => ({
    type: 'register/REGISTER_REQUEST',
    fields,
})

export const registerSucess = (response: any): RegisterSuccessActionType => ({
    type: 'register/REGISTER_SUCCESS',
    response,
})

export const registerFailure = (error: string): RegisterFailureActionType => ({
    type: 'register/REGISTER_FAILURE',
    error,
})
