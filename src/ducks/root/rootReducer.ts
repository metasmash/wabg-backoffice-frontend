import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { authSlice } from '../auth/reducer'
import { databaseSlice } from '../database/reducer'
import { userSlice } from '../user/reducer'

export const rootReducer = (history: any) =>
    combineReducers({
        auth: authSlice.reducer,
        database: databaseSlice.reducer,
        user: userSlice.reducer,
        router: connectRouter(history),
    })
