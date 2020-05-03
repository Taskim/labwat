import { combineReducers } from 'redux'

import session from './Session/reducer'
import sound from './Dashboard/reducer'
import background from './Background/reducer'

export default combineReducers({
    session,
    sound,
    background,
})
