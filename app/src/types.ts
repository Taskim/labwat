import { SessionState } from './Session/types'
import { DashboardState } from './Dashboard/types'
import { BackgroundState } from './Background/types'

export type State = {
    session: SessionState
    sound: DashboardState
    background: BackgroundState
}
