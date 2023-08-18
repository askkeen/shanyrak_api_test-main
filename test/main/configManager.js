const APIEndpoints = require('../resources/APIEndpoints.json');
const APIConfigData = require('../resources/APIConfigData.json');
const setPolicyTemplateData = require('../resources/templateSetPolicy.json');
const getClientTemplateData = require('../resources/templateGetClient.json');
const responseTemplateData = require('../resources/templateResponse.json');
const clientResponseSchema = require('../resources/clientResponseSchema.json');
const premiumResponseSchema = require('../resources/premiumResponseSchema.json');

class ConfigManager {
    getAPIEndpoint() {
        return JSON.parse(JSON.stringify(APIEndpoints));
    }

    getAPIConfigData() {
        return JSON.parse(JSON.stringify(APIConfigData));
    }

    getSetPolicyTemplateData() {
        return JSON.parse(JSON.stringify(setPolicyTemplateData));
    }

    getGetClientTemplateData() {
        return JSON.parse(JSON.stringify(getClientTemplateData));
    }

    getResponseTemplateData() {
        return JSON.parse(JSON.stringify(responseTemplateData));
    }

    getPremiumResponseSchema() {
        return JSON.parse(JSON.stringify(premiumResponseSchema));
    }

    getClientResponseSchema() {
        return JSON.parse(JSON.stringify(clientResponseSchema));
    }
}

module.exports = new ConfigManager();