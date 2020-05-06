import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Paper, IconButton } from '@material-ui/core'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import s from './style.module.css'
import { uploadSoundRequest } from '../actions'
import Image from '../../Image'
import Stepper from './Stepper'
import Textfield from '../../common/TextField'

interface Props extends RouteComponentProps<any> {
    upload: typeof uploadSoundRequest
}

type Fields = { name: string; file: File }

const Register = ({ history, upload }: Props) => {
    const { register, handleSubmit, errors, getValues, setValue } = useForm<
        Fields
    >({
        validationSchema: UploadSchema,
    })

    const [isSubmitDisabled, disableSubmit] = useState(true)
    const [activeStep, setActiveStep] = useState(0)
    const [svg, updateSvg] = useState('')

    const onDrop = useCallback(
        (acceptedFiles) => {
            setValue('file', acceptedFiles[0], true)
        },
        [setValue]
    )

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: 'audio/*',
        multiple: false,
        onDrop,
    })

    const onSubmit = (fields: Fields) => {
        upload({
            name: fields.name,
            file: fields.file,
            svg,
        })
    }

    const renderStep0 = () => (
        <>
            <Image onFinish={updateSvg} />
            <Button
                variant="contained"
                color="primary"
                className="button"
                onClick={() => setActiveStep(1)}
                disabled={!svg}
            >
                Next
            </Button>
        </>
    )

    // register dropzone manually
    register({ name: 'file' })
    const renderStep1 = () => (
        <>
            <div {...getRootProps()} className={s.dropzone}>
                <input {...getInputProps()} />
                {acceptedFiles[0]?.name || 'Upload audio file'}
            </div>
            <Button
                variant="contained"
                color="primary"
                className="button"
                onClick={() => setActiveStep(2)}
                disabled={!getValues({ nest: true }).file}
            >
                Next
            </Button>
        </>
    )

    const renderStep2 = () => (
        <>
            <Textfield
                name="name"
                id="name"
                label="Name"
                inputRef={register}
                error={!!errors.name?.message}
                helperText={errors.name?.message}
                fullWidth
                onChange={() => isSubmitDisabled && disableSubmit(false)}
            />
            <Button
                variant="contained"
                color="primary"
                className="button"
                disabled={isSubmitDisabled}
                onClick={handleSubmit(onSubmit)}
            >
                Save
            </Button>
        </>
    )

    return (
        <Paper classes={{ root: s.container }}>
            <IconButton
                onClick={() => history.goBack()}
                className={s.backButton}
                color="secondary"
            >
                <ArrowBackIcon />
            </IconButton>
            <h3>.Create Sound</h3>
            <form className={s.form}>
                <Stepper activeStep={activeStep} />
                {activeStep === 0 && renderStep0()}
                {activeStep === 1 && renderStep1()}
                {activeStep === 2 && renderStep2()}
            </form>
        </Paper>
    )
}

const UploadSchema = yup.object().shape({
    name: yup.string().min(4).required(),
    file: yup
        .mixed()
        .required('A file is required')
        .test('fileSize', 'File too large', (value) => {
            console.log('value', value)
            return value && value.size <= 500000000
        })
        .test(
            'fileFormat',
            'Unsupported Format',
            (value) => value && value.type === 'audio/mpeg'
        ),
})

export default withRouter(
    connect(null, { upload: uploadSoundRequest })(Register)
)
