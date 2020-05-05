import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { Button, Menu, MenuItem } from '@material-ui/core'

import { isUserLoggedIn, getUsername } from '../Session/selectors'
import { logoutRequest } from '../Session/actions'
import { State } from '../types'
import s from './style.module.css'

interface Props extends RouteComponentProps<any> {
    isUserLoggedIn: Boolean
    username: string | null
    logout: typeof logoutRequest
}

function LoginOrProfile({
    location,
    history,
    isUserLoggedIn,
    username,
    logout,
}: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleClose()
        logout()
    }

    if (isUserLoggedIn) {
        return (
            <div>
                <Button
                    color="inherit"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {username}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    classes={{ paper: s.menuPopover }}
                >
                    {/*<MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>*/}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        )
    }

    if (location.pathname === '/login') {
        return (
            <Link to="register" className={s.link}>
                <Button classes={{ text: s.button }}>Register</Button>
            </Link>
        )
    }

    return (
        <Link to="/login" className={s.link}>
            <Button classes={{ text: s.button }}>Login</Button>
        </Link>
    )
}

const mapStateToProps = (state: State) => ({
    isUserLoggedIn: isUserLoggedIn(state),
    username: getUsername(state),
})

export default withRouter(
    connect(mapStateToProps, { logout: logoutRequest })(LoginOrProfile)
)
