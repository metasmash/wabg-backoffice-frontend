import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { addNotification } from '../../component/Notification'

interface databaseState {
    tables: Array<string>
    currentTable: Array<any>
    backups: Array<string>
    isLoading: boolean
    successNotification: string
    errorNotification: string
}

const initialState: databaseState = {
    tables: [],
    currentTable: [],
    isLoading: false,
    backups: [],
    successNotification: '',
    errorNotification: '',
}

export const databaseSlice = createSlice({
    name: '@@database',
    initialState,
    reducers: {
        getTables: (state) => {
            state.isLoading = true
        },
        getTablesSuccess: (state, { payload }) => {
            state.tables = payload
            state.isLoading = false
        },
        getTableByName: (state, { payload }) => {
            state.isLoading = true
        },
        getTableByNameSuccess: (state, { payload }) => {
            state.currentTable = payload
            state.isLoading = false
        },
        getTableByNameFailed: (state) => {
            state.isLoading = false
        },
        deleteTableRowById: (state, { payload }) => {},
        deleteTableRowByIdSuccess: (state, { payload }) => {
            const { idName, id } = payload
            state.currentTable = _.filter(
                state.currentTable,
                (x) => x[idName] !== id
            )
        },
        deleteTableRowByIdFailed: (state, { payload }) => {
            console.log(payload)
        },
        editTable: (state, { payload }) => {},
        editTableFailed: (state, { payload }) => {
            console.log(payload)
        },
        editTableSuccess: (state, { payload }) => {
            const { idName, newValues, id } = payload
            state.currentTable = _.map(state.currentTable, (x) =>
                `${x[idName]}` === `${id}` ? newValues : x
            )
        },
        getBackups: (state) => {},
        getBackupsSuccess: (state, { payload }) => {
            state.backups = payload
        },
        getBackupsFailed: (state) => {
            state.backups = []
        },
        saveBackup: (state) => {
            state.isLoading = true
        },
        saveBackupSuccess: (state, { payload }) => {
            state.backups = [payload, ...state.backups]
            state.isLoading = false
            addNotification({
                notificationType: 'success',
                message: 'Backup ajouté avec succès!',
            })
        },
        saveBackupFailed: (state, { payload }) => {
            state.isLoading = false
            addNotification({
                notificationType: 'warning',
                message:
                    'Une erreur est survenue lors de la création du backup.',
            })
        },
        loadBackup: (state, { payload }) => {
            state.isLoading = true
        },
        loadBackupSuccess: (state, { payload }) => {
            addNotification({
                notificationType: 'success',
                message: `Backup ${payload} chargé avec succès.`,
            })
            state.isLoading = false
        },
        loadBackupFailed: (state) => {
            addNotification({
                notificationType: 'warning',
                message:
                    'Error lors du chargement du backup. Veuillez contacter votre SUPER ADMIN de toute urgence.',
            })
            state.isLoading = false
        },
    },
})
