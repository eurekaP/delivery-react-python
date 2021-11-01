import { AuthProvider as AuthProviderInterface } from 'ra-core'


export function authProvider( authStore): AuthProviderInterface {
    return {
        login: ({ username, password}) => {
            return authStore.login( username, password)
        },
        logout: () => {
            authStore.logout()
            return Promise.resolve( '/login')
        },
        checkAuth: () => {
            if (authStore.user) {
                return Promise.resolve( authStore.user)
            }
            return Promise.reject()
        },
        checkError: error => {
            const status = error.status
            if (status === 401 || status === 403) {
                return Promise.reject()
            }
            return Promise.resolve()
        },
        getPermissions: () => { return Promise.resolve() } //TODO
    }
}


// vim:ts=4:sw=4:expandtab
