import { takeLatest, put, call } from 'redux-saga/effects'
import { services } from './services'
import { authSlice } from '../auth/reducer'
import { databaseSlice } from '../database/reducer'
import { userSlice } from './reducer'

function* fetchUserSaga() {
    try {
        const { role, username } = yield call(services.fetchUser)
        yield put(userSlice.actions.fetchUserSuccess({ role, username }))
    } catch (error) {
        console.log(error)
    }
}

function* fetchAllUsersSaga() {
    try {
        const [...users] = yield call(services.fetchAllUsers)
        yield put(userSlice.actions.fetchAllUsersSuccess(users))
    } catch (error) {
        console.log(error)
    }
}

export function* watchUser() {
    yield takeLatest(userSlice.actions.fetchUser, fetchUserSaga)
    yield takeLatest(userSlice.actions.fetchAllUsers, fetchAllUsersSaga)
}
