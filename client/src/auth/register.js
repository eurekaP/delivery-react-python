import React, { useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { inject } from 'mobx-react'

import AuthPage from './auth_page'
import RegisterForm from './register_form'
import config from '../config'
import api from '../api'


export const Register = () => {
    const location = useLocation()
    const initialLocation = location.state && location.state.initialLocation
    const linkProps = {state: { initialLocation: initialLocation }}
    return (
    <AuthPage
        title="Sign Up"
        subTitle="Please, fill out the information below."
        form={<RegisterForm />}
        linkProps={linkProps}
        googleButton={{ signUp: true, buttonText:"Continue with Google" }}
        link={{ subText:"Have an account?", text: "Sign in.", to: { pathname: config.urls.login, ...linkProps } }}
        divider={{ marginTop: 6 }}
        >
    </AuthPage>
    )
}


export const RegisterDone = () => {
    return (
    <AuthPage
        title="Sign Up"
        subtitle="Confirm your email to continue"
        form={(
            <div>
                You will shortly receive a confirmation link on your email address.
                Please, check your email for new messages and click the link to confirm your
                email address and login.
                Thank you!
            </div>
        )}
        link={{to: config.urls.register, text: "Try with another email address?"}}
        />
    )
}


export const RegisterConfirm = inject('auth', 'ui')( ({ auth, match, ui }) => {
    const { key } = match.params
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth.registerConfirm( key)
            .catch( errors =>  {
                if(api.cancelled) return
                ui.setToast( errors?.data?.detail?.message || 'Unknown Error', 'error' )
            })
            // .finally( () => !api.cancelled && setLoading(false))
        setLoading(false)
    }, [auth, setLoading, key, ui])

    if (!loading) {
        return <Redirect to={config.urls.root} />
    }
    return null
})


export default Register

// vim:ts=4:sw=4:expandtab
