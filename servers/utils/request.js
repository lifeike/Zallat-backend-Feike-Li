const axios = require("axios");
const config = require('../../config')
const service = axios.create({
    baseURL: config.baseURL,
    timeout: 50000,
    headers: {
        'content-type': 'application/json;charset=UTF-8',
    },
})
service.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)
module.exports = service