import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const Textfield = withStyles({
    root: {
        marginBottom: 8,
        '& label': {
            color: 'white',
        },
        '& label.Mui-focused': {},
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:hover': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fe6b8b',
        },
        '& .MuiInput-input': {
            color: 'white',
        },
    },
})(TextField)

export default Textfield
