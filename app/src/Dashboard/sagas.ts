import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { getAllSounds, upload } from './api'
import {
    getAllSoundsSuccess,
    getAllSoundsFailure,
    uploadSoundSuccess,
    uploadSoundFailure,
} from './actions'
import { UploadSoundRequestAction } from './types'

export function* getAllSoundsFlow() {
    try {
        const response = yield call(getAllSounds)
        yield put(getAllSoundsSuccess(response))
    } catch (e) {
        yield put(getAllSoundsFailure(e))
    }
}

export function* uploadSoundFlow(action: UploadSoundRequestAction) {
    try {
        console.log('upload start')
        const { fields } = action
        const response = yield call(upload, fields)
        yield put(uploadSoundSuccess(response))
        yield put(push('/'))
        console.log('upload finish')
    } catch (e) {
        console.log('upload error')
        yield put(uploadSoundFailure(e))
    }
}

export function* dashboardWatcher() {
    yield takeLatest('dashboard/GET_ALL_SOUNDS_REQUEST', getAllSoundsFlow)
    yield takeLatest('dashboard/UPLOAD_SOUND_REQUEST', uploadSoundFlow)
}
