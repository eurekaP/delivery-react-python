//import { Integrations } from "@sentry/tracing"
//import moment from 'moment'
//import 'moment/locale/us'

//moment.locale('us')

const DEBUG = 1
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000'

const VERSION = ''
const API_ADD_TRAILING_SLASH = true
const USE_AUTH=1

const VAPID_PUBLIC_KEY="todo"

const GOOGLE_CLIENT_ID = "538571589624-ugva7f8j3t0vemv2040mh20mlsskbcrb.apps.googleusercontent.com"

const SENTRY = {
    dsn: "todo",
    release: VERSION,
    //integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
}


const THEME_DEFAULTS = {
    // fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light',
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
}


const urls = {
    root: '/',
    register: '/registration',
    registerDone: '/registration-done',
    registerConfirm: '/registration-confirm/:key',
    login: '/login',
    logout: '/logout',
    initialSetup: '/initial-setup',
    setPassword: '/set-password',
    passwordReset: '/reset-password',
    passwordResetDone: '/reset-password/done',
    passwordResetConfirm: '/reset-password/:uid/:token',
    userProfile: '/profile',
    tos: 'https://www.iubenda.com/terms-and-conditions/56685224',

    createCompany: '/create-company',

    trucks: '/:company/trucks',
    trucks_assign_driver: '/:company/trucks/:truck/assign_driver',
    //trucksCreate: '/:company/trucks/create',
    //truck_edit: '/:company/trucks/:id',
    settings: '/:company/settings',
    members: '/:company/members',
    company: '/:company/company',

    invitationsAccept: '/invitations/accept/:token',
    error404: '/error404',
    blank: '/notfound',
}

function company_url( currentCompanyId, resource) {
    return `/${currentCompanyId}/${resource}`
    }


const all = { urls, company_url, DEBUG, API_ENDPOINT,
    API_ADD_TRAILING_SLASH, USE_AUTH, VERSION, SENTRY,
    VAPID_PUBLIC_KEY, THEME_DEFAULTS, GOOGLE_CLIENT_ID,
}
export default all

// vim:ts=4:sw=4:expandtab

