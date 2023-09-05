const moment = require('moment');

class TimeUtils {
    static getIntervalFromTomorrow() {
        const startDate = moment().add(1, 'days').format('DD.MM.YYYY');
        const finishDate = moment().add(1, 'year').format('DD.MM.YYYY');
        return { startDate: startDate, finishDate: finishDate }
    }
}

module.exports = TimeUtils;