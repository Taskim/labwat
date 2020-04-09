import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.tsx'
import * as serviceWorker from './serviceWorker'
import configureStore from './store'
import { checkLoggedIn } from './utils/session'

const renderApp = (preloadedState) => {
    const store = configureStore(preloadedState)
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    )
}

;(async () => renderApp(await checkLoggedIn()))()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
