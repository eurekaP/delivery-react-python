import { computed, observable, action, makeObservable, runInAction } from 'mobx'
import api from '../api'

const API_TOKEN_KEY = 'api_token'


export class AuthStore {
    initialized = false
    user = null
    currentCompanyId = null
    redirectUrl = null

    constructor( api) {
        this.api = api

        makeObservable( this, {
            user: observable,
            currentCompanyId: observable,
            redirectUrl: observable,
            initialized: observable,
            login: action.bound,
            logout: action.bound,
            setInitialized: action.bound,
            setRedirectUrl: action.bound,
            setCurrentCompanyId: action.bound,
            setUser: action.bound,
            setApiToken: action.bound,
            acceptInvite: action.bound,
            currentCompany: computed,
        })
    }

    init() {
        const token = localStorage.getItem( API_TOKEN_KEY)
        if (token) {
            this.tryToken( token).finally( () => this.setInitialized(true))
        } else if (0 && 'try session auth') {
            this.fetchUser()
                .catch( (response) => {
                    if (response.status === 401) {
                        this.setApiToken(null)
                        return response
                    }
                    return Promise.reject(response)
                })
                .finally( () => this.setInitialized(true))
        } else {
            this.setInitialized(true)
        }
    }
    setInitialized( value) {
        this.initialized = value
    }

    setUser( user) {
        this.user = user
        const m = this.getMembership()
        this.setCurrentCompanyId( m ? m.company.id : null)
    }
    async tryToken( token, rememberMe=false) {
        this._setApiToken( token)
        return this.fetchUser()
            .then( user => {
                this.setApiToken(token, rememberMe)
                return user
            })
            .catch( () => this.setApiToken(null) )
    }
    fetchUser() {
        return this.api.getCurrentUser()
            .then( user => {
                this.setUser(user)
                return user
            })
    }

    register( email, password, name) {
        return this.api.register( email, password, name)
            .then( data => {
                this.tryToken( data.token, true)
                return data.token
            })
    }
    registerConfirm( key) {
        return this.api.registerConfirm( key)
            .then( (data) => {
                this.tryToken( data.token, true)
                return data.token
            })
    }

    login( email, password, rememberMe=true) {
        return this.api.login( email, password)
            .then( data => this.tryToken( data.key, rememberMe) )
    }
    async loginWithGoogle( values) {
        const data = await this.api.loginWithGoogle( values)
        const user = await this.tryToken( data.key, true)
        return { created: data.created, ...user }
    }
    connectGoogleAccount({ tokenId, googleId, accessToken }) {
        return this.api.connectGoogleAccount({ tokenId, googleId, accessToken })
            .then( data => this.setUser( data) )
    }
    disconnectGoogleAccount() {
        return this.api.disconnectGoogleAccount( this.googleAccount.id)
            .then( data => this.setUser( data) )
    }
    logout() {
        this.setRedirectUrl('')
        return this.api.logout()
            .finally( () => {
                this.setApiToken(null)
            }
        )
    }
    initialSetup( email, phone) {
        return this.api.initialSetup( email, phone)
            .then( data => {
                this.setUser(data)
                return data
            })
    }
    changePassword(new_password) {
        return this.api.changePassword( new_password)
            .then( () => this.setUser( { ...this.user, has_usable_password: true }) )
    }
    resetPassword( email) {
        return this.api.resetPassword( email)
    }
    async resetPasswordConfirm( password, uid, token) {
        const data = await this.api.resetPasswordConfirm( password, uid, token)
        await this.tryToken( data.token, true)
        return data
    }

    updateUser( data ) {
        return this.api.updateUser( data)
            .then( data => {
                this.setUser(data)
                return data
            })
    }
    setAvatar( image, extraConfig) {
        return this.api.setAvatar( image, extraConfig)
            .then( data => {
                this.setUser(data)
                return data
            })
    }

    saveCompany( data, extraConfig) {
        return this.api.saveCompany( data, extraConfig)
            .then( resp => {
                // await this.fetchUser()
                this.updateMembership(resp)
                return resp
            })
    }
    setCurrentCompanyId( id) {
        this.currentCompanyId = id
    }
    setRedirectUrl( url) {
        this.redirectUrl = url
    }

    updateMembership(company) {
        const membership = this.user.memberships.find(membership => membership.company.id === company.id)

        runInAction(() => {
            membership.company = company
        })
    }

    get isOwner() {
        const m = this.getMembership()
        return m && m.role === 'OWNER'
    }

    get isMember() {
        const m = this.getMembership()
        return m && m.role === 'MEMBER'
    }

    get currentMembershipRole() {
        const m = this.getMembership()
        return m && m.role
    }

    getMembership( companyId=null, _default='first') {
        if (!this.user) {
            return null
        }
        companyId = companyId || this.currentCompanyId
        const memberships = this.user.memberships || []
        let m = null
        if (!companyId) {
            if (memberships.length && _default === 'first') {
                m = memberships[0]
                companyId = m.company.id
            }
        } else {
            m = memberships.find( (r) => (r.company.id.toString() === companyId.toString()) )
        }
        if (!m && _default !== 'first') {
            return _default
        }
        return m
    }
    get currentCompany() {
        const m = this.getMembership()
        return m && m.company
    }
    get googleAccount() {
        if (this.user && this.user.social_accounts.length) {
            return this.user.social_accounts[0]
        }
        return null
    }

    get userAddress() {
        return this.user ? this.user.address : ''
    }

    get userEmail() {
        return (this.user ? this.user.email : '').trim()
    }
    get userPhoneNumber() {
        return this.user ? this.user.phone_number : ''
    }

    get userFullName() {
        const u = this.user
        if (!u) {
            return ''
        }
        return (u.name || '') || this.userEmail
    }

    setApiToken( apiToken, rememberMe=true) {
        if (apiToken && this.apiToken === apiToken) {
            return
        }
        this.apiToken = apiToken
        if (!apiToken || rememberMe) {
            localStorage.setItem( API_TOKEN_KEY, apiToken)
        }
        this._setApiToken( apiToken)
    }
    _setApiToken( apiToken) {
        if (!apiToken) {
            localStorage.removeItem( API_TOKEN_KEY)
            this.api.clearAuthKey()
            this.api.setUnauthenticatedHandler(null)
            this.setUser(null)
            return
        }
        this.api.setAuthKey( apiToken)
        this.api.setUnauthenticatedHandler( () => {
            this.api.cancelPendingRequest()
            this.setApiToken(null)
        })
    }

    acceptInvite( token, password, name) {
        return this.api.acceptInvite( token, password, name)
            .then( (data) => {
                this.tryToken( data.token, true)
                return data.token
            })
            .catch( err => err)
    }
}


export default new AuthStore( api)


// vim:ts=4:sw=4:expandtab
