import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import './App.css'
import Register from './Session/components/Register'
import Login from './Session/components/Login'
import Dashboard from './Dashboard'
import { AuthRoute, ProtectedRoute } from './utils/routes'
import Background from './Background'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Link to="/login">Login</Link>
                <br />
                <Link to="/register">Register</Link>
                <br />
                <Link to="/dashboard">Dashboard</Link>
                <Switch>
                    {/*
                    //@ts-ignore */}
                    <AuthRoute path="/login" component={Login} />
                    {/* 
                    //@ts-ignore */}
                    <AuthRoute path="/register" component={Register} />
                    {/* 
                    //@ts-ignore */}
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <Route path="/"></Route>
                </Switch>
                <Background />
                {/*<Dashboard />*/}
            </div>
        )
    }
}

export default App
