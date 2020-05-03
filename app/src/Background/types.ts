export type BackgroundState = { svg: string | null }

export type SetBackgroundAction = {
    type: 'SET_BACKGROUND'
    svg: string
}

export type ActionTypes = SetBackgroundAction
