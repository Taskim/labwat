import { ActionTypes } from './types'

function reducer(state = {}, action: ActionTypes) {
    switch (action.type) {
        case 'register/REGISTER_SUCCESS':
            return {}
        default:
            return state
    }
}

export default reducer
