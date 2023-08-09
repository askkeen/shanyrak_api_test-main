const logger = require('./logger');
const allure = require('allure-commandline');
const mstAPI = require('../spec/API/mstAPI');

const generateAllureReport = () => {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
        const generationTimeout = setTimeout(() => reject(reportError), 5000);
        generation.on('exit', function(exitCode) {
            clearTimeout(generationTimeout);
            if (exitCode !== 0) {
                return reject(reportError);
            }

            resolve();
        });
    });
}

exports.mochaHooks = {
    async beforeAll() {
        await mstAPI.auth();
    },
    afterAll() {
        logger.logToFile();
        generateAllureReport();
    },
}