import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import sagas from './sagas'
import createRootReducer from './reducers'

export const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

export default (preloadedState) => {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history), sagaMiddleware)
        )
    )
    sagaMiddleware.run(sagas)
    return store
}
