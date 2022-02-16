import React from 'react'
import { Provider } from 'react-redux'
import { store, history } from './ducks/root/store'
import { ConnectedRouter } from 'connected-react-router'
import AppRoutes from './AppRoutes'
import { Notification } from './component/Notification'

function App() {
    return (
        <div className="App">
            <Notification />
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <AppRoutes />
                </ConnectedRouter>
            </Provider>
        </div>
    )
}

export default App
