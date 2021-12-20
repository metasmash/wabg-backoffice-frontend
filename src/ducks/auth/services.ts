import request from 'request'

export const services = {
    login(username: string, password: string) {
        return request.post('/user/login', { username, password })
    },
    fetchUser() {
        return request.get('/user/me')
    },
}
