import request from 'request'
import qs from 'qs'

export const services = {
    async getFiles(path: string) {
        return await request.get('/files', {
            params: { path },
            paramsSerializer: (params) => {
                return qs.stringify(
                    { path: params.path.replace(/%C3%A9/g, 'é') },
                    { indices: false }
                )
            },
        })
    },
    async uploadFile({ file, path }: { file: File; path: string }) {
        const formData = new FormData()
        formData.append('file', file)

        console.log({ file, formData })

        try {
            return await request.post('/files', formData, {
                params: { path },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        } catch (error) {
            console.log(error)
        }
    },

    async deleteFile(path: string) {
        return await request.delete('/files', { params: { path } })
    },
}
