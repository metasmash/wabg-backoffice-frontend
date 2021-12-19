import _ from 'lodash'

export const getApiEndpoint = () => _.get(window, 'env.API_ENDPOINT')
