const path = require('path');
const BaseAPI = require('../../main/baseAPI');
const timeUtils = require('../../main/timeUtils');
const configManager = require('../../main/configManager');
const randomizer = require('../../main/randomizer');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class MstAPI extends BaseAPI {
    constructor(options = {}) {
        super(
            options.baseURI || process.env.GATEWAY_URL,
            options.log,
            options.timeout || configManager.getAPIConfigData().APIWaitTime, 
            options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
            })
    }

    async auth() {
        let params = { 
            login: process.env.AUTH_LOGIN,
            password: process.env.AUTH_PASSWORD,
        }
        
        let response = await this.post(configManager.getAPIEndpoint().login, params);
        new MstAPI({ log: `[inf]   login as ${params.login}`, headers: { Authorization: `Bearer ${response.data.data.access_token}` } });
                }    
                
                
    async getClient() {
        const params = { 
            iin: configManager.getGetClientTemplateData().iin,
            natural_person_bool: configManager.getGetClientTemplateData().natural_person_bool,
            resident_bool: configManager.getGetClientTemplateData().resident_bool,
        }
        console.log(params);
        return await this.get(configManager.getAPIEndpoint().getClient, params);
    }

    async getPremium() {
        const templateData = configManager.getSetPolicyTemplateData();

        const params = {
            agent_id_1c: templateData.agent_id_1c,
            date_begin: templateData.date_begin,
            date_end: templateData.date_end,
            insured_days: templateData.insured_days,
            trip_country_codes: templateData.trip_country_codes,
            trip_goal: templateData.trip_goal,
            amount_cur: templateData.amount_cur,
            covid: templateData.covid,
            with_franshize: templateData.with_franshize,
            leisure: templateData.leisure,
            holders: [
                {
                    external_id: templateData.holders[0].external_id,
                    amount_sum: templateData.holders[0].amount_sum,
                    born: templateData.holders[0].born,
                    age: templateData.holders[0].age
                }
            ]
        };  
           
        return await this.get(configManager.getAPIEndpoint().getPremium, params);
      
    }
    
   
    async sendVerificationCode() {
        const params = { 
            mobile_phone: configManager.getSetPolicyTemplateData().customer.phone,
        }
        
        return await this.post(configManager.getAPIEndpoint().sendVerificationPhone, params);
    }

    async save() {
        const params =  configManager.getSetPolicyTemplateData();
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

module.exports = new MstAPI();
