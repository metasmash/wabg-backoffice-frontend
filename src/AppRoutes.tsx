import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './layout/ProtectedRoute'
import { Home } from './pages/Home'
import { AuthLayout } from './layout/AuthLayout'
import { routes } from './constants'
import { TablesPage } from './pages/TablesPage'
import { UsersPage } from './pages/UsersPage'
import { EditTable } from './pages/EditTable'

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
                <ProtectedRoute exact path={routes.TABLES}>
                    <TablesPage />
                </ProtectedRoute>
                <ProtectedRoute exact path={routes.USERS}>
                    <UsersPage />
                </ProtectedRoute>
                <ProtectedRoute exact path={routes.TABLE_EDIT}>
                    <EditTable />
                </ProtectedRoute>
                <Redirect from={routes.ROOT} to={routes.HOME} />
            </Switch>
        </>
    )
}
