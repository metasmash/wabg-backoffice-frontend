import { createSlice } from '@reduxjs/toolkit'
import { getUserToken, purgeToken } from '../../request'

enum UserType {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    GUEST = '',
}

interface authState {
    isAuthenticated: boolean
    username: string
    userType: UserType
    isLoading: boolean
    error: any
}

const initialState: authState = {
    isAuthenticated: !!getUserToken(),
    username: '',
    userType: UserType.GUEST,
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
    },
})
