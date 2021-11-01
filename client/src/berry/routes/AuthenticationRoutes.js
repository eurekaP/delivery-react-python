import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';

// project imports
import MinimalLayout from './../layout/MinimalLayout';

// login option 1 routing
const AuthLogin1 = Loadable(lazy(() => import('../views/pages/authentication/authentication1/Login1')));
const AuthRegister1 = Loadable(lazy(() => import('../views/pages/authentication/authentication1/Register1')));
const AuthForgotPassword1 = Loadable(lazy(() => import('../views/pages/authentication/authentication1/ForgotPassword1')));
const AuthCheckMail1 = Loadable(lazy(() => import('../views/pages/authentication/authentication1/CheckMail1')));
const AuthResetPassword1 = Loadable(lazy(() => import('../views/pages/authentication/authentication1/ResetPassword1')));
const AuthCodeVerification1 = Loadable(lazy(() => import('../views/pages/authentication/authentication1/CodeVerification1')));

// login option 2 routing
const AuthLogin2 = Loadable(lazy(() => import('../views/pages/authentication/authentication2/Login2')));
const AuthRegister2 = Loadable(lazy(() => import('../views/pages/authentication/authentication2/Register2')));
const AuthForgotPassword2 = Loadable(lazy(() => import('../views/pages/authentication/authentication2/ForgotPassword2')));
const AuthCheckMail2 = Loadable(lazy(() => import('../views/pages/authentication/authentication2/CheckMail2')));
const AuthResetPassword2 = Loadable(lazy(() => import('../views/pages/authentication/authentication2/ResetPassword2')));
const AuthCodeVerification2 = Loadable(lazy(() => import('../views/pages/authentication/authentication2/CodeVerification2')));

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')));
const AuthForgotPassword3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/ForgotPassword3')));
const AuthCheckMail3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/CheckMail3')));
const AuthResetPassword3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/ResetPassword3')));
const AuthCodeVerification3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/CodeVerification3')));

// maintenance routing
const MaintenanceError = Loadable(lazy(() => import('../views/pages/maintenance/Error')));
const MaintenanceComingSoon1 = Loadable(lazy(() => import('../views/pages/maintenance/ComingSoon/ComingSoon1')));
const MaintenanceComingSoon2 = Loadable(lazy(() => import('../views/pages/maintenance/ComingSoon/ComingSoon2')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('../views/pages/maintenance/UnderConstruction')));

// landing & contact-us routing
const PagesLanding = Loadable(lazy(() => import('../views/pages/landing')));
const PagesContactUS = Loadable(lazy(() => import('../views/pages/contact-us')));

//-----------------------|| AUTHENTICATION ROUTING ||-----------------------//

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/pages/login/login1',
                '/pages/register/register1',
                '/pages/forgot-password/forgot-password1',
                '/pages/check-mail/check-mail1',
                '/pages/reset-password/reset-password1',
                '/pages/code-verification/code-verification1',

                '/pages/login/login2',
                '/pages/register/register2',
                '/pages/forgot-password/forgot-password2',
                '/pages/check-mail/check-mail2',
                '/pages/reset-password/reset-password2',
                '/pages/code-verification/code-verification2',

                '/pages/login/login3',
                '/pages/register/register3',
                '/pages/forgot-password/forgot-password3',
                '/pages/check-mail/check-mail3',
                '/pages/reset-password/reset-password3',
                '/pages/code-verification/code-verification3',

                '/pages/error',
                '/pages/coming-soon1',
                '/pages/coming-soon2',
                '/pages/under-construction',

                '/pages/landing',
                '/pages/contact-us'
            ]}
        >
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <Route path="/pages/login/login1" component={AuthLogin1} />
                    <Route path="/pages/register/register1" component={AuthRegister1} />
                    <Route path="/pages/forgot-password/forgot-password1" component={AuthForgotPassword1} />
                    <Route path="/pages/check-mail/check-mail1" component={AuthCheckMail1} />
                    <Route path="/pages/reset-password/reset-password1" component={AuthResetPassword1} />
                    <Route path="/pages/code-verification/code-verification1" component={AuthCodeVerification1} />

                    <Route path="/pages/login/login2" component={AuthLogin2} />
                    <Route path="/pages/register/register2" component={AuthRegister2} />
                    <Route path="/pages/forgot-password/forgot-password2" component={AuthForgotPassword2} />
                    <Route path="/pages/check-mail/check-mail2" component={AuthCheckMail2} />
                    <Route path="/pages/reset-password/reset-password2" component={AuthResetPassword2} />
                    <Route path="/pages/code-verification/code-verification2" component={AuthCodeVerification2} />

                    <Route path="/pages/login/login3" component={AuthLogin3} />
                    <Route path="/pages/register/register3" component={AuthRegister3} />
                    <Route path="/pages/forgot-password/forgot-password3" component={AuthForgotPassword3} />
                    <Route path="/pages/check-mail/check-mail3" component={AuthCheckMail3} />
                    <Route path="/pages/reset-password/reset-password3" component={AuthResetPassword3} />
                    <Route path="/pages/code-verification/code-verification3" component={AuthCodeVerification3} />

                    <Route path="/pages/error" component={MaintenanceError} />
                    <Route path="/pages/coming-soon1" component={MaintenanceComingSoon1} />
                    <Route path="/pages/coming-soon2" component={MaintenanceComingSoon2} />
                    <Route path="/pages/under-construction" component={MaintenanceUnderConstruction} />

                    <Route path="/pages/landing" component={PagesLanding} />
                    <Route path="/pages/contact-us" component={PagesContactUS} />
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;
