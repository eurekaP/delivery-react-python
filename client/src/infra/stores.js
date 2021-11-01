import { observable, action, makeObservable} from 'mobx'

import config from '../config'
import api from '../api'


export class AppStore {
    loading = 0

    pushSubscription = null
    pushManager = null

    constructor( api) {
        this.api = api

        makeObservable( this, {
            loading: observable,
            pushSubscription: observable,
            pushManager: observable,
            incLoading: action.bound,
            decLoading: action.bound,
            setPushSubscription: action.bound,
            setPushManager: action.bound,
        })
        api.addMiddleware('request',
            'inc_loading',
            config => {
                this.incLoading()
                return config
            }
        )
        api.addMiddleware('response',
            'finish_loading',
            resp => {
                this.decLoading()
                return resp
            },
            error => {
                this.decLoading()
                return Promise.reject(error)
            }
        )
    }
    incLoading() {
        this.loading += 1
    }
    decLoading() {
        if (this.loading > 0) {
            this.loading -= 1
        }
    }

    pushSubscribe() {
        return this.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: config.VAPID_PUBLIC_KEY,
        }).then( sub => {
            this.setPushSubscription( sub)
            return sub
        })
    }
    pushUnsubscribe() {
        return this.pushSubscription.unsubscribe()
            .then( (success) => {
                this.setPushSubscription( null)
                return success
            })
    }
    setPushManager( pushManager) {
        this.pushManager = pushManager
        if (pushManager) {
            pushManager.getSubscription().then( sub => {
                this.setPushSubscription( sub)
            })
        }
    }
    setPushSubscription( sub) {
        if (this.pushSubscription && this.pushSubscription !== sub) {
            this.api.webpushUnsubscribe( this.pushSubscription)
        }
        this.pushSubscription = sub
        if (sub) {
            this.api.webpushSubscribe( sub)
        }
    }
}


export class UIStore {
    toast = {}

    constructor() {
        makeObservable( this, {
            toast: observable,

            setToast: action.bound,
        })
    }
    setToast(text, severity) {
        if (text) {
            this.toast = {text: text, severity: severity}
        } else {
            this.toast = {}
        }
    }
}

export const ui = new UIStore()
export const app = new AppStore( api)


// vim:ts=4:sw=4:expandtab
