import { takeLatest, put, call } from 'redux-saga/effects'
import { services } from './services'
import { RoleType, userSlice } from './reducer'
import { authSlice } from '../auth/reducer'

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
        yield put(userSlice.actions.fetchUserFailed())
        yield put(authSlice.actions.logout())
        console.log(error)
    }
}
function* createAdminSaga({
    payload: { username, password },
}: {
    payload: { username: string; password: string }
}) {
    try {
        yield call(services.createAdmin, username.toLowerCase(), password)
        yield put(
            userSlice.actions.createAdminSuccess({
                username: username.toLowerCase(),
                role: RoleType.ADMIN,
            })
        )
    } catch (error) {
        yield put(
            userSlice.actions.createUserFailed(
                "Vous n'avez pas les droits nécessaires."
            )
        )
    }
}

export function* watchUser() {
    yield takeLatest(userSlice.actions.fetchUser, fetchUserSaga)
    yield takeLatest(userSlice.actions.fetchAllUsers, fetchAllUsersSaga)
    yield takeLatest(userSlice.actions.createAdmin, createAdminSaga)
}
