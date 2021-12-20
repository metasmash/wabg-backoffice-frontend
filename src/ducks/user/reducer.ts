import { createSlice } from '@reduxjs/toolkit'

type User = {
    username: string
    role: RoleType
}

export enum RoleType {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    GUEST = '',
}

interface userState {
    currentUser: User
    users: Array<User>
    error: string
}

const initialState: userState = {
    currentUser: { username: '', role: RoleType.GUEST },
    users: [],
    error: '',
}

export const userSlice = createSlice({
    name: '@@user',
    initialState,
    reducers: {
        fetchAllUsers: (state) => {},
        fetchAllUsersSuccess: (state, { payload }) => {
            state.users = payload
        },
        fetchUser: () => {},
        fetchUserSuccess: (state, { payload }) => {
            state.currentUser = payload
        },
        createAdmin: (state, { payload: { username, password } }) => {},
        createAdminSuccess: (state, payload) => {},
        createSuperAdmin: (state, { payload: { username, password } }) => {},
        createSuperAdminSuccess: () => {},
        createUserFailed: (state, { payload }) => {
            state.error = payload
        },
        clearErrors: (state) => {
            state.error = ''
        },
    },
})
