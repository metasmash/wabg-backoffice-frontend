import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export function ProtectedRoute({ ...props }) {
    const isAuthenticated = false
    if (!isAuthenticated) {
        console.log('redirected')
        return <Redirect to="/" />
    }

    return <Route {...props} />
}
