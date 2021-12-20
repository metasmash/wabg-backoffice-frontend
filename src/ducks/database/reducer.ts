import { createSlice } from '@reduxjs/toolkit'

interface databaseState {
    tables: Array<string>
    isLoading: boolean
}

const initialState: databaseState = {
    tables: [],
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
    },
})
