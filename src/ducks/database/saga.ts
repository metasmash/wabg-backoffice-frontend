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

function* getTableByNameSaga({ payload }: { payload: string }) {
    try {
        const [...tables] = yield call(services.getTableByName, payload)
        yield put(databaseSlice.actions.getTableByNameSuccess(tables))
    } catch (error) {
        yield put(databaseSlice.actions.getTableByNameFailed)
    }
}

function* editTableSaga({ payload }: { payload: any }) {
    try {
        const { id, newValues, tableName, idName } = payload
        yield call(services.editTableByName, {
            id,
            newValues,
            tableName,
        })

        yield put(
            databaseSlice.actions.editTableSuccess({ idName, newValues, id })
        )
    } catch (error) {
        yield put(databaseSlice.actions.editTableFailed(error))
    }
}

function* deleteTableRowByIdSaga({ payload }: { payload: any }) {
    try {
        const { id, tableName, idName } = payload

        console.log(payload)

        yield call(services.deleteTableRowById, { id, tableName })

        yield put(
            databaseSlice.actions.deleteTableRowByIdSuccess({ idName, id })
        )
    } catch (error) {
        yield put(databaseSlice.actions.deleteTableRowByIdFailed(error))
    }
}

export function* watchDatabase() {
    yield takeLatest(databaseSlice.actions.getTables, getTablesSaga)
    yield takeLatest(databaseSlice.actions.getTableByName, getTableByNameSaga)
    yield takeLatest(databaseSlice.actions.editTable, editTableSaga)
    yield takeLatest(
        databaseSlice.actions.deleteTableRowById,
        deleteTableRowByIdSaga
    )
}
