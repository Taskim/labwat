import { State } from '../types'

export const allSoundSelector = (state: State) => state.sound || []
