import React, { useEffect, useState } from 'react'

import { Config, ShapeValue } from './types'

import Canvas from './utils/canvas'
import Optimizer from './utils/optimizer'
import { Triangle, Rectangle, Ellipse } from './utils/shape'
import s from './style.module.css'

const Image = () => {
    const [svg, updateSvg] = useState('')
    const [progression, setProgression] = useState('')
    const getNodes = () => {
        return {
            output: document.querySelector<HTMLElement>('#output')!,
            // original: document.querySelector('#original')!,
            vector: document.querySelector('#vector')!,
            types: Array.from(
                document.querySelectorAll('#output [name=type]')
            )!,
        }
    }

    function go(original: any, cfg: Config) {
        const nodes = getNodes()
        setProgression('')
        // nodes.original.innerHTML = ''
        nodes.vector.innerHTML = ''

        nodes.output.style.display = ''
        // nodes.original.appendChild(original.node)

        let optimizer = new Optimizer(original, cfg)
        let steps = 0

        let svg = Canvas.empty(cfg, true)

        // svg.setAttribute('width', cfg.width.toString())
        // svg.setAttribute('height', cfg.height.toString())
        svg.setAttribute('height', '100%')
        svg.setAttribute('width', '100%')

        // svg.removeAttribute('width')
        // svg.removeAttribute('height')
        nodes.vector.appendChild(svg)

        let serializer = new XMLSerializer()

        optimizer.onStep = (step) => {
            if (step) {
                svg.appendChild(step.toSVG())
                let percent = (100 * (1 - step.distance)).toFixed(2)
                updateSvg(serializer.serializeToString(svg))
                setProgression(
                    `(${++steps} of ${cfg.steps}, ${percent}% similar)`
                )
            }
        }

        optimizer.onFinish = () => {
            console.log('finished', svg)
        }

        optimizer.start()

        document.documentElement.scrollTop =
            document.documentElement.scrollHeight
    }

    function onSubmit(e: any) {
        e.preventDefault()

        let inputFile = document.querySelector<HTMLInputElement>(
            'input[type=file]'
        )!

        let url = 'test'
        if (inputFile!.files!.length > 0) {
            let file = inputFile!.files![0]
            url = URL.createObjectURL(file)
        } else {
            // TODO ERROR
        }

        let cfg = getConfig()

        Canvas.original(url, cfg).then((original) => go(original, cfg))
    }

    function init() {
        const nodes = getNodes()
        nodes.output.style.display = 'none'
    }

    function getConfig(): Config {
        const shapeField = 'shapeType'
        const shapeMap = {
            triangle: Triangle,
            rectangle: Rectangle,
            ellipse: Ellipse,
        }
        let cfg = {
            computeSize: 512,
            viewSize: 512,
            steps: 200,
            shapes: 200,
            alpha: 0.5,
            mutations: 30,
            mutateAlpha: true,
            fill: 'auto',
            shapeTypes: [],
            width: 512,
            height: 512,
            scale: 1,
        }

        let form = document.querySelector('form')
        let shapeFields = Array.from(
            form!.querySelectorAll(`[name=${shapeField}]`) as NodeListOf<
                HTMLInputElement & {
                    value: ShapeValue
                }
            >
        )
        shapeFields.forEach((input) => {
            if (input.checked) {
                ;(cfg as any).shapeTypes.push(shapeMap[input.value])
            }
        })

        return cfg
    }

    useEffect(() => {
        init()
    }, [])
    return (
        <>
            <form>
                <h3>Pick an image file</h3>
                From your computer: <input type="file" accept="image/*" />
                <div>
                    <p>Use these shape types:</p>
                    {}
                    <label>
                        <input
                            type="checkbox"
                            name="shapeType"
                            value="triangle"
                            checked
                        />
                        Triangles
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="shapeType"
                            value="rectangle"
                        />
                        Rectangles
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="shapeType"
                            value="ellipse"
                        />
                        Ellipses
                    </label>
                </div>
                <p>This is a CPU-intensive process. It might take a while.</p>
                <button onClick={onSubmit}>Let's go!</button>
            </form>
            <div id="output">
                {/*<div>
                    <h3>Original</h3>
                    <div id="original"></div>
                </div>*/}
                <div>
                    <h3>{progression}</h3>
                    <div className={s.result} id="vector"></div>
                    <br />
                </div>
            </div>
        </>
    )
}

export default Image
