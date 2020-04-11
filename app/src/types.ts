import type { SessionState } from './Session/types'
import type { DashboardState } from './Dashboard/types'

export type State = {
    session: SessionState
    sound: DashboardState
}
