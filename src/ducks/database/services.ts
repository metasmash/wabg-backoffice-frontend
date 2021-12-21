import request from 'request'

export const services = {
    getTables() {
        return request.get('/tables')
    },
    getTableByName(tableName: string) {
        return request.get(`/table/${tableName}`)
    },
}
