import { takeLatest, call, put } from 'redux-saga/effects'

import { RegisterRequestActionType } from './types'

import { register } from './api'
import { registerSucess, registerFailure } from './actions'

export function* registerFlow(action: RegisterRequestActionType) {
    const { fields } = action
    try {
        console.log('fields: ', fields)
        const response = yield call(register, fields)
        console.log('fields2: ', fields)
        yield put(registerSucess(response))
    } catch (e) {
        yield put(registerFailure(e))
    }
}

export function* registerWatcher() {
    yield takeLatest('register/REGISTER_REQUEST', registerFlow)
}
