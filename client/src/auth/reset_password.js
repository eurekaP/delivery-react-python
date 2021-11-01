import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import AuthPage from './auth_page'
import { ResetPasswordForm, ResetPasswordCompleteForm, ResetPasswordDoneContent } from './reset_password_form'
import config from '../config'


export const ResetPassword = () => {
    const location = useLocation()
    const initialLocation = location.state && location.state.initialLocation
    const linkProps = {state: { initialLocation: initialLocation }}
    return (
        <AuthPage
            title="Forgot Password?"
            //subTitle="Enter email address to continue"
            form={<ResetPasswordForm />}
            link={{to: { pathname: config.urls.register, ...linkProps }, subText: "Do not have an account?", marginTop: "30px", text: "Sign up!"}}
        />
    )
}


export const ResetPasswordDone = () => {
    const location = useLocation()
    const initialLocation = location.state && location.state.initialLocation
    const linkProps = {state: { initialLocation: initialLocation }}

    const email = location.state?.email

    if(!email) {
        return <Redirect to={ config.urls.passwordReset } />
    }

    return (
    <AuthPage
        title="Password Reset - Check Email"
        form={(
            <ResetPasswordDoneContent email={email} />
        )}
        link={{to: { pathname: config.urls.register, ...linkProps }, subText: "Do not have an account?", marginTop: "30px", text: "Sign up!"}}
        />
    )
}


export const ResetPasswordConfirm = () => {
    const location = useLocation()
    const initialLocation = location.state && location.state.initialLocation
    return (
    <AuthPage title="Reset Password"
        subTitle="To recover access, enter your new password."
        subtitleMargin="32px"
        form={<ResetPasswordCompleteForm />}
        link={{to: config.urls.passwordReset, subText: "Do not have an account?", text: "Sign up!", marginTop: "30px"}}
        linkProps={{state: { initialLocation: initialLocation }}}
        >
    </AuthPage>
    )
}


// vim:ts=4:sw=4:expandtab
