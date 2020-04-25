import axios from 'axios'
import store from '@/store/index'
import router from '@/router'

const envList = {
    development: 'development',
    staging: 'staging',
    production: 'production'
}

const env = envList[process.env.NODE_ENV]

const apiMap = {
    development: 'https://spring-clinic.herokuapp.com',
    staging: 'https://spring-clinic.herokuapp.com',
    production: 'https://spring-clinic.herokuapp.com'
}

export const HTTP = axios.create({
    baseURL: apiMap[env],
    timeout: 60000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': `application/json`,
        'Accept-Language': 'ru-RU',
    }
})

HTTP.interceptors.response.use(response => {
        return response
    },
    error => {
        const {config, data: {messages}} = error.response
        let message
        try {
            message = messages[0].message
        } catch (e) {
            message = ''
        }
        if (!(['Token is invalid or expired', 'Token \'exp\' claim has expired'].includes(message))) {
            return Promise.reject(error)
        }
        const retryOriginalRequest = new Promise((resolve, reject) => {
            store.dispatch('auth/refreshToken')
                .then(accessToken => {
                    config.headers.Authorization = `JWT ${accessToken}`
                    resolve(axios(config))
                })
                .catch(
                    error => {
                        if (store.getters['auth/isAuthenticated']) {
                            store.commit('auth/SET_ACCESS_TOKEN', '')
                            store.commit('auth/REMOVE_USER')
                            localStorage.setItem('refreshToken', '')
                            router.push('login')
                        }
                        reject(error)
                    })
        })

        return retryOriginalRequest
    })

const appMap = {
    development: 'http://localhost:8080',
    staging: 'https://powerful-wildwood-98189.herokuapp.com',
    production: 'https://win2.by'

}

export const appUrl = appMap[env]
export const apiUrl = apiMap[env]
