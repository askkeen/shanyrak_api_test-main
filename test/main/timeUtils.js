class TimeUtils {
    getIntervalFromTomorrow(swither) {
        const unixOne = (new Date().getTime()) + 86400000;
        let unixTwo;
        switch (swither) {
        case 0:
            unixTwo = unixOne + 86400000 * 364;
            break;
        case 1:
            unixTwo = unixOne + 86400000 * 365;
            break;
        }

        const startDateArr = new Date(unixOne).toLocaleDateString().split('/');
        const finishDateArr = new Date(unixTwo).toLocaleDateString().split('/');

        const formattedStartDateArr = startDateArr.map((elem) => {
            return elem.length === 1 ? '0' + elem : elem;
        });
        const formattedFinishDateArr = finishDateArr.map((elem) => {
            return elem.length === 1 ? '0' + elem : elem;
        });

        let temp = formattedStartDateArr[0];
        formattedStartDateArr[0] = formattedStartDateArr[1];
        formattedStartDateArr[1] = temp;
        temp = formattedFinishDateArr[0];
        formattedFinishDateArr[0] = formattedFinishDateArr[1];
        formattedFinishDateArr[1] = temp;
        
        return { startDate: formattedStartDateArr.join('.'), finishDate: formattedFinishDateArr.join('.') }
    }
}

module.exports = new TimeUtils();