import request from 'request'

export const services = {
    fetchAllUsers() {
        return request.get('/user/all')
    },
    fetchUser() {
        return request.get('/user/me')
    },
    createSuperAdmin(username: string, password: string) {
        return request.post('/user/createSuperAdmin', { username, password })
    },
    createAdmin(username: string, password: string) {
        return request.post('/user/createAdmin', { username, password })
    },
    createUserFailed: () => {},
}
