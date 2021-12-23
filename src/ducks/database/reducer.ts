import { createSlice } from '@reduxjs/toolkit'

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
    },
})
