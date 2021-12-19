import { RootState } from '../root/store'

export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated

export const selectIsLoading = (state: RootState) => state.auth.isLoading

export const selectAuthError = (state: RootState) => state.auth.error
