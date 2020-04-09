export type RegisterFields = {
    username?: string
    email?: string
    password?: string
}

export type LoginFields = {
    email?: string
    password?: string
}

export type User = {
    id: string
    username: string
}

export type SessionState = {
    userId: string | null
    username: string | null
}

export type LoginRequestActionType = {
    type: 'login/LOGIN_REQUEST'
    fields: LoginFields
}

export type LoginSuccessActionType = {
    type: 'login/LOGIN_SUCCESS'
    user: User
}

export type LoginFailureActionType = {
    type: 'login/LOGIN_FAILURE'
    error: string
}

export type RegisterRequestActionType = {
    type: 'login/REGISTER_REQUEST'
    fields: RegisterFields
}

export type RegisterSuccessActionType = {
    type: 'login/REGISTER_SUCCESS'
    user: User
}

export type RegisterFailureActionType = {
    type: 'login/REGISTER_FAILURE'
    error: string
}

export type LogoutRequestActionType = {
    type: 'login/LOGOUT_REQUEST'
}

export type LogoutSuccessActionType = {
    type: 'login/LOGOUT_SUCCESS'
}

export type LogoutFailureActionType = {
    type: 'login/LOGOUT_FAILURE'
    error: string
}

export type ActionTypes =
    | LoginRequestActionType
    | LoginSuccessActionType
    | LoginFailureActionType
    | RegisterRequestActionType
    | RegisterSuccessActionType
    | RegisterFailureActionType
    | LogoutRequestActionType
    | LogoutSuccessActionType
    | LoginFailureActionType
