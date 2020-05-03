import React from 'react'
import { Stepper, Step, StepLabel, StepConnector } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import Check from '@material-ui/icons/Check'
import { StepIconProps } from '@material-ui/core/StepIcon'

import s from './style.module.css'

type Props = {
    activeStep: number
}

const steps = ['Create the illustration', 'Upload the sound', 'Give it a name']

const FormStepper = ({ activeStep }: Props) => {
    return (
        <div>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<QontoConnector />}
                classes={{ root: s.stepper }}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            classes={{ label: s.label }}
                            StepIconComponent={QontoStepIcon}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#fe6b8b',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#fe6b8b',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector)

function QontoStepIcon(props: StepIconProps) {
    const { active, completed } = props

    return (
        <div
            className={cx(s.root, {
                [s.active]: active,
            })}
        >
            {completed ? (
                <Check className={s.completed} />
            ) : (
                <div className={s.circle} />
            )}
        </div>
    )
}

export default FormStepper
