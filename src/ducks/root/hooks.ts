import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { AppDispatch, RootState, store } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const getCurrentPath = () =>
    '/' + _.split(store.getState().router.location.pathname, '/')[1]
