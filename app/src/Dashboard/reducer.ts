import { DashboardState, ActionTypes } from './types'

const initialState: DashboardState = {}

function reducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case 'dashboard/GET_ALL_SOUNDS_SUCCESS':
            return {
                ...state,
                ...action.sounds.reduce(
                    (acc, current) => ({ ...acc, [current._id]: current }),
                    {}
                ),
            }
        case 'dashboard/UPLOAD_SOUND_SUCCESS':
            return {
                ...state,
                [action.sound._id]: action.sound,
            }
            return {
                ...state,
            }
        default:
            return state
    }
}

export default reducer
