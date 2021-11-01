import axios from 'axios'
import config from './config'


//const cancel_token_source = axios.CancelToken.source()
const httpClient = axios.create({
    baseURL: config.API_ENDPOINT,
    addTrailingSlash: config.API_ADD_TRAILING_SLASH,
    //cancelToken: cancel_token_source.token,
})

httpClient.interceptors.request.use( (reqConfig) => {
    if (reqConfig.addTrailingSlash && reqConfig.url[reqConfig.url.length-1] !== '/'
        && !reqConfig.url.includes('?') //otherwise appends "/" to the value of the last query parameter
        ) {
        reqConfig.url += '/'
    }
    if (config.DEBUG) {
        console.debug('REQUEST', reqConfig.method, reqConfig.url, reqConfig.data)
    }
    return reqConfig
})

httpClient.interceptors.response.use(
    resp => {
        config.DEBUG && console.debug('RESPONSE', resp.data)
        return resp
    },
    error => {
        if (error.response) {
            config.DEBUG && console.debug('RESPONSE', error.response)
            return Promise.reject(error.response)
        }
        config.DEBUG && console.debug('RESPONSE ERROR', error)
        return Promise.reject(error)
    }
)


class Api {
    constructor( httpClient) {
        this.cancelled = false
        this.httpClient = httpClient
        this.middleware = {}
    }
    register = (email, password, name='') => (
        this.post('register', { email: email, password: password, name: name })
    )
    registerConfirm = (key) => this.post('register/confirm', { key: key})
    login = (email, password) => this.post('login', { email: email, password: password})

    // google
    loginWithGoogle = ({ googleId, tokenId, accessToken, password}) => (
        this.post('login/google', {
            code: googleId,
            id_token: tokenId,
            access_token: accessToken,
            password: password || null
        })
    )
    //connectGoogleAccount({ googleId, tokenId, accessToken} ) {
    //    return this.sendRequest('post', 'user/social', { code: googleId, id_token: tokenId, access_token: accessToken})
    //}
    //disconnectGoogleAccount( pk) {
    //    return this.sendRequest('post', `user/social/${pk}/disconnect`)
    //}

    logout = () => this.post('logout')
    getCurrentUser = () => this.get('user')
    updateUser = (fields) => this.put('user', fields)
    setAvatar = (image, extraConfig) => {
        let data = new FormData()
        const url = 'user/avatar/'
        if(image) {
            data.append(`avatar`, image, image?.name)
            return this.post( url, data, { headers: {'content-type': 'multipart/form-data'}, ...extraConfig })
        } else {
            return this.delete( url, data)
        }

    }
    changePassword = (new_password) => this.post(
        'password/change', {
            new_password: new_password
        }
    )
    resetPassword = (email) => this.post('password/reset', { email: email})
    initialSetup = (email, phone) => this.patch('user', { email: email, phone_number: phone})
    resetPasswordConfirm = (new_password, uid, token) => this.post(
        'password/reset/confirm', {
            new_password: new_password,
            uid: uid,
            token: token
        }
    )

    saveCompany = ({ id, logo, ...fields }, extraConfig) => {
        const method = id ? this.patch : this.post
        const url = id ? `my_fleets/${id}` : 'my_fleets'
        if (logo === "") {
            return this.delete( url+'/logo/')
        } else if (logo) {
            let data = new FormData()
            data.append(`logo`, logo, logo.name)
            return this.post( url+'/logo/', data,
                { headers: {'content-type': 'multipart/form-data'}, ...extraConfig}
            )
        }
        return method( url, fields, extraConfig)
    }

    acceptInvite = (token, password, name) => this.post('invitations/accept', { token: token, password: password, name: name})

    webpushSubscribe = (subscription) => {
        let subData = subscription.toJSON().keys
        let data = {
            endpoint: subscription.endpoint,
            p256dh: subData.p256dh,
            auth: subData.auth,
            browser: navigator.userAgent.match(/(firefox|msie|chrome|safari|trident)/ig)[0].toLowerCase(),
        }
        return this.post('webpush-subscription', data)
    }
    webpushUnsubscribe = () => {
        // TODO add support for multiple subscriptions
        return this.sendRequest('delete', 'webpush-subscription')
    }

    get     = (urlpath, data, extraConfig) => this.sendRequest('get', urlpath, data, extraConfig)
    post    = (urlpath, data, extraConfig) => this.sendRequest('post', urlpath, data, extraConfig)
    put     = (urlpath, data, extraConfig) => this.sendRequest('put', urlpath, data, extraConfig)
    delete  = (urlpath, data, extraConfig) => this.sendRequest('delete', urlpath, data, extraConfig)
    patch   = (urlpath, data, extraConfig) => this.sendRequest('patch', urlpath, data, extraConfig)
    sendRequest = (method, urlpath, data, extraConfig) => {
        this.cancelled = false
        const config = {
            // `withCredentials` indicates whether or not cross-site Access-Control requests
            // should be made using credentials
            withCredentials: true,
            method: method,
            //cancelToken: cancel_token_source.token,
            ...(extraConfig || {})
        }
        if (data) {
            config[ (method === 'get' ? 'params' : 'data')] = data
        }
        return this.httpClient.request( urlpath, config)
            .then( (resp) => resp.data )
            .catch( (response) => {
                if (response.status === 400) {
                    return Promise.reject( response.data) // let others deal with validation error data
                }
                return Promise.reject(response)
            })
    }
    cancelPendingRequest() {
        this.cancelled = true
        //cancel_token_source.cancel()
    }
    setAuthKey( key) {
        this.httpClient.defaults.headers.common['Authorization'] = `Token ${key}`
    }
    clearAuthKey() {
        delete this.httpClient.defaults.headers.common['Authorization']
    }

    setServerErrorHandler( callback) {
        this.setErrorCallback('server_error', error => (error.status === 500), callback)
    }
    setUnauthenticatedHandler( callback) {
        this.setErrorCallback('unauthenticated_error', error => (error.status === 401), callback)
    }
    setNetworkErrorHandler( callback) {
        this.setErrorCallback('network_error', error => (error.message === 'Network Error'), callback)
    }

    setSuccessCallback( name, callback) {
        if (!callback) {
            this.removeMiddleware( name)
            return
        }
        const handler = (resp) => {
            callback( resp)
            return resp
        }
        this.addMiddleware( 'response', name, handler)
    }

    setErrorCallback( name, condition_func, callback) {
        if (!callback) {
            this.removeMiddleware( name)
            return
        }
        const handler = (error) => {
            if (condition_func( error)) callback( error)
            return Promise.reject(error)
        }
        this.addMiddleware( 'response', name, resp => resp, handler)
    }

    addMiddleware( type, name, successHandler, errorHandler) {
        const interceptors = this.httpClient.interceptors[type]
        this.middleware[ name] = { type: type, func: interceptors.use( successHandler, errorHandler) }
    }
    removeMiddleware( name) {
        const handler = this.middleware[ name]
        if (handler) {
            const interceptors = this.httpClient.interceptors[handler.type]
            delete this.middleware[ name]
            interceptors.eject( handler.func)
        }
    }
}

export default new Api( httpClient)


// vim:ts=4:sw=4:expandtab
