import { all, call } from 'redux-saga/effects'
import { watchAuth } from '../auth/saga'
import { watchDatabase } from '../database/saga'
import { watchUser } from '../user/saga'

export function* rootSaga() {
    yield all([call(watchAuth), call(watchDatabase), call(watchUser)])
}
