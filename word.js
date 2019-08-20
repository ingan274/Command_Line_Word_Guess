var Letter = require('./Letter.js');

// var LetterWord = new Letter("H");
// console.log(LetterWord)

function Word(correctWord) {
    this.correctWord = correctWord;
    this.correctWordLetters = [];

    // split Word of correct letter and push into array of correct Letters
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
            this.correctWordLetters[c].checkGuess(guess);
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

    // Checking if Word it Right
    this.guessedCorrectly = () => {
        for (var i = 0; i < this.correctWordLetters.length; i++) {
            if (!this.correctWordLetters[i].guessedCorrectly) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Word;