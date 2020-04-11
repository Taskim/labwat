//@flow
import { all, fork } from 'redux-saga/effects'

import { sessionWatcher } from './Session/sagas'
import { dashboardWatcher } from './Dashboard/sagas'

export default function* rootSaga() {
    yield all([fork(sessionWatcher), fork(dashboardWatcher)])
}
