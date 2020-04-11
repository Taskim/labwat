import { combineReducers } from 'redux'

import session from './Session/reducer'
import sound from './Dashboard/reducer'

export default combineReducers({
    session,
    sound,
})
