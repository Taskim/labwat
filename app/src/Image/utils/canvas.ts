import * as util from './util'
import { Config } from '../types'

function getScale(width: number, height: number, limit: number): number {
    return Math.max(width / limit, height / limit, 1)
}

function getFill(canvas: Canvas) {
    let data = canvas.getImageData()
    let w = data.width
    let h = data.height
    let d = data.data
    let rgb = [0, 0, 0]
    let count = 0
    let i

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            if (x > 0 && y > 0 && x < w - 1 && y < h - 1) {
                continue
            }
            count++
            i = 4 * (x + y * w)
            rgb[0] += d[i]
            rgb[1] += d[i + 1]
            rgb[2] += d[i + 2]
        }
    }

    rgb = rgb.map((x) => ~~(x / count)).map(util.clampColor)
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

function svgRect(w: number, h: number): SVGElement {
    let node = document.createElementNS(util.SVGNS, 'rect')
    node.setAttribute('x', '0')
    node.setAttribute('y', '0')
    node.setAttribute('width', w.toString())
    node.setAttribute('height', h.toString())

    return node
}

/* Canvas: a wrapper around a <canvas> element */
export default class Canvas {
    node: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    _imageData: any

    static empty(cfg: Config, svg?: boolean): SVGElement {
        let node: SVGElement = document.createElementNS(util.SVGNS, 'svg')
        node.setAttribute('viewBox', `0 0 ${cfg.width} ${cfg.height}`)
        node.setAttribute('clip-path', 'url(#clip)')

        let defs = document.createElementNS(util.SVGNS, 'defs')
        node.appendChild(defs)

        let cp = document.createElementNS(util.SVGNS, 'clipPath')
        defs.appendChild(cp)
        cp.setAttribute('id', 'clip')
        cp.setAttribute('clipPathUnits', 'objectBoundingBox')

        let rect = svgRect(cfg.width, cfg.height)
        cp.appendChild(rect)

        rect = svgRect(cfg.width, cfg.height)
        // fill background (cfg.fill)
        rect.setAttribute('fill', '#292929')
        node.appendChild(rect)

        return node
    }

    static emptyCanvas(cfg: Config): Canvas {
        return new this(cfg.width, cfg.height).fill(cfg.fill)
    }

    static original(url: string, cfg: Config) {
        if (url === 'test') {
            return Promise.resolve(this.test(cfg))
        }

        return new Promise((resolve) => {
            let img = new Image()
            img.src = url
            img.onload = (e) => {
                let w = img.naturalWidth
                let h = img.naturalHeight

                let computeScale = getScale(w, h, cfg.computeSize)
                cfg.width = w / computeScale
                cfg.height = h / computeScale

                let viewScale = getScale(w, h, cfg.viewSize)

                cfg.scale = computeScale / viewScale

                let canvas = this.emptyCanvas(cfg)
                canvas.ctx.drawImage(img, 0, 0, cfg.width, cfg.height)

                if (cfg.fill === 'auto') {
                    cfg.fill = getFill(canvas)
                }

                resolve(canvas)
            }
            img.onerror = (e) => {
                console.error(e)
                alert('The image URL cannot be loaded')
            }
        })
    }

    static test(cfg: Config) {
        cfg.width = cfg.computeSize
        cfg.height = cfg.computeSize
        cfg.scale = 1
        let [w, h] = [cfg.width, cfg.height]

        let canvas = new this(w, h)
        canvas.fill('#fff')
        let ctx = canvas.ctx

        ctx.fillStyle = '#f00'
        ctx.beginPath()
        ctx.arc(w / 4, h / 2, w / 7, 0, 2 * Math.PI, true)
        ctx.fill()

        ctx.fillStyle = '#0f0'
        ctx.beginPath()
        ctx.arc(w / 2, h / 2, w / 7, 0, 2 * Math.PI, true)
        ctx.fill()

        ctx.fillStyle = '#00f'
        ctx.beginPath()
        ctx.arc((w * 3) / 4, h / 2, w / 7, 0, 2 * Math.PI, true)
        ctx.fill()

        if (cfg.fill === 'auto') {
            cfg.fill = getFill(canvas)
        }

        return canvas
    }

    constructor(width: number, height: number) {
        this.node = document.createElement('canvas')
        this.node.width = width
        this.node.height = height
        this.ctx = this.node.getContext('2d')!
        this._imageData = null
    }

    clone() {
        let otherCanvas = new Canvas(this.node.width, this.node.height)
        otherCanvas.ctx.drawImage(this.node, 0, 0)
        return otherCanvas
    }

    fill(color: string) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.node.width, this.node.height)
        return this
    }

    getImageData() {
        if (!this._imageData) {
            this._imageData = this.ctx.getImageData(
                0,
                0,
                this.node.width,
                this.node.height
            )
        }
        return this._imageData
    }

    difference(otherCanvas: Canvas) {
        let data = this.getImageData()
        let dataOther = otherCanvas.getImageData()

        return util.difference(data, dataOther)
    }

    distance(otherCanvas: Canvas) {
        let difference = this.difference(otherCanvas)
        return util.differenceToDistance(
            difference,
            this.node.width * this.node.height
        )
    }

    drawStep(step: any) {
        this.ctx.globalAlpha = step.alpha
        this.ctx.fillStyle = step.color
        step.shape.render(this.ctx)
        return this
    }
}
