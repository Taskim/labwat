import React from 'react'
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import LoginOrProfile from './LoginOrProfile'
import s from './style.module.css'
import Logo from './Logo'

function AppBar() {
    return (
        <MuiAppBar
            position="static"
            classes={{ colorPrimary: s.container }}
            elevation={0}
        >
            <Toolbar variant="dense">
                <div className={s.logo}>
                    <Link to="/">
                        <Logo color="#fff" />
                    </Link>
                </div>
                <LoginOrProfile />
            </Toolbar>
        </MuiAppBar>
    )
}

export default AppBar
