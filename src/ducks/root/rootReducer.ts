import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { authSlice } from '../auth/reducer'
import { databaseSlice } from '../database/reducer'

export const rootReducer = (history: any) =>
    combineReducers({
        auth: authSlice.reducer,
        database: databaseSlice.reducer,
        router: connectRouter(history),
    })
