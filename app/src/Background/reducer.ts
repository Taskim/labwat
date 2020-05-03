import { BackgroundState, ActionTypes } from './types'

const initialState: BackgroundState = { svg: null }

function reducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case 'SET_BACKGROUND':
            return { ...state, svg: action.svg }
        default:
            return state
    }
}

export default reducer
