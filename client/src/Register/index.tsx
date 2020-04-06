import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@material-ui/core'
import * as yup from 'yup'
import { connect } from 'react-redux'

import { Fields } from './types'

import s from './style.module.css'
import { registerRequest } from './actions'

const SignupSchema = yup.object().shape({
    username: yup.string().min(4).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
})

type Props = {
    registerRequest: typeof registerRequest
}

const Register = ({ registerRequest }: Props) => {
    const { register, handleSubmit, errors } = useForm<Fields>({
        validationSchema: SignupSchema,
    })
    const onSubmit = (fields: Fields) => {
        console.log(fields)
        registerRequest(fields)
    }
    console.log(errors)

    return (
        <div className={s.container}>
            <h1>Register</h1>
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
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default connect(null, { registerRequest })(Register)
