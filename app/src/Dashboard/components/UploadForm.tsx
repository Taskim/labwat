import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@material-ui/core'
import * as yup from 'yup'
import { connect } from 'react-redux'

import s from './style.module.css'
import { uploadSoundRequest } from '../actions'

const UploadSchema = yup.object().shape({
    name: yup.string().min(4).required(),
    file: yup
        .mixed()
        .required('A file is required')
        .test(
            'fileSize',
            'File too large',
            (value) => value[0] && value[0].size <= 500000
        )
        .test(
            'fileFormat',
            'Unsupported Format',
            (value) => value[0] && value[0].type === 'audio/mp3'
        ),
})

type Props = {
    upload: typeof uploadSoundRequest
}

type Fields = { name: string; file: File[] }

const Register = ({ upload }: Props) => {
    const { register, handleSubmit, errors } = useForm<Fields>({
        validationSchema: UploadSchema,
    })
    const onSubmit = (fields: Fields) => {
        upload({
            name: fields.name,
            file: fields.file[0],
        })
    }

    return (
        <div className={s.container}>
            <h1>Upload sound</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <TextField
                    name="name"
                    id="name"
                    label="Name"
                    inputRef={register}
                    error={!!errors.name?.message}
                    helperText={errors.name?.message}
                    fullWidth
                />
                <input
                    accept=".mp3"
                    ref={register}
                    id="file"
                    name="file"
                    type="file"
                />

                <Button variant="contained" color="primary" type="submit">
                    Save
                </Button>
            </form>
        </div>
    )
}

export default connect(null, { upload: uploadSoundRequest })(Register)
