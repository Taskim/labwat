import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import sagas from './sagas'
import reducers from './reducers'

export const sagaMiddleware = createSagaMiddleware()

export default (preloadedState) => {
    const store = createStore(
        reducers,
        preloadedState,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    )
    sagaMiddleware.run(sagas)
    return store
}
