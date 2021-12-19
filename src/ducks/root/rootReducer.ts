import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { authSlice } from '../auth/reducer'

export const rootReducer = (history: any) =>
    combineReducers({
        auth: authSlice.reducer,
        router: connectRouter(history),
    })
