const chai = require('chai');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));
const mstAPI = require('../spec/API/mstAPI');
const configManager = require('../main/configManager');

describe('Mst API test suite:', async function () {
    beforeEach(async function () {
        console.log(this.currentTest.title);
        await mstAPI.auth();
    });

    it('Test set-policy:', async function () {
        const response = await mstAPI.setPolicy();
        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.data).to.include(configManager.getResponseTemplateData().setPolicy);
        // chai.expect(response.data.data.polis_number).to.be.equal(.data.data.polis_number);
    });
    
    it('Test get-premium:', async function () {
        const response = await mstAPI.getPremium();
        // console.log('k,', response);
        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.data).to.be.jsonSchema(configManager.getPremiumResponseSchema());
        chai.expect(response.data).to.include(configManager.getResponseTemplateData().getPremium);

    });
 

    // it('Test set-cancellation-contract:', async function () {
    //     const saveResponse = await mstAPI.save();
    //     chai.expect(saveResponse.status).to.be.equal(200);
    //     chai.expect((await mstAPI.setPolicy(saveResponse)).status).to.be.equal(200);
    //     const response = await mstAPI.setContractCancellation(saveResponse);
    //     chai.expect(response.status).to.be.equal(200);
    //     chai.expect(response.data).to.containSubset(configManager.getResponseTemplateData().setContractCancellation);
    //     chai.expect(response.data.data.policy_number).to.be.equal(saveResponse.data.data.polis_number);
    // });

    afterEach(function () {
        console.log(this.currentTest.state);
        logger.logToFile();
        generateAllureReport();
    });
});
