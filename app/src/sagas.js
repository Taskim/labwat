//@flow
import { all, fork } from 'redux-saga/effects'

import { sessionWatcher } from './Session/sagas'

export default function* rootSaga() {
    yield all([fork(sessionWatcher)])
}
