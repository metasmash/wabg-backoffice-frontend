import { createSlice } from '@reduxjs/toolkit'
import { getUserToken, purgeToken } from '../../request'
import { addNotification } from '../../component/Notification'

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
            addNotification({
                notificationType: 'success',
                message: 'Vous êtes connecté!',
            })
        },
        loginFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
            addNotification({
                notificationType: 'danger',
                message: "Nom d'utilisateur ou mot de passe incorrect.",
            })
        },
        clearError: (state) => {
            state.error = ''
        },
        logout: (state) => {
            purgeToken()
            window.location.reload()
            addNotification({
                notificationType: 'info',
                message: 'Déconnexion en cours...',
            })
        },
    },
})
