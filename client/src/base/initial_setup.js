import React, { useState } from 'react'

import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { useStyles } from '../auth/login_form'
import AuthPage from '../auth/auth_page'
import CompanyForm from './company_form'
import config from '../config'


export const InitialSetup = inject('auth')( observer( ({auth}) => {
    const classes = useStyles()
    const [done, setDone] = useState(false)

    if (done) {
        return <Redirect to={config.urls.root} />
    }
    return (
    <AuthPage title='Your company'
        subtitle={`${auth.userFullName} owns the following business`}
        form={<CompanyForm withLogo onSubmit={() => setDone(true)} />}
        classes={classes}
        link={{to: config.urls.logout, text: "Sign in with a different account?"}}
        >
    </AuthPage>
    )
}))


export default InitialSetup

// vim:ts=4:sw=4:expandtab
