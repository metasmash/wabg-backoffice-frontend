import request from 'request'

export const services = {
    getTables() {
        return request.get('/tables')
    },
    getTableByName(tableName: string) {
        return request.get(`/table/${tableName}`)
    },
    editTableByName({
        id,
        newValues,
        tableName,
    }: {
        id: any
        newValues: any
        tableName: any
    }) {
        return request.put(`/table/${tableName}`, { id, newValues })
    },
}
