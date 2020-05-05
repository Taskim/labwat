import { State } from '../types'

export const isUserLoggedIn = (state: State): Boolean => !!state.session.userId

export const getUsername = (state: State): string | null =>
    state.session.username