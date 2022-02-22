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
    async uploadFile(file: File) {
        const formData = new FormData()
        formData.append('file', file)

        try {
            return await request({
                method: 'post',
                url: '/file',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        } catch (error) {
            console.log(error)
        }
    },
}
