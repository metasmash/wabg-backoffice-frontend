import { RootState } from '../root/store'

export const selectCurrentUser = (state: RootState) => state.user.currentUser

export const selectAllUsers = (state: RootState) => state.user.users
