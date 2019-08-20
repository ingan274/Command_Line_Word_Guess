var Word = require('./word.js')
var randomWords = require("random-words");
var chalk = require('chalk');
var inquirer = require('inquirer');

var guessesRemaining;
var activeWord;

var correctWord = new Word(words[Math.floor(Math.random() * words.length)]);
correctWord.generateLetters();
var guessesRemaining = 10;
var guessesSoFar = [];

console.log(chalk.cyan("\nWelcome to the Word Guess Game!"));
console.log(chalk.yellow("Hint:") + " the words are popular NPM packages.");