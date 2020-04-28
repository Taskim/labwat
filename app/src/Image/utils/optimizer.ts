import Step from './step'
import State from './state'
import Canvas from './canvas'
import { Shape } from './shape'
import { Config } from '../types'

export default class Optimizer {
    cfg: Config
    state: State
    _steps: number
    onStep: (step?: Step | null) => void
    onFinish: () => void
    _ts?: number

    constructor(original: Canvas, cfg: Config) {
        this.cfg = cfg
        this.state = new State(original, Canvas.emptyCanvas(cfg))
        this._steps = 0
        this.onStep = () => {}
        this.onFinish = () => {}
        // console.log('initial distance %s', this.state.distance)
    }

    start() {
        this._ts = Date.now()
        this._addShape()
    }

    _addShape() {
        this._findBestStep()
            .then((step) => this._optimizeStep(step))
            .then((step) => {
                this._steps++
                if (step.distance < this.state.distance) {
                    /* better than current state, epic */
                    this.state = step.apply(this.state)
                    // console.log(
                    //     'switched to new state (%s) with distance: %s',
                    //     this._steps,
                    //     this.state.distance
                    // )
                    this.onStep(step)
                } else {
                    /* worse than current state, discard */
                    this.onStep(null)
                }
                this._continue()
            })
    }

    _continue() {
        if (this._steps < this.cfg.steps) {
            setTimeout(() => this._addShape(), 10)
        } else {
            let time = Date.now() - (this._ts || 0)
            this.onFinish()
            // console.log('target distance %s', this.state.distance)
            // console.log(
            //     'real target distance %s',
            //     this.state.target.distance(this.state.canvas)
            // )
            // console.log('finished in %s', time)
        }
    }

    _findBestStep(): Promise<Step> {
        const LIMIT = this.cfg.shapes

        let bestStep: Step
        let promises = []

        for (let i = 0; i < LIMIT; i++) {
            let shape = Shape.create(this.cfg)

            let promise = new Step(shape, this.cfg)
                .compute(this.state)
                .then((step) => {
                    if (!bestStep || step.distance < bestStep.distance) {
                        bestStep = step
                    }
                })
            promises.push(promise)
        }

        return Promise.all(promises).then(() => bestStep)
    }

    _optimizeStep(step: Step): Promise<Step> {
        const LIMIT = this.cfg.mutations
        let failedAttempts = 0
        let resolve: Function | null = null
        let bestStep = step
        let promise = new Promise((r) => (resolve = r))

        let tryMutation = () => {
            if (failedAttempts >= LIMIT && resolve) {
                return resolve(bestStep)
            }

            bestStep
                .mutate()
                .compute(this.state)
                .then((mutatedStep) => {
                    if (mutatedStep.distance < bestStep.distance) {
                        /* success */
                        failedAttempts = 0
                        bestStep = mutatedStep
                    } else {
                        /* failure */
                        failedAttempts++
                    }

                    tryMutation()
                })
        }

        tryMutation()

        // @ts-ignore
        return promise
    }
}
