import { RootState } from '../root/store'

export const selectTables = (state: RootState) => state.database.tables
