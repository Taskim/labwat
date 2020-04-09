import { takeLatest, call, put } from 'redux-saga/effects'

import { RegisterRequestActionType, LoginRequestActionType } from './types'

import { register, login } from './api'
import {
    registerSucess,
    registerFailure,
    loginSucess,
    loginFailure,
} from './actions'

export function* registerFlow(action: RegisterRequestActionType) {
    const { fields } = action
    try {
        const response = yield call(register, fields)
        yield put(registerSucess(response))
    } catch (e) {
        yield put(registerFailure(e))
    }
}

export function* loginFlow(action: LoginRequestActionType) {
    const { fields } = action
    try {
        const response = yield call(login, fields)
        yield put(loginSucess(response))
    } catch (e) {
        yield put(loginFailure(e))
    }
}

export function* sessionWatcher() {
    yield takeLatest('login/REGISTER_REQUEST', registerFlow)
    yield takeLatest('login/LOGIN_REQUEST', loginFlow)
}
