import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './component/ProtectedRoute'
import { Home } from './pages/Home'
import { AuthLayout } from './component/AuthLayout'
import { routes } from './constants'

export default function AppRoutes() {
    return (
        <>
            <CssBaseline />
            <Switch>
                <AuthLayout exact path={routes.LOGIN}>
                    <LoginPage />
                </AuthLayout>
                <ProtectedRoute exact path={routes.HOME}>
                    <Home />
                </ProtectedRoute>
                <Redirect from={routes.ROOT} to={routes.HOME} />
            </Switch>
        </>
    )
}
