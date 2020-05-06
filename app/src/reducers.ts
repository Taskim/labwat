import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import session from './Session/reducer'
import sound from './Dashboard/reducer'
import background from './Background/reducer'

export default (history: History) =>
    combineReducers({
        session,
        sound,
        background,
        router: connectRouter(history),
    })
