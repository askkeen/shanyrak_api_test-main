const axios = require('axios');
const logger = require('./logger');

class BaseAPI {
    constructor(baseURI, logString, timeout, headers) {
        logString ? logger.log(logger.body(`${logString}`)) : logger.log(logger.body(`[inf]   set base API URI: ${baseURI}`));
        axios.defaults.baseURL = baseURI;
        axios.defaults.timeout = timeout;
        axios.defaults.headers = headers;
    }

    async get(endpoint, params) {
        try {
            logger.log(logger.body(`[req] ▶ get from ${endpoint}:`));
            const response = await axios.get(`/${endpoint}`, { params });
            logger.log(logger.body(`[res]   status code: ${response.status}`));
            return response;
        } catch (error) {
            logger.log(logger.body(`[res]   status code: ${error.response.status}`));
            logger.log(logger.body(`[res]   body: ${JSON.stringify(error.response.data)}`));
            return error.response;
        }
    }

    async post(endpoint, params) {
        try {
            logger.log(`[req] ▶ post to ${endpoint}:`);
            logger.body(`[req] ▶ post ${JSON.stringify(params)} to ${endpoint}:`);
            const response = await axios.post(`/${endpoint}`, params);
            logger.log(logger.body(`[res]   status code: ${response.status}`));
            return response;
        } catch (error) {
            logger.log(logger.body(`[res]   status code: ${error.response.status}`));
            logger.log(logger.body(`[res]   body: ${JSON.stringify(error.response.data)}`));
            return error.response;
        }
    }
}

module.exports = BaseAPI;