import request from 'request'

export const services = {
    async getTables() {
        return request.get('/tables')
    },
    async getTableByName(tableName: string) {
        return request.get(`/table/${tableName}`)
    },
    async editTableByName({
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
    async deleteTableRowById({ id, tableName }: { id: any; tableName: any }) {
        return request.delete(`/table/${tableName}?id=${id}`)
    },
    async getBackups(): Promise<Array<string>> {
        return request.get('/backup')
    },
    async saveBackup() {
        return request.put('/backup')
    },
    async loadBackup(fileName: string) {
        return request.post('/backup', { fileName })
    },
}
