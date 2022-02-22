import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { rootReducer } from './rootReducer'
import { rootSaga } from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
export const history = createBrowserHistory()

export const store = configureStore({
    reducer: rootReducer(history),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
            routerMiddleware(history),
            sagaMiddleware
        ),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
