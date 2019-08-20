// Calling Dependencies
var Word = require('./word.js')
var randomWords = require("random-words");
var chalk = require('chalk');
var inquirer = require('inquirer');

// Setting Global Variables
var guessesRemaining = 10;
var guessedLetters = [];
var activeWord = new Word(randomWords());
// console.log(activeWord)
// console.log(activeWord.correctWord)
activeWord.generateAllCorrectLetters();

var title = chalk.whiteBright.bold.bgCyan("\n Welcome to the Word Guess Game! ");
console.log(title);
var space = "\n\n" + "\xa0\xa0\xa0\xa0\xa0";
var line = chalk.blue.bold("\n - - - - - - - - - - - - - - - - -\n");

// Main Function
var main = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "guess",
            prefix: '',
            message: line + "\nYour Word: " + chalk.magenta(activeWord.updateDisplay()) +
                "\n\nGuesses remaining: " + chalk.blue.bold(guessesRemaining) +
                "\nIncorrect guesses so far: " + chalk.blue.bold(guessedLetters.join(', ')) + space +
                "Guess a letter:",
            validate: function (input) {
                if (input.length !== 1 && input.toLowerCase() !== "quit") {
                    return "Please try again.";
                }

                return true;
            }
        }
    ]).then((data) => {

        // Validate user input
        if (data.guess === "quit") {
            console.log(chalk.blueBright("\n Sorry to see you go. See you next time!\n"));
            return;
        } else if (data.guess === "") {
            console.log(chalk.bgRed.white("\nWHOOPS!") + chalk.magenta(" You didn't enter a letter."));
            return main();
        } else if (data.guess.length > 1) {
            console.log(chalk.bgRed.white("\nWHOOPS!") + chalk.yellow(" Please guess one letter at a time."));
            return main();
        } else if (guessedLetters.includes(data.guess)) {
            console.log(chalk.bgRed.white("\nWHOOPS!") + chalk.blue(" You already guessed that! Choose another letter."));
            return main();
        }

        // Push Guess into Guessed Letter Array
        guessedLetters.push(data.guess)

        //Check Guess
        for (var i = 0; i < activeWord.correctWordLetters.length; i++) {
            activeWord.correctWordLetters[i].checkGuess(data.guess);
        };

        // Decrementing guesses
        if (!activeWord.correctWordLetters.includes(data.guess)) {
            guessesRemaining--;
        }

        // Lost
        if (guessesRemaining === 0) {
            endGame('loss');
            return;
        };
        // WINNING
        if (activeWord.guessedCorrectly()) {
            endGame('win');
        }

        main();
    });
}
main();

// Ending Game
var endGame = (outcome) => {

    if (outcome === "win") {
        console.log(chalk.blueBright.bold("\nWHOOOP, WON!! GREAT JOB!"));
        console.log(chalk.cyan("You guessed ") + chalk.yellowBright.bold(activeWord.correctWord.toUpperCase()) + " " + chalk.bgYellowBright.black(" with " + (guessesRemaining) + " guesses remaining.") + "\n")
    } else if (outcome === "loss") {
        console.log(chalk.cyan("\n\nSorry, look like have 0 guess left. ") + chalk.bgBlue.white("The word was " + activeWord.correctWord.toUpperCase() + "."));
    }

    guessesRemaining = 10;
    guessedLetters = [];
    activeWord = new Word(randomWords());
    activeWord.generateAllCorrectLetters();

    inquirer.prompt([
        {
            message: "Would you like to play again?",
            name: "confirm",
            type: "confirm",
        }
    ]).then(function (response) {
        if (response.confirm) {
            console.log(chalk.blueBright("\nGreat! Generating a new word..."));
            main();
        } else {
            console.log(chalk.blueBright("\nHope you see you next time!\n"));
            return;
        };
    });
};

