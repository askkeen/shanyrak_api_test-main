const path = require('path');
const BaseAPI = require('../../main/baseAPI');
const timeUtils = require('../../main/timeUtils');
const configManager = require('../../main/configManager');
const randomizer = require('../../main/randomizer');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class ShanyrakAPI extends BaseAPI {
    constructor(options = {}) {
        super(
            options.baseURI || process.env.GATEWAY_URL,
            options.log,
            options.timeout || configManager.getAPIConfigData().APIWaitTime, 
            options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
            });
    }

    async auth() {
        let params = { 
            login: process.env.AUTH_LOGIN,
            password: process.env.AUTH_PASSWORD,
        }
        
        let response = await this.post(configManager.getAPIEndpoint().login, params);
        new ShanyrakAPI({ log: `[inf]   login as ${params.login}`, headers: { Authorization: `Bearer ${response.data.data.access_token}` } });
        const user = (await this.get(configManager.getAPIEndpoint().testUsers)).data.filter((elem) => elem.product === 'shanyrak').pop();

        params = { 
            login: user.login,
            password: user.password,
        }
        
        response = await this.post(configManager.getAPIEndpoint().login, params);
        new ShanyrakAPI({ log: `[inf]   login as ${params.login}`, headers: { Authorization: `Bearer ${response.data.data.access_token}` } });
    }

    async getSettings() {
        const params = { 
            product_id_1c: configManager.getSaveTemplateData().main_data.insurance_program,
        }
        
        return await this.get(configManager.getAPIEndpoint().getSettings, params);
    }

    async getClient() {
        const params = { 
            iin: configManager.getSaveTemplateData().customer.iin,
            natural_person_bool: configManager.getSaveTemplateData().customer.natural_person_bool,
            resident_bool: configManager.getSaveTemplateData().customer.resident_bool,
        }
        
        return await this.get(configManager.getAPIEndpoint().getClient, params);
    }

    async sendVerificationCode() {
        const params = { 
            mobile_phone: configManager.getSaveTemplateData().customer.phone,
        }
        
        return await this.post(configManager.getAPIEndpoint().sendVerificationPhone, params);
    }

    async save() {
        const params =  configManager.getSaveTemplateData();
        params.main_data.external_id = randomizer.getRandomString(false, false, true, false, false, 20, 20);
        const datesInterval = timeUtils.getIntervalFromTomorrow(randomizer.getRandomInteger(1));
        params.main_data.started_at = datesInterval.startDate;
        params.main_data.ended_at = datesInterval.finishDate;

        return await this.post(configManager.getAPIEndpoint().save, params);
    }

    async setPolicy(saveResponse) {
        const params = { 
            polis_id: saveResponse.data.data.polis_id,
            get_cert_binary_data: randomizer.getRandomInteger(2),
        }

        return await this.post(configManager.getAPIEndpoint().setPolicy, params);
    }

    async setContractCancellation(saveResponse) {
        const params = { 
            policy_number: saveResponse.data.data.polis_number
        }

        return await this.post(configManager.getAPIEndpoint().setContractCancellation, params);
    }
}

module.exports = new ShanyrakAPI();