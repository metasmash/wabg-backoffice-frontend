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
    isLoading: boolean
}

const initialState: userState = {
    currentUser: { username: '', role: RoleType.GUEST },
    users: [],
    error: '',
    isLoading: false,
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
        fetchUserFailed: () => {},
        createAdmin: (state, { payload: { username, password } }) => {
            state.isLoading = true
        },
        createAdminSuccess: (state, { payload: { username, role } }) => {
            state.isLoading = true
            state.users = [...state.users, { username: username, role: role }]
        },
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
