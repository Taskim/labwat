//@flow
import { all, fork } from 'redux-saga/effects'

import { registerWatcher } from './Register/sagas'

export default function* rootSaga() {
    yield all([fork(registerWatcher)])
}
