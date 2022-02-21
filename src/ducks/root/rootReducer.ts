import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { authSlice } from '../auth/reducer'
import { databaseSlice } from '../database/reducer'
import { userSlice } from '../user/reducer'
import { filesSlice } from '../files/reducer'

export const rootReducer = (history: any) =>
    combineReducers({
        auth: authSlice.reducer,
        database: databaseSlice.reducer,
        files: filesSlice.reducer,
        user: userSlice.reducer,
        router: connectRouter(history),
    })
