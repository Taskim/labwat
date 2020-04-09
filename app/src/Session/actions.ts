import {
    LoginFields,
    RegisterFields,
    User,
    RegisterRequestActionType,
    RegisterSuccessActionType,
    RegisterFailureActionType,
    LoginRequestActionType,
    LoginSuccessActionType,
    LoginFailureActionType,
} from './types'

export const registerRequest = (
    fields: RegisterFields
): RegisterRequestActionType => ({
    type: 'login/REGISTER_REQUEST',
    fields,
})

export const registerSucess = (user: User): RegisterSuccessActionType => ({
    type: 'login/REGISTER_SUCCESS',
    user,
})

export const registerFailure = (error: string): RegisterFailureActionType => ({
    type: 'login/REGISTER_FAILURE',
    error,
})

export const loginRequest = (fields: LoginFields): LoginRequestActionType => ({
    type: 'login/LOGIN_REQUEST',
    fields,
})

export const loginSucess = (user: User): LoginSuccessActionType => ({
    type: 'login/LOGIN_SUCCESS',
    user,
})

export const loginFailure = (error: string): LoginFailureActionType => ({
    type: 'login/LOGIN_FAILURE',
    error,
})

export const logoutCurrentUser = () => ({
    type: 'login/LOGOUT_CURRENT_USER',
})
