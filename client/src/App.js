import React, { Component } from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'

import Form from './components/Form'
import DisplayUsers from './components/DisplayUsers'
import './App.css'

class App extends Component {
    state = {
        users: [],
    }

    componentDidMount = () => {
        this.fetchUsers()
    }

    fetchUsers = () => {
        axios
            .get('/users')
            .then(response => {
                const { users } = response.data
                this.setState({ users: [...this.state.users, ...users] })
            })
            .catch(() => alert('Error fetching new users'))
    }

    addUser = ({ name, position, company }) => {
        this.setState({
            users: [...this.state.users, { name, position, company }],
        })
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/about">
                        <div>about</div>
                    </Route>
                    <Route path="/users">
                        <div>users</div>
                    </Route>
                    <Route path="/">
                        <div>home</div>
                    </Route>
                </Switch>
                <Form addUser={this.addUser} />
                <DisplayUsers users={this.state.users} />
            </div>
        )
    }
}

export default App
