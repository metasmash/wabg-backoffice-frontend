import { takeLatest, put, call } from 'redux-saga/effects'
import { services } from './services'
import { filesSlice } from './reducer'

function* getFilesSaga({ payload }: { payload: string }) {
    const [...currentFiles] = yield call(services.getFiles, payload)
    yield put(filesSlice.actions.getFilesSuccess(currentFiles))
}

function* uploadFileSaga({
    payload,
}: {
    payload: { file: File; path: string }
}) {
    try {
        const { file, path } = payload
        yield call(services.uploadFile, { file, path })
        yield put(filesSlice.actions.getFiles(path))
        yield put(filesSlice.actions.uploadFileSuccess(file.name))
    } catch (error) {
        yield put(filesSlice.actions.uploadFileFailed(payload.file.name))
    }
}

export function* watchFiles() {
    yield takeLatest(filesSlice.actions.getFiles, getFilesSaga)
    yield takeLatest(filesSlice.actions.uploadFile, uploadFileSaga)
}
