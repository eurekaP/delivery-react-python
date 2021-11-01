import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router-dom'
import { generatePath } from  'react-router'
import { inject, observer } from 'mobx-react'
import { Resource } from 'react-admin'

import { MainLayout, CompanyPage, Error404 } from './components'
import { Blank } from './lib/others'
import { Login, Register, RegisterDone, RegisterConfirm,
    ResetPassword, ResetPasswordDone, ResetPasswordConfirm,
    UserProfile,
} from './auth'
import { InviteAccept } from './members'
import {
    TruckList, TruckCreate, TruckEdit, TruckShow, TruckAssignDriver,
    InitialSetup, CreateCompany,
} from './base'

import config from './config'


const Routes = inject('ui', 'auth')( observer( ({ auth, ...props }) => {
    const currentCompanyId = auth.currentCompanyId
    const location = useLocation()
    if (location.state && location.state.message) {
        props.ui.setToast( location.state.message)
    }

    const companyRoutes = {}
    const companyResources = ['trucks', 'members', 'settings']
    for (const key of companyResources) {
        companyRoutes[ key] = currentCompanyId ? generatePath( config.urls[key], { company: currentCompanyId }) : ''
    }
    companyRoutes.assignDriver = currentCompanyId ? generatePath( config.urls.trucks_assign_driver, { company: currentCompanyId, truck: ':truck' }) : ''

    const defaultPath = companyRoutes.trucks || config.urls.initialSetup

    return (
    <Switch>
        <Route exact path={config.urls.root}>
            <Redirect to={defaultPath} />
        </Route>

        <Route path={config.urls.passwordResetConfirm} component={ResetPasswordConfirm} />

        <Route path={[
            config.urls.login,
            config.urls.register,
            config.urls.passwordResetDone,
            config.urls.passwordReset,
            config.urls.invitationsAccept,
            ]} >
            <AnonymousRequired>
                <Switch>
                    <Route path={config.urls.login} component={Login} />
                    <Route path={config.urls.register} component={Register} />
                    <Route path={config.urls.passwordResetDone} component={ResetPasswordDone} />
                    <Route path={config.urls.passwordReset} component={ResetPassword} />
                    <Route path={config.urls.invitationsAccept} component={InviteAccept} />

                </Switch>
            </AnonymousRequired>
        </Route>

        <Route path={config.urls.logout} component={Logout} />

        <Route path={config.urls.registerDone} component={RegisterDone} />
        <Route path={config.urls.registerConfirm} component={RegisterConfirm} />

        <AuthRoute path={config.urls.initialSetup}>
            <EmptyMembershipsRequired>
                 <InitialSetup />
            </EmptyMembershipsRequired>
        </AuthRoute>

        <AuthRoute path={config.urls.userProfile}>
            <MainLayout>
                <UserProfile />
            </MainLayout>
        </AuthRoute>

        <Route path={[
            config.urls.createCompany,
            config.urls.trucks,
            config.urls.trucks_assign_driver,
            config.urls.blank,
            config.urls.company
            ]}>
            <LoginRequired>
                <MembershipRequired>
                    <MainLayout>
                        <Switch>
                            <Route path={config.urls.createCompany} component={CreateCompany} />
                            <Route path={companyRoutes.assignDriver} component={TruckAssignDriver} />
                            <Route path={config.urls.company} component={CompanyPage} />
                            <Resource match={{ path: companyRoutes.trucks }} name='trucks' intent='route'
                                list={TruckList}
                                edit={TruckEdit}
                                show={TruckShow}
                                create={TruckCreate}
                            />
                        </Switch>
                        <Route path={config.urls.blank} component={Blank}/>
                    </MainLayout>
                </MembershipRequired>
            </LoginRequired>
        </Route>

        <Route path={config.urls.error404} component={Error404} />
        <Route component={Error404} />
    </Switch>
    )
}))


const AuthRoute = ({ path, children, ...props }) => {
    return (
    <Route path={path} {...props}>
        <LoginRequired>
            {children}
        </LoginRequired>
    </Route>
    )
}

const MembershipRequired = inject('auth')( observer( ({ children, auth}) => {
    const m = auth.getMembership()
    const location = useLocation()
    if (!m) {
        return <Redirect to={config.urls.initialSetup} />
    }
    const { company } = useParams()
    if (company && company.toString() !== auth.currentCompanyId.toString()) {
        if (auth.getMembership( company, null)) {
            auth.setCurrentCompanyId( company)
            return <Redirect to={location.pathname} />
        }
        auth.setCurrentCompanyId( m.company.id)
        return <Redirect to={config.urls.root} />
    }
    if (!auth.currentCompanyId) {
        auth.setCurrentCompanyId( m.company.id)
    }
    return children
}))


const EmptyMembershipsRequired = inject('auth')( observer( ({ children, auth}) => {
    const m = auth.getMembership()
    if (m) {
        return <Redirect to={config.urls.root} />
    }
    return children
}))


const LoginRequired = inject('auth')( observer( ({ children, auth}) => {
    const pathname = useLocation().pathname

    if (auth.redirectUrl === null) {
        auth.setRedirectUrl( (pathname === config.urls.root || pathname === config.urls.initialSetup) ? '' : pathname)
    }

    if (!auth.user) {
        return <Redirect to={{
            pathname: config.urls.login,
            search: auth.redirectUrl ? `?next=${auth.redirectUrl}` : '',
        }} />
    }
    return children
}))


const AnonymousRequired = inject('auth')( observer( ({ children, auth }) => {
    const location = useLocation()
    const next = new URLSearchParams(location.search).get('next')
    if (auth.user) {
        return <Redirect to={{
            pathname: (next && next !== config.urls.logout && next) || config.urls.root
        }} />
    }
    return children
}))


const Logout = inject('auth')( observer( ({ auth }) => {
    useEffect( () => auth.logout(), [auth])
    if (!auth.user) {
        return <Redirect to={config.urls.root} />
    }
    return null
}))


export default Routes

// vim:ts=4:sw=4:expandtab
