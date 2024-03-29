import { RootState } from '../root/store'

export const selectTables = (state: RootState) => state.database.tables
export const selectCurrentTable = (state: RootState) =>
    state.database.currentTable
export const selectIsDatabaseLoading = (state: RootState) =>
    state.database.isLoading
