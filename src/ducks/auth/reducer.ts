import { createSlice } from '@reduxjs/toolkit'
import { getUserToken, purgeToken } from '../../request'

interface authState {
    isAuthenticated: boolean

    isLoading: boolean
    error: any
}

const initialState: authState = {
    isAuthenticated: !!getUserToken(),

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
