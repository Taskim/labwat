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
    LogoutRequestActionType,
    LogoutSuccessActionType,
    LogoutFailureActionType,
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

export const loginSuccess = (user: User): LoginSuccessActionType => ({
    type: 'login/LOGIN_SUCCESS',
    user,
})

export const loginFailure = (error: string): LoginFailureActionType => ({
    type: 'login/LOGIN_FAILURE',
    error,
})

export const logoutRequest = (): LogoutRequestActionType => ({
    type: 'login/LOGOUT_REQUEST',
})

export const logoutSuccess = (): LogoutSuccessActionType => ({
    type: 'login/LOGOUT_SUCCESS',
})

export const logoutFailure = (error: string): LogoutFailureActionType => ({
    type: 'login/LOGOUT_FAILURE',
    error,
})
