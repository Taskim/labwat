import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Paper } from '@material-ui/core'
import * as yup from 'yup'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'

import { RegisterFields } from '../types'

import s from './style.module.css'
import { registerRequest } from '../actions'
import TextField from '../../common/TextField'
import { getRegisterErrorMessage } from '../selectors'
import { State } from '../../types'

const SignupSchema = yup.object().shape({
    username: yup.string().min(4).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
})

type Props = {
    registerRequest: typeof registerRequest
    apiError: string | null
}

const Register = ({ registerRequest, apiError }: Props) => {
    const { register, handleSubmit, errors } = useForm<RegisterFields>({
        validationSchema: SignupSchema,
    })
    const onSubmit = (fields: RegisterFields) => {
        registerRequest(fields)
    }

    return (
        <Paper elevation={0} classes={{ root: s.container }}>
            <h2 className={s.title}>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <TextField
                    name="username"
                    id="username"
                    label="Username"
                    inputRef={register}
                    error={!!errors.username?.message}
                    helperText={errors.username?.message}
                    fullWidth
                />
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
                    Register
                </Button>
            </form>
        </Paper>
    )
}

const mapStateToProps = (state: State) => ({
    apiError: getRegisterErrorMessage(state),
})

export default connect(mapStateToProps, { registerRequest })(Register)
