import Canvas from './canvas'
import * as util from './util'
import { Config, BoundingBox } from '../types'

type Point = number[]

/* Shape: a geometric primitive with a bbox */
export class Shape {
    bbox: BoundingBox

    static randomPoint(width: number, height: number): Point {
        return [~~(Math.random() * width), ~~(Math.random() * height)]
    }

    static create(cfg: Config) {
        let ctors = cfg.shapeTypes
        let index = Math.floor(Math.random() * ctors.length)
        let ctor = ctors[index]
        return new ctor(cfg.width, cfg.height)
    }

    constructor(w: number, h: number) {
        this.bbox = { left: 0, top: 0, width: 0, height: 0 }
    }

    mutate() {}

    toSVG() {}

    /* get a new smaller canvas with this shape */
    rasterize(alpha: number) {
        let canvas = new Canvas(this.bbox.width, this.bbox.height)
        let ctx = canvas.ctx
        ctx.fillStyle = '#000'
        ctx.globalAlpha = alpha
        ctx.translate(-this.bbox.left, -this.bbox.top)
        this.render(ctx)
        return canvas
    }

    render(ctx: CanvasRenderingContext2D) {}
}

class Polygon extends Shape {
    points: Point[]
    constructor(w: number, h: number, count: number) {
        super(w, h)

        this.points = this._createPoints(w, h, count)
        this.computeBbox()
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        this.points.forEach(([x, y]: Point, index: number) => {
            if (index) {
                ctx.lineTo(x, y)
            } else {
                ctx.moveTo(x, y)
            }
        })
        ctx.closePath()
        ctx.fill()
    }

    toSVG() {
        let path = document.createElementNS(util.SVGNS, 'path')
        let d = this.points
            .map((point: Point, index: number) => {
                let cmd = index ? 'L' : 'M'
                return `${cmd}${point.join(',')}`
            })
            .join('')
        path.setAttribute('d', `${d}Z`)
        return path
    }

    mutate() {
        let clone = new Polygon(0, 0, 0)
        clone.points = this.points.map((point: Point) => point.slice())

        let index = Math.floor(Math.random() * this.points.length)
        let point = clone.points[index]

        let angle = Math.random() * 2 * Math.PI
        let radius = Math.random() * 20
        point[0] += ~~(radius * Math.cos(angle))
        point[1] += ~~(radius * Math.sin(angle))

        return clone.computeBbox()
    }

    computeBbox() {
        let min = [
            this.points.reduce((v, p) => Math.min(v, p[0]), Infinity),
            this.points.reduce((v, p) => Math.min(v, p[1]), Infinity),
        ]
        let max = [
            this.points.reduce((v, p) => Math.max(v, p[0]), -Infinity),
            this.points.reduce((v, p) => Math.max(v, p[1]), -Infinity),
        ]

        this.bbox = {
            left: min[0],
            top: min[1],
            width: max[0] - min[0] || 1 /* fallback for deformed shapes */,
            height: max[1] - min[1] || 1,
        }

        return this
    }

    _createPoints(w: number, h: number, count: number): Point[] {
        let first = Shape.randomPoint(w, h)
        let points = [first]

        for (let i = 1; i < count; i++) {
            let angle = Math.random() * 2 * Math.PI
            let radius = Math.random() * 20
            points.push([
                first[0] + ~~(radius * Math.cos(angle)),
                first[1] + ~~(radius * Math.sin(angle)),
            ])
        }
        return points
    }
}

export class Triangle extends Polygon {
    constructor(w: number, h: number) {
        super(w, h, 3)
    }
}

export class Rectangle extends Polygon {
    constructor(w: number, h: number) {
        super(w, h, 4)
    }

    mutate() {
        let clone = new Rectangle(0, 0)
        clone.points = this.points.map((point: Point) => point.slice())

        let amount = ~~((Math.random() - 0.5) * 20)

        switch (Math.floor(Math.random() * 4)) {
            case 0 /* left */:
                clone.points[0][0] += amount
                clone.points[3][0] += amount
                break
            case 1 /* top */:
                clone.points[0][1] += amount
                clone.points[1][1] += amount
                break
            case 2 /* right */:
                clone.points[1][0] += amount
                clone.points[2][0] += amount
                break
            case 3 /* bottom */:
                clone.points[2][1] += amount
                clone.points[3][1] += amount
                break
        }

        return clone.computeBbox()
    }

    _createPoints(w: number, h: number): Point[] {
        let p1 = Shape.randomPoint(w, h)
        let p2 = Shape.randomPoint(w, h)

        let left = Math.min(p1[0], p2[0])
        let right = Math.max(p1[0], p2[0])
        let top = Math.min(p1[1], p2[1])
        let bottom = Math.max(p1[1], p2[1])

        return [
            [left, top],
            [right, top],
            [right, bottom],
            [left, bottom],
        ]
    }
}

export class Ellipse extends Shape {
    center: Point | number[]
    rx: number
    ry: number
    constructor(w: number, h: number) {
        super(w, h)

        this.center = Shape.randomPoint(w, h)
        this.rx = 1 + ~~(Math.random() * 20)
        this.ry = 1 + ~~(Math.random() * 20)

        this.computeBbox()
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.ellipse(
            this.center[0],
            this.center[1],
            this.rx,
            this.ry,
            0,
            0,
            2 * Math.PI,
            false
        )
        ctx.fill()
    }

    toSVG() {
        let node = document.createElementNS(util.SVGNS, 'ellipse')
        node.setAttribute('cx', this.center[0].toString())
        node.setAttribute('cy', this.center[1].toString())
        node.setAttribute('rx', this.rx.toString())
        node.setAttribute('ry', this.ry.toString())
        return node
    }

    mutate() {
        let clone = new Ellipse(0, 0)
        clone.center = this.center.slice()
        clone.rx = this.rx
        clone.ry = this.ry

        switch (Math.floor(Math.random() * 3)) {
            case 0:
                let angle = Math.random() * 2 * Math.PI
                let radius = Math.random() * 20
                clone.center[0] += ~~(radius * Math.cos(angle))
                clone.center[1] += ~~(radius * Math.sin(angle))
                break

            case 1:
                clone.rx += (Math.random() - 0.5) * 20
                clone.rx = Math.max(1, ~~clone.rx)
                break

            case 2:
                clone.ry += (Math.random() - 0.5) * 20
                clone.ry = Math.max(1, ~~clone.ry)
                break
        }

        return clone.computeBbox()
    }

    computeBbox() {
        this.bbox = {
            left: this.center[0] - this.rx,
            top: this.center[1] - this.ry,
            width: 2 * this.rx,
            height: 2 * this.ry,
        }
        return this
    }
}

export class Debug extends Shape {
    constructor(w: number, h: number) {
        super(w, h)
        this.bbox = { left: 0, top: 0, width: w, height: h }
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(0, 0, 1.5, 1.5)
    }
}
