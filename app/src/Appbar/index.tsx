import React from 'react'
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core'

import LoginOrProfile from './LoginOrProfile'
import s from './style.module.css'

function AppBar() {
    return (
        <MuiAppBar
            position="static"
            classes={{ colorPrimary: s.container }}
            elevation={0}
        >
            <Toolbar variant="dense">
                <Typography variant="h6" className={s.title}>
                    Sonus
                </Typography>
                <LoginOrProfile />
            </Toolbar>
        </MuiAppBar>
    )
}

export default AppBar
