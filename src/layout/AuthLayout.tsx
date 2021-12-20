import React from 'react'
import { useAppSelector } from '../ducks/root/hooks'
import { selectIsAuthenticated } from '../ducks/auth/selector'
import { Redirect, Route } from 'react-router-dom'
import { routes } from '../constants'

export const AuthLayout = ({ ...props }) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    if (isAuthenticated) {
        return <Redirect to={routes.HOME} />
    }

    return <Route {...props} />
}
