import { RootState } from '../root/store'

export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated
