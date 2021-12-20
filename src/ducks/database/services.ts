import request from 'request'

export const services = {
    getTables() {
        return request.get('/tables')
    },
}
