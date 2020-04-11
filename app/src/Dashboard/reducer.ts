import { DashboardState, ActionTypes } from './types'

const initialState: DashboardState = {}

function reducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case 'dashboard/GET_ALL_SOUNDS_SUCCESS':
            return {
                ...state,
                ...action.sounds,
            }
        default:
            return state
    }
}

export default reducer
