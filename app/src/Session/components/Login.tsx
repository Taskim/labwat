import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Paper } from '@material-ui/core'
import * as yup from 'yup'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'

import { LoginFields } from '../types'

import s from './style.module.css'
import { loginRequest } from '../actions'
import TextField from '../../common/TextField'
import { State } from '../../types'
import { getLoginErrorMessage } from '../selectors'

const SignupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
})

type Props = {
    loginRequest: typeof loginRequest
    apiError: string | null
}

const Login = ({ loginRequest, apiError }: Props) => {
    const { register, handleSubmit, errors } = useForm<LoginFields>({
        validationSchema: SignupSchema,
    })
    const onSubmit = (fields: LoginFields) => {
        loginRequest(fields)
    }

    return (
        <Paper elevation={0} classes={{ root: s.container }}>
            <h2 className={s.title}>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <TextField
                    name="email"
                    id="email"
                    label="Email"
                    inputRef={register}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    fullWidth
                />
                <TextField
                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    inputRef={register}
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                    fullWidth
                />
                {apiError && <Alert severity="error">{apiError}</Alert>}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    classes={{ root: s.button }}
                >
                    Login
                </Button>
            </form>
        </Paper>
    )
}

const mapStateToProps = (state: State) => ({
    apiError: getLoginErrorMessage(state),
})

export default connect(mapStateToProps, { loginRequest })(Login)
