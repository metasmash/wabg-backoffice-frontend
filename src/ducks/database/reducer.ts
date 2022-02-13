import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

interface databaseState {
    tables: Array<string>
    currentTable: Array<any>
    isLoading: boolean
}

const initialState: databaseState = {
    tables: [],
    currentTable: [],
    isLoading: false,
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
    },
})
