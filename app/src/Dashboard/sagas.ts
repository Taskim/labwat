import { takeLatest, call, put } from 'redux-saga/effects'

import { getAllSounds } from './api'
import { getAllSoundsSuccess, getAllSoundsFailure } from './actions'

export function* getAllSoundsFlow() {
    try {
        const response = yield call(getAllSounds)
        yield put(getAllSoundsSuccess(response))
    } catch (e) {
        yield put(getAllSoundsFailure(e))
    }
}

export function* dashboardWatcher() {
    yield takeLatest('dashboard/GET_ALL_SOUNDS_REQUEST', getAllSoundsFlow)
}
