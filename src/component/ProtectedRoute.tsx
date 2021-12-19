import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { routes } from '../constants'
import { useAppSelector } from '../ducks/root/hooks'
import { selectIsAuthenticated } from '../ducks/auth/selector'

export function ProtectedRoute({ ...props }) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    if (!isAuthenticated) {
        return <Redirect to={routes.LOGIN} />
    }

    return <Route {...props} />
}
