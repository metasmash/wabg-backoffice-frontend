import React from 'react'
import { Provider } from 'react-redux'
import { store, history } from './ducks/root/store'
import { ConnectedRouter } from 'connected-react-router'
import AppRoutes from './AppRoutes'
import { Login } from './pages/Login'

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    test
                    <AppRoutes />
                </ConnectedRouter>
            </Provider>
        </div>
    )
}

export default App
