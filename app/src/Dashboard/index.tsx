import React from 'react'
import { connect } from 'react-redux'
import { logoutRequest } from '../Session/actions'

const mapStateToProps = ({ session }: any) => ({
    session,
})

const Dashboard = ({ logout, session }: any) => (
    <>
        <h1>Hi {session.username}</h1>
        <p>You are now logged in!</p>
        <button onClick={logout}>Logout</button>
    </>
)
export default connect(mapStateToProps, { logout: logoutRequest })(Dashboard)
