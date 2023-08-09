const path = require("path");
const moment = require('moment');
const { createWriteStream } = require('fs');
const allureMocha = require("allure-mocha/runtime");
const filePath = path.join(path.resolve(), "test", "spec", "log.txt");
const timeList = [];
const logList = [];

class Logger {
    body(step) {
        logList.push(` ${step}\n`);
        const timeStamp = moment().format().slice(0, 19).replace('T', ' ');
        timeList.push(`${timeStamp}`);
        allureMocha.allure.logStep(`${timeStamp} ${step}`);
        return step;
    }

    log(step) {
        console.log(step);
    }

    logToFile() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        const stream = createWriteStream(filePath);
        stream.once('open', () => {
            summaryList.forEach((element) => element.forEach((elem) => stream.write(elem)));
            stream.end();
        });
    }
}

module.exports = new Logger();