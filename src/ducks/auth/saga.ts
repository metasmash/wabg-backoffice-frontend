import { takeLatest, put, call } from 'redux-saga/effects'
import { authSlice } from './reducer'
import { services } from './services'

function* loginSaga({
    payload: { username, password },
}: {
    payload: { username: string; password: string }
}) {
    try {
        yield call(services.login, username.toLowerCase(), password)
        yield put(authSlice.actions.loginSuccess())
    } catch (error) {
        yield put(
            authSlice.actions.loginFailed(
                'Mot de passe ou utilisateur incorrect.'
            )
        )
    }
}

function* fetchUserSaga() {
    try {
        const { role, username } = yield call(services.fetchUser)
        yield put(authSlice.actions.fetchUserSuccess({ role, username }))
    } catch (error) {
        console.log(error)
    }
}

export function* watchAuth() {
    yield takeLatest(authSlice.actions.login, loginSaga)
    yield takeLatest(authSlice.actions.fetchUser, fetchUserSaga)
}
