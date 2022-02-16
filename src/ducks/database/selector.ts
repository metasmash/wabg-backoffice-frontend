import { RootState } from '../root/store'

export const selectTables = (state: RootState) => state.database.tables
export const selectCurrentTable = (state: RootState) =>
    state.database.currentTable
export const selectIsLoading = (state: RootState) => state.database.isLoading
export const selectBackups = (state: RootState) => state.database.backups
