const chai = require('chai');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));
const mstAPI = require('../spec/API/mstAPI');
const configManager = require('../main/configManager');

describe('Mst API test suite:', async function () {
    beforeEach(async function () {
        console.log(this.currentTest.title);
        await mstAPI.auth();
        console.log("Success")
    });
    
    it('Test get-premium:', async function () {
        const response = await mstAPI.getPremium();
        // console.log('k,', response);
        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.data).to.be.jsonSchema(configManager.getPremiumResponseSchema());
        chai.expect(response.data).to.containSubset(configManager.getResponseTemplateData().getPremium);

    });

   
    it('Test send-sms-code:', async function () {
        const response = await mstAPI.sendVerificationCode();
        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.data).to.include(configManager.getResponseTemplateData().sendVerificationCode);
    });

    it('Test set-policy:', async function () {
        const saveResponse = await mstAPI.save();
        chai.expect(saveResponse.status).to.be.equal(200);
        const response = await mstAPI.setPolicy(saveResponse);
        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.data).to.containSubset(configManager.getResponseTemplateData().setPolicy);
        chai.expect(response.data.data.polis_number).to.be.equal(saveResponse.data.data.polis_number);
    });
    // it('Test save:', async function () {
    //     const response = await mstAPI.save();
    //     chai.expect(response.status).to.be.equal(200);
    //     chai.expect(response.data).to.include(configManager.getResponseTemplateData().save);
    // });

    it('Test set-policy:', async function () {
        const saveResponse = await mstAPI.save();
        chai.expect(saveResponse.status).to.be.equal(200);
        const response = await mstAPI.setPolicy(saveResponse);
        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.data).to.containSubset(configManager.getResponseTemplateData().setPolicy);
        chai.expect(response.data.data.polis_number).to.be.equal(saveResponse.data.data.polis_number);
    });

    it('Test set-cancellation-contract:', async function () {
        const saveResponse = await mstAPI.save();
        chai.expect(saveResponse.status).to.be.equal(200);
        chai.expect((await mstAPI.setPolicy(saveResponse)).status).to.be.equal(200);
        const response = await mstAPI.setContractCancellation(saveResponse);
        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.data).to.containSubset(configManager.getResponseTemplateData().setContractCancellation);
        chai.expect(response.data.data.policy_number).to.be.equal(saveResponse.data.data.polis_number);
    });

    afterEach(function () {
        console.log(this.currentTest.state);
        logger.logToFile();
        generateAllureReport();
    });
});



// const chai = require('chai');
// chai.use(require('chai-subset'));
// chai.use(require('chai-json-schema'));
// const shanyrakAPI = require('../spec/API/shanyrakAPI');
// const configManager = require('../main/configManager');

// describe('Shanyrak API test suite:', async function () {
//     beforeEach(function () {
//         console.log(this.currentTest.title);
//     });

//     it('Test get-settings:', async function () {
//         const response = await shanyrakAPI.getSettings();
//         chai.expect(response.status).to.be.equal(200);
//         chai.expect(response.data).to.be.jsonSchema(configManager.getSettingsResponseSchema());
//         chai.expect(response.data).to.containSubset(configManager.getResponseTemplateData().getSettings);
//     });

//     it('Test get-client:', async function () {
//         const response = await shanyrakAPI.getClient();
//         chai.expect(response.status).to.be.equal(200);
//         chai.expect(response.data).to.be.jsonSchema(configManager.getClientResponseSchema());
//         chai.expect(response.data).to.include(configManager.getResponseTemplateData().getClient);
//         chai.expect(response.data.data.iin).to.be.equal(configManager.getSaveTemplateData().customer.iin);
//     });

//     it('Test send-verification-code:', async function () {
//         const response = await shanyrakAPI.sendVerificationCode();
//         chai.expect(response.status).to.be.equal(200);
//         chai.expect(response.data).to.include(configManager.getResponseTemplateData().sendVerificationCode);
//     });

//     it('Test save:', async function () {
//         const response = await shanyrakAPI.save();
//         chai.expect(response.status).to.be.equal(200);
//         chai.expect(response.data).to.include(configManager.getResponseTemplateData().save);
//     });

//     it('Test set-policy:', async function () {
//         const saveResponse = await shanyrakAPI.save();
//         chai.expect(saveResponse.status).to.be.equal(200);
//         const response = await shanyrakAPI.setPolicy(saveResponse);
//         chai.expect(response.status).to.be.equal(200);
//         chai.expect(response.data).to.containSubset(configManager.getResponseTemplateData().setPolicy);
//         chai.expect(response.data.data.polis_number).to.be.equal(saveResponse.data.data.polis_number);
//     });

//     it('Test set-contract-cancellation:', async function () {
//         const saveResponse = await shanyrakAPI.save();
//         chai.expect(saveResponse.status).to.be.equal(200);
//         chai.expect((await shanyrakAPI.setPolicy(saveResponse)).status).to.be.equal(200);
//         const response = await shanyrakAPI.setContractCancellation(saveResponse);
//         chai.expect(response.status).to.be.equal(200);
//         chai.expect(response.data).to.containSubset(configManager.getResponseTemplateData().setContractCancellation);
//         chai.expect(response.data.data.policy_number).to.be.equal(saveResponse.data.data.polis_number);
//     });

//     afterEach(function () {
//         console.log(this.currentTest.state);
//     });
// });
