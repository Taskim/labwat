import React, { useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { Button } from '@material-ui/core'

import { Config, ShapeValue } from './types'

import Canvas from './utils/canvas'
import Optimizer from './utils/optimizer'
import { Triangle } from './utils/shape'
import { setBackground } from '../Background/actions'
import s from './style.module.css'

type Props = {
    onFinish: (svg: string) => void
    setBackground: typeof setBackground
}

const Image = ({ onFinish, setBackground }: Props) => {
    const [progression, setProgression] = useState('')
    const [shapes, setShapes] = useState<Array<ShapeValue>>(['triangle'])
    const [isRunning, setIsRunning] = useState(false)
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        accept: 'image/*',
        multiple: false,
    })

    function go(original: any, cfg: Config) {
        setProgression('')
        let optimizer = new Optimizer(original, cfg)
        let steps = 0
        let svg = Canvas.empty(cfg, true)
        let serializer = new XMLSerializer()

        optimizer.onStep = (step) => {
            if (step) {
                svg.appendChild(step.toSVG())
                let percent = (100 * (1 - step.distance)).toFixed(2)
                setBackground(serializer.serializeToString(svg))
                setProgression(
                    `(${++steps} of ${cfg.steps}, ${percent}% similar)`
                )
            }
        }

        optimizer.onFinish = () => {
            onFinish(serializer.serializeToString(svg))
            setIsRunning(false)
        }

        optimizer.start()
        setIsRunning(true)

        document.documentElement.scrollTop =
            document.documentElement.scrollHeight
    }

    function onSubmit(e: any) {
        e.preventDefault()

        let url = 'test'
        if (acceptedFiles.length > 0) {
            let file = acceptedFiles[0]
            url = URL.createObjectURL(file)
        } else {
            // TODO ERROR
        }

        let cfg = getConfig()

        Canvas.original(url, cfg).then((original) => go(original, cfg))
    }

    function getConfig(): Config {
        let cfg = {
            computeSize: 512,
            viewSize: 512,
            steps: 200,
            shapes: 100,
            alpha: 0.5,
            mutations: 30,
            mutateAlpha: true,
            fill: 'auto',
            shapeTypes: [Triangle],
            width: 512,
            height: 512,
            scale: 1,
        }

        return cfg
    }

    const handleCheck = (
        e: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        const { value } = e.target
        if (checked) {
            setShapes([...shapes, value as ShapeValue])
        } else {
            setShapes(shapes.filter((shape) => shape !== value))
        }
    }

    return (
        <>
            <div {...getRootProps({ className: s.dropzone })}>
                <input {...getInputProps()} />
                {isRunning ? (
                    progression
                ) : acceptedFiles[0]?.name ? (
                    acceptedFiles[0]?.name
                ) : isDragActive ? (
                    <p>Drop the file here ...</p>
                ) : (
                    <p>Pick an image</p>
                )}
            </div>
            <p className={s.info}>
                This is a CPU-intensive process. It might take a while.
            </p>
            <Button
                className={s.button}
                variant="outlined"
                color="primary"
                onClick={onSubmit}
                disabled={isRunning}
            >
                Transform
            </Button>
        </>
    )
}

export default connect(null, { setBackground })(Image)
