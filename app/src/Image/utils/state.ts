import Canvas from './canvas'

/* State: target canvas, current canvas and a distance value */
export default class State {
    target: Canvas
    canvas: Canvas
    distance: number
    constructor(target: Canvas, canvas: Canvas, distance = Infinity) {
        this.target = target
        this.canvas = canvas
        this.distance =
            distance == Infinity ? target.distance(canvas) : distance
    }
}
