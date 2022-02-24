import { createSlice } from '@reduxjs/toolkit'
import { addNotification } from '../../component/Notification'

interface filesState {
    currentFiles: Array<string>
    isFileLoading: boolean
}

const initialState: filesState = {
    currentFiles: [],
    isFileLoading: false,
}

export const filesSlice = createSlice({
    name: '@@files',
    initialState,
    reducers: {
        getFiles(state, { payload }) {
            state.isFileLoading = true
        },
        getFilesSuccess(state, { payload }) {
            state.isFileLoading = false
            state.currentFiles = payload
        },
        getFilesFailed(state, { payload }) {
            state.isFileLoading = false
            state.currentFiles = []
            addNotification({
                notificationType: 'danger',
                message: 'Error lors du chargement des fichiers',
            })
        },
        uploadFile(state, { payload }) {
            state.isFileLoading = true
        },
        uploadFileSuccess(state, { payload }) {
            state.isFileLoading = false
            addNotification({
                notificationType: 'success',
                message: 'Fichier ' + payload + ' ajouté avec succès!',
            })
        },
        uploadFileFailed(state, { payload }) {
            state.isFileLoading = false
            addNotification({
                notificationType: 'danger',
                message: "Error lors de l'ajout de " + payload,
            })
        },
        deleteFile(state, { payload }) {
            state.isFileLoading = true
        },
        deleteFileSuccess(state) {
            addNotification({
                notificationType: 'success',
                message: 'Fichier supprimé avec succès!',
            })
            state.isFileLoading = false
        },
        deleteFileFailed(state) {
            state.isFileLoading = false
            addNotification({
                notificationType: 'danger',
                message: 'Erreur lors de la supression du fichier.',
            })
        },
    },
})
