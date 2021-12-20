import { createSlice } from '@reduxjs/toolkit'
import { getUserToken, purgeToken } from '../../request'

enum RoleType {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    GUEST = '',
}

interface authState {
    isAuthenticated: boolean
    username: string
    role: RoleType
    isLoading: boolean
    error: any
}

const initialState: authState = {
    isAuthenticated: !!getUserToken(),
    username: '',
    role: RoleType.GUEST,
    isLoading: false,
    error: '',
}

export const authSlice = createSlice({
    name: '@@auth',
    initialState,
    reducers: {
        login: (state, { payload: { username, password } }) => {
            state.isLoading = true
        },
        loginSuccess: (state) => {
            state.isAuthenticated = true
            state.isLoading = false
        },
        loginFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        clearError: (state) => {
            state.error = ''
        },
        logout: (state) => {
            purgeToken()
            window.location.reload()
        },
        fetchUser: () => {},
        fetchUserSuccess: (state, { payload }) => {
            state.username = payload.username
            state.role = payload.role
        },
    },
})
