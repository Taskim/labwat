import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { ConnectedRouter } from 'connected-react-router'

import './index.css'
import App from './App.tsx'
import * as serviceWorker from './serviceWorker'
import configureStore, { history } from './store'
import { checkLoggedIn } from './utils/session'

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#fe6b8b',
            // dark: will be calculated from palette.primary.main,
            contrastText: '#fff',
        },
        secondary: {
            // light: '#0066ff',
            main: '#fff',
            // dark: will be calculated from palette.secondary.main,
            // contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
})

const renderApp = (preloadedState) => {
    const store = configureStore(preloadedState)
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    )
}

;(async () => renderApp(await checkLoggedIn()))()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
