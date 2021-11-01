import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './sys/reportWebVitals'
//import { Router } from 'react-router-dom'

//import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './assets/style.scss'

import { Provider as MobxProvider,
    //inject,
    //observer
} from 'mobx-react'
import createAdminStore from './infra/createAdminStore'
import { dataProvider, authProvider, history, stores } from './app'
import App from './app'

//Provider must be outside ReactAdminApp
ReactDOM.render(
    <Provider  store = { createAdminStore({
        authProvider,
        dataProvider,
        history,
        })}
    >
        <MobxProvider {...stores}>
            <App />
        </MobxProvider>
    </Provider>,
    document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// vim:ts=4:sw=4:expandtab

