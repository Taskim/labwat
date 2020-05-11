import { SessionState, ActionTypes } from './types'
const initialState: SessionState = {
    userId: null,
    username: null,
    registerError: null,
    loginError: null,
}

function reducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case 'login/REGISTER_SUCCESS':
        case 'login/LOGIN_SUCCESS':
            return {
                ...state,
                ...action.user,
            }
        case 'login/LOGIN_FAILURE':
            return {
                ...state,
                loginError: action.error,
            }
        case 'login/REGISTER_FAILURE':
            return {
                ...state,
                registerError: action.error,
            }
        case 'login/LOGOUT_SUCCESS':
            return {
                ...state,
                ...initialState,
            }
        default:
            return state
    }
}

export default reducer
