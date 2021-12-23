import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { routes } from '../constants'
import { useAppDispatch, useAppSelector } from '../ducks/root/hooks'
import { selectIsAuthenticated } from '../ducks/auth/selector'
import { databaseSlice } from '../ducks/database/reducer'
import { HeaderBar } from '../component/HeaderBar'
import { Layout } from './Layout'
import { userSlice } from '../ducks/user/reducer'

export function ProtectedRoute({ ...props }) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(userSlice.actions.fetchUser())
            dispatch(databaseSlice.actions.getTables())
            dispatch(userSlice.actions.fetchAllUsers())
        }
    }, [])

    if (!isAuthenticated) {
        return <Redirect to={routes.LOGIN} />
    }

    return (
        <>
            <HeaderBar />
            <Layout>
                <Route {...props} />
            </Layout>
        </>
    )
}
