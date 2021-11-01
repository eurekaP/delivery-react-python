import React, { useEffect, useState } from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline, StylesProvider } from '@material-ui/core'
//import { StylesProvider } from '@material-ui/styles'
import { Slide, Snackbar } from '@material-ui/core'
import { Button } from "./theme/components"

import { createBrowserHistory as createHistory } from 'history'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { inject, observer } from 'mobx-react'

//import drfProvider from 'ra-data-django-rest-framework'

import { authProvider as AuthProvider } from './auth'
import auth from './auth/stores'
import { app, ui} from './infra/stores'
import drfProvider from './infra/drf_provider'

import { Toast } from './lib/notifiers'
import api from './api'

import Routes from './routes'
import theme from './theme/index'

//import { jsx as _jsx } from 'react/jsx-runtime'
//import createCache from '@emotion/cache' // Cache with option to prepend emotion's style tag
//import { CacheProvider } from '@emotion/react'
import PropTypes from 'prop-types'

import { ConnectedRouter } from 'connected-react-router'
import withContext from 'recompose/withContext' // You should add recompose/withContext to your dependencies
import {
    //Admin,
    AuthContext, DataProviderContext, TranslationProvider, Resource,
    //Notification
} from 'react-admin'
//import { Trucks, TruckCreate, TruckEdit } from './core'
//import Toolbar from '@material-ui/core/Toolbar'
//import Typography from '@material-ui/core/Typography'

//import messages from './i18n'
import defaultMessages from 'ra-language-english'
import polyglotI18nProvider from 'ra-i18n-polyglot'

import { ThemeProvider as ThemeProvider5 } from '@mui/material/styles'
import { StylesProvider as StylesProvider5, createGenerateClassName  } from '@mui/styles'
import { CssBaseline as CssBaseline5 } from '@mui/material'
import { FullPageLoader } from './lib/common'

const stores = {
    app: app,
    auth: auth,
    ui: ui,
}

const dataProvider = drfProvider( stores.auth)
const authProvider = AuthProvider( stores.auth)
const history = createHistory()


//zz
window.__STATE__ = stores


//const cache = createCache({
//    key: 'css',
//    prepend: true
//})

process.env.NODE_ENV !== 'production' ? StylesProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,

  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override Material-UI's styles, set this prop.
   */
  injectFirst: PropTypes.bool
} : void 0


const i18nProvider = polyglotI18nProvider(locale => {
    if (locale !== 'en') {
        return 'no english'//messages[locale]
    }
    return defaultMessages
})

const generateClassName = createGenerateClassName({
    seed: 'App1',
})


//const MyAppBar = (props) => { return (<AppBar {...props} open={false} menu={<UserMenu />} />)}
//const AppLayout = (props) => { return (<Layout {...props} appBar={MyAppBar} />) }

const App = () => {

    return (
    <AuthContext.Provider value={authProvider}>
        <DataProviderContext.Provider value={dataProvider}>
            <TranslationProvider
                    locale='en'
                    i18nProvider={i18nProvider}
            >
                <StylesProvider injectFirst>
                        <ThemeProvider theme={theme()}>
                        <StylesProvider5 generateClassName={generateClassName} >
                            <ThemeProvider5 theme={theme()} >

                            <CssBaseline />
                            <CssBaseline5 />
                                {/*
                                <Admin theme={theme} loginPage={Login} history={history} authProvider={authProvider} dataProvider={dataProvider}>
                                <Resource name='trucks' list={Trucks} create={TruckCreate} edit={TruckEdit}/>
                                <Resource name='vmrs/ck2'/>
                                <Resource name='truck_companies'/> //my_fleets
                                </Admin>
                            */}
                                {/* intent can be route or registration */}
                                <Resource name='my_fleets' intent='registration'/>
                                <Resource name='trucks'    intent='registration' list edit create />
                                <Resource name='members'   intent='registration' list show create/>
                                <Resource name='vmrs/ck2'  intent='registration'/>
                                <Resource name='vmrs/ck34' intent='registration'/>
                                <ConnectedRouter history={history} >
                                    <ErrorHandling>
                                        <Routes/>
                                    </ErrorHandling>
                                </ConnectedRouter>
                                </ThemeProvider5>
                    </StylesProvider5>
                        </ThemeProvider>
                </StylesProvider>
            </TranslationProvider>
        </DataProviderContext.Provider>
    </AuthContext.Provider>
    )
}


const ErrorHandling = inject('ui', 'app', 'auth')( observer( ({ children, ui, app, auth }) => {
    const [newVersionAvailable, setNewVersionAvailable] = useState(false)
    const [waitingWorker, setWaitingWorker] = useState({})

    const onWorkerUpdate = (registration) => {
        setNewVersionAvailable(true)
        setWaitingWorker( registration && registration.waiting)
    }

    const updateServiceWorker = () => {
        waitingWorker && waitingWorker.postMessage({ type: 'SKIP_WAITING' })
        setNewVersionAvailable(false)
        window.location.reload()
    }

    useEffect(() => {
        serviceWorkerRegistration.register({
            onUpdate: onWorkerUpdate,
            setPushManager: app.setPushManager,
        })
        api.setServerErrorHandler(
            () => ui.setToast(
                'There has been a technical problem and our team has been notified about it.'
                + 'Please try again later!',
                'error'
            )
        )
        api.setNetworkErrorHandler(
            () => ui.setToast('There is a network problem. Please, try again later!', 'error')
        )
        auth.init()
        return () => {
            api.setServerErrorHandler( null)
            api.setNetworkErrorHandler( null)
        }
    }, [ui, app, auth])

    if (!auth.initialized) {
        return (
            <FullPageLoader /> 
        )
    }
    return (
    <>
        {children}
        <Toast />
        { newVersionAvailable && (<VersionUpdateMessage refresh={updateServiceWorker} />) }
    </>
    )
}))


const VersionUpdateMessage = props => {
    const transition = props => (<Slide {...props} direction='up' />)
    const { refresh } = props

    return (
    <Snackbar
       open={true}
       anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
       TransitionComponent={transition}
       message='A new version of Fleetpal has been downloaded. Please refresh!'
       action={
         <Button color='secondary' variant='contained' size='small' onClick={refresh}>
             Refresh
         </Button>
       }
    />
    )
}

//export default App
//use this when not using Admin component
export default withContext(
   {
       authProvider: PropTypes.object,
   },
   () => ({ authProvider })
)(App)

export { dataProvider, authProvider, history, stores }

// vim:ts=4:sw=4:expandtab
