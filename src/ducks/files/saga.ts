import { takeLatest, put, call } from 'redux-saga/effects'
import { services } from './services'
import { filesSlice } from './reducer'

function* getFilesSaga({ payload }: { payload: string }) {
    const [...currentFiles] = yield call(services.getFiles, payload)
    yield put(filesSlice.actions.getFilesSuccess(currentFiles))
}

function* uploadFileSaga({ payload }: { payload: File }) {
    console.log('ok')
}

export function* watchFiles() {
    yield takeLatest(filesSlice.actions.getFiles, getFilesSaga)
    yield takeLatest(filesSlice.actions.uploadFile, uploadFileSaga)
}
