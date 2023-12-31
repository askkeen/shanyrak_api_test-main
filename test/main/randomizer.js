class Randomizer {
    getRandomString(hasLowerCase=false, hasUpperCase=false, hasNumber=false, hasCyrillic=false, chosenLetter=false, minLength=1, maxLength=10) {
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const cyrillicLetters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
      
        let length = this.getRandomInteger(maxLength, minLength);
      
        let randomString = '';
        if (chosenLetter) randomString += chosenLetter;
      
        let requiredCharacters = '';
        if (hasLowerCase) requiredCharacters += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length));
        if (hasUpperCase) requiredCharacters += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
        if (hasNumber) requiredCharacters += numbers.charAt(Math.floor(Math.random() * numbers.length));
        if (hasCyrillic) requiredCharacters += cyrillicLetters.charAt(Math.floor(Math.random() * cyrillicLetters.length));

        randomString += requiredCharacters;
      
        const characters = (hasLowerCase ? lowerCaseLetters : '') + (hasUpperCase ? upperCaseLetters : '') + (hasNumber ? numbers : '') + (hasCyrillic ? cyrillicLetters : '');
        const charactersLength = characters.length;
        const randomLength = length - randomString.length;

        for (let i = 0; i < randomLength; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return this.stringShuffler(randomString);
    }

    stringShuffler(inputString) {
        let array = inputString.split('');
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array.join('');
    }

    getRandomInteger(max=9, min=0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = new Randomizer();