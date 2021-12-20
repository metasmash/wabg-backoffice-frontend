import axios from 'axios'
import { getApiEndpoint } from './runtime'

export const persist = (key: string, value: string) =>
    localStorage.setItem(key, value)

export const get = (key: string) => localStorage.getItem(key)

export const purge = (key: string) => localStorage.removeItem(key)

export const persistLogin = (token: string) => persist('wabg-token', token)

export const getUserToken = () => get('wabg-token')

export const purgeToken = () => purge('wabg-token')

const baseURL = getApiEndpoint()

const request = axios.create({
    baseURL,
    headers: {
        'Content-type': 'application/json',
    },
})

const setTokenInLocalStorage = (response: any) => {
    if (!!response?.token) {
        persistLogin(response.token)
    }

    return response
}

const responseMapper = (response: any) => response.data

const setTokenInHeader = (config: any) => {
    const newConfig = config

    newConfig.headers['wabg-token'] = getUserToken()

    return newConfig
}

request.interceptors.response.use(responseMapper)
request.interceptors.request.use(setTokenInHeader)
request.interceptors.response.use(setTokenInLocalStorage)

export default request
