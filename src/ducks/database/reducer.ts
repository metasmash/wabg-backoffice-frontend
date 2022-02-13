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
        editTable: (state, { payload }) => {},
        editTableFailed: (state) => {},
        editTableSuccess: (state, { payload }) => {
            const { idName, newValues, id } = payload
            console.log(payload)
            state.currentTable = _.map(state.currentTable, (x) =>
                `${x[idName]}` === `${id}` ? newValues : x
            )
        },
    },
})
