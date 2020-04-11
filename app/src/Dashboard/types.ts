export type SoundId = string

export type Sound = {
    _id: SoundId
    name: string
    soundLink: string
    // todo
    svgPaths: any
    createdAt: string
}

export type DashboardState = {
    [key: string]: Sound
}

export type GetAllSoundsRequestAction = {
    type: 'dashboard/GET_ALL_SOUNDS_REQUEST'
}

export type GetAllSoundsSuccessAction = {
    type: 'dashboard/GET_ALL_SOUNDS_SUCCESS'
    sounds: Sound[]
}

export type GetAllSoundsFailureAction = {
    type: 'dashboard/GET_ALL_SOUNDS_FAILURE'
    error: string
}

export type ActionTypes =
    | GetAllSoundsRequestAction
    | GetAllSoundsSuccessAction
    | GetAllSoundsFailureAction
