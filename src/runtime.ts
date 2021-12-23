import _ from 'lodash'

export const getApiEndpoint = () =>
    _.get(process.env, 'env.REACT_APP_API_ENDPOINT')
