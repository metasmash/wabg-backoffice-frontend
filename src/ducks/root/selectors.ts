import { RootState } from './store'

export const selectIsLoading = (state: RootState) =>
    state.database.isLoading ||
    state.auth.isLoading ||
    state.user.isLoading ||
    state.files.isFileLoading
