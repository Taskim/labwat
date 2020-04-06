export type Fields = {
    username?: string
    email?: string
    password?: string
}

export type RegisterRequestActionType = {
    type: 'register/REGISTER_REQUEST'
    fields: Fields
}

export type RegisterSuccessActionType = {
    type: 'register/REGISTER_SUCCESS'
    response: any
}

export type RegisterFailureActionType = {
    type: 'register/REGISTER_FAILURE'
    error: string
}

export type ActionTypes =
    | RegisterRequestActionType
    | RegisterSuccessActionType
    | RegisterFailureActionType
