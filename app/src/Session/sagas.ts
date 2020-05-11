import { takeLatest, call, put } from 'redux-saga/effects'

import { RegisterRequestActionType, LoginRequestActionType } from './types'

import { register, login, logout } from './api'
import {
    registerSucess,
    registerFailure,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
} from './actions'

export function* registerFlow(action: RegisterRequestActionType) {
    const { fields } = action
    try {
        const response = yield call(register, fields)
        yield put(registerSucess(response))
    } catch (e) {
        yield put(registerFailure(e.message))
    }
}

export function* loginFlow(action: LoginRequestActionType) {
    const { fields } = action
    try {
        const response = yield call(login, fields)
        yield put(loginSuccess(response))
    } catch (e) {
        yield put(loginFailure(e.message))
    }
}

export function* logoutFlow() {
    try {
        yield call(logout)
        yield put(logoutSuccess())
    } catch (e) {
        yield put(logoutFailure(e))
    }
}

export function* sessionWatcher() {
    yield takeLatest('login/REGISTER_REQUEST', registerFlow)
    yield takeLatest('login/LOGIN_REQUEST', loginFlow)
    yield takeLatest('login/LOGOUT_REQUEST', logoutFlow)
}
