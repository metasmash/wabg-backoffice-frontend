import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { addNotification } from '../../component/Notification'

interface filesState {
    currentFiles: Array<string>
}

const initialState: filesState = {
    currentFiles: [],
}

export const filesSlice = createSlice({
    name: '@@files',
    initialState,
    reducers: {
        getFiles(state, { payload }) {},
        getFilesSuccess(state, { payload }) {
            state.currentFiles = payload
        },
        getFilesFailed(state) {
            state.currentFiles = []
        },
    },
})
