import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import Register from './Session/components/Register'
import Login from './Session/components/Login'
import Dashboard from './Dashboard'
import { AuthRoute, ProtectedRoute } from './utils/routes'
import Background from './Background'
import Appbar from './Appbar'
import UploadForm from './Dashboard/components/UploadForm'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Appbar />
                <Background />
                {/*<Link to="/login">Login</Link>
                <br />
                <Link to="/register">Register</Link>
                <br />
        <Link to="/">Dashboard</Link>*/}
                <Switch>
                    <AuthRoute path="/login" component={Login} />
                    <AuthRoute path="/register" component={Register} />
                    <ProtectedRoute path="/create" component={UploadForm} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </div>
        )
    }
}

export default App
