import request from 'request'

export const services = {
    fetchAllUsers() {
        return request.get('/user/all')
    },
    fetchUser() {
        return request.get('/user/me')
    },
}
