import { SessionState, ActionTypes } from './types'

const initialState: SessionState = { userId: null, username: null }

function reducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case 'login/REGISTER_SUCCESS':
        case 'login/LOGIN_SUCCESS':
            return {
                ...state,
                ...action.user,
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
