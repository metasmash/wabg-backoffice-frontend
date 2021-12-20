import { takeLatest, put, call } from 'redux-saga/effects'
import { services } from './services'
import { databaseSlice } from './reducer'

function* getTablesSaga() {
    try {
        const [...data] = yield call(services.getTables)
        yield put(databaseSlice.actions.getTablesSuccess(data))
    } catch (error) {
        console.log(error)
    }
}

export function* watchDatabase() {
    yield takeLatest(databaseSlice.actions.getTables, getTablesSaga)
}
