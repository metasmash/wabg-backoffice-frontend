import { takeLatest, put, call } from 'redux-saga/effects'
import _ from 'lodash'
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

function* deleteFileSaga({ payload }: { payload: { path: string } }) {
    try {
        const { path } = payload
        console.log(path)
        const folderPath = _.join(_.dropRight(_.split(path, '/')), '/')
        yield call(services.deleteFile, path)
        yield put(filesSlice.actions.getFiles(folderPath))
        yield put(filesSlice.actions.deleteFileSuccess())
    } catch (error) {
        console.log(error)
        yield put(filesSlice.actions.deleteFileFailed())
    }
}

export function* watchFiles() {
    yield takeLatest(filesSlice.actions.getFiles, getFilesSaga)
    yield takeLatest(filesSlice.actions.uploadFile, uploadFileSaga)
    yield takeLatest(filesSlice.actions.deleteFile, deleteFileSaga)
}
