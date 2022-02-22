import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

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
            state.isLoading = false
            state.users = [...state.users, { username: username, role: role }]
        },
        createSuperAdmin: (state, { payload: { username, password } }) => {},
        createSuperAdminSuccess: () => {},
        createUserFailed: (state, { payload }) => {
            state.error = payload
        },
        deleteUser: (state, { payload }) => {
            state.isLoading = true
        },
        deleteUserSuccess: (state, { payload }) => {
            state.isLoading = false
            state.users = _.filter(
                state.users,
                (user) => user.username != payload
            )
        },
        deleteUserFailed: (state) => {
            state.isLoading = true
            state.error = 'You cannot delete this user.'
        },
        clearErrors: (state) => {
            state.error = ''
        },
    },
})
