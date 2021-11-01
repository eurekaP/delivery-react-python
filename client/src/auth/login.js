import { useLocation } from 'react-router-dom'

import AuthPage from './auth_page'
import LoginForm from './login_form'

import config from '../config'

const Login = () => {
    const location = useLocation()
    const initialLocation = location.state && location.state.initialLocation
    const linkProps= {state: { initialLocation: initialLocation }}

    return (
    <AuthPage
        title="Sign in with Email address"
        form={<LoginForm />}
        // link={{url: config.urls.register, text: "Don't have an account?"}}
        linkProps={linkProps}
        link={{ subText:"Do not have an account?", text: "Sign up!", to: { pathname: config.urls.register, ...linkProps } }}
        googleButton={{ buttonText: "Continue with Google" }}
        >
    </AuthPage>
    )
}


export default Login

// vim:ts=4:sw=4:expandtab
