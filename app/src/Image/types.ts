import { Triangle, Rectangle, Ellipse } from './utils/shape'

export type Config = {
    computeSize: number
    viewSize: number
    steps: number
    shapes: number
    alpha: number
    mutations: number
    mutateAlpha: boolean
    shapeTypes: Array<Shape>
    fill: string
    width: number
    height: number
    scale: number
}

export type Shape = typeof Triangle | typeof Rectangle | typeof Ellipse
export type ShapeInstance = Triangle | Rectangle | Ellipse
export type ShapeValue = 'triangle' | 'rectangle' | 'ellipse'

export type ImageDataSets = {
    shape: ImageData
    current: ImageData
    target: ImageData
}

export type BoundingBox = {
    left: number
    top: number
    width: number
    height: number
}
