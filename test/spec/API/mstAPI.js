const path = require('path');
const BaseAPI = require('../../main/baseAPI');
const TimeUtils = require('../../main/timeUtils');
const ConfigManager = require('../../main/configManager');
const randomizer = require('../../main/randomizer');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class MstAPI extends BaseAPI {
    constructor(options = {}) {
        super(
            options.baseURI || process.env.GATEWAY_URL,
            options.log,
            options.timeout || ConfigManager.getAPIConfigData().APIWaitTime, 
            options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
            })
    }

    async auth() {
        let params = { 
            login: process.env.AUTH_LOGIN,
            password: process.env.AUTH_PASSWORD,
        }
        
        let response = await this.post(ConfigManager.getAPIEndpoint().login, params);
        new MstAPI({ log: `[inf]   login as ${params.login}`, headers: { Authorization: `Bearer ${response.data.data.access_token}` } });
    }    

    async getPremium() {
        const templateData = ConfigManager.getSetPolicyTemplateData();

        const params = {
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
           
        return await this.get(ConfigManager.getAPIEndpoint().getPremium, params);
      
    }
    
    async setPolicy() {
        const templateSetPolicy = ConfigManager.getSetPolicyTemplateData();
        const timeUtils = TimeUtils.getIntervalFromTomorrow();
        templateSetPolicy.date_begin = timeUtils.startDate;
        templateSetPolicy.date_end = timeUtils.finishDate;
        

        return await this.post(ConfigManager.getAPIEndpoint().setPolicy, templateSetPolicy);
    }

    // async setContractCancellation(saveResponse) {
    //     const params = { 
    //         policy_number: saveResponse.data.data.polis_number
    //     }

    //     return await this.post(ConfigManager.getAPIEndpoint().setContractCancellation, params);
    // }
}

module.exports = new MstAPI();
