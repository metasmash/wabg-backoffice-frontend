import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from './component/Layout'
import { CssBaseline } from '@material-ui/core'
import { Login } from './pages/Login'
import { ProtectedRoute } from './component/ProtectedRoute'
import { Home } from './pages/Home'

export default function AppRoutes() {
    return (
        <>
            <CssBaseline />
            <Switch>
                <Route path="/">
                    <Login />
                </Route>
                <ProtectedRoute path="/home">
                    <Home />
                </ProtectedRoute>
            </Switch>
        </>
    )
}
