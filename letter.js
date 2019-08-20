function Letter(character) {
    // Letter in word
    this.character = character.toUpperCase();
    this.guessedCorrectly = false;
  
    // Display Letter
    this.displayLetter = () => {
      if (this.guessedCorrectly) {
        return this.character + " ";
      } else {
        return "_ ";
      };
    };
 
    // Checking Guesses against the letters of a word
    this.checkGuess = (guess) => {
      if (this.character.toLowerCase() == guess.toLowerCase()) {
        this.guessedCorrectly = true;
      };
    };
  };
  
  module.exports = Letter;