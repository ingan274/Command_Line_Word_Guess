var Letter = require('./Letter.js');

function Word(correctWord) {
    this.correctWord = correctWord;
    this.correctWordLetters = [];

    // split letter of correct letter and push into array of correct Letters
    this.generateAllCorrectLetters = () => {
        var correctLetterArray = this.correctWord.split('');
        for (var letters of correctLetterArray) {
            var newLetter = new Letter(letters);
            this.correctWordLetters.push(newLetter);
        };
    };

    // compare all correct letters with guessed letter
    this.makeGuess = (guess) => {
        for (var c = 0; c < this.correctWordLetters.length; c++) {
            this.letters[c].checkGuess(guess);
        };
    };

    // Update display after guess
    this.updateDisplay = function () {
        var displayWord = "";
        for (var u = 0; u < this.correctWordLetters.length; u++) {
            displayWord += this.correctWordLetters[u].displayLetter();
        };
        return displayWord;
    };
}

module.exports = Word;