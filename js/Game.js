class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [{
            content: 'Hello World' 
        }, {
            content: 'Cherry Pie'
        }, {
            content: 'Alley Cat'
        }, {
            content: 'Yellow Submarine'
        }, {
            content: 'Kamehameha'
        }];
        this.activePhrase = null;
    }

    /**
     * Calls all methods and handles all interactions required to start the game
     */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Method that returns a random phrase object from this.phrases array
     * @returns {Object}    Phrase object
     */
    getRandomPhrase() {
        return this.phrases[~~(Math.random() * this.phrases.length)];
    }

    /**
     * Handles user key interactions by checking for letter matches based on event handling and win/loss scenarios
     * @param {Object}      Letter to check for match
     */
    handleInteraction(letter) {
        letter.disabled = true;
        
        // Check if the selected letter matches any letters in the active phrase
        if(this.activePhrase.checkLetter(letter)) {
            letter.className = 'chosen';
            this.activePhrase.showMatchedLetter(letter);

            // Check to see if all letters of the phrase have been guessed correctly
            if(this.checkForWin()) {
                this.gameOver();
            }
        } else {
            letter.className = 'wrong';
            this.removeLife();
        }
    }

    /**
     * Remove a life from the scoreboard and keep tally of incorrect guesses
     * Handle game over interactions if out of guess attempts
     */
    removeLife() {
        // Remove a life from the scoreboard
        const tries = document.querySelectorAll('.tries');
        tries[this.missed].firstElementChild.src = 'images/lostHeart.png';
        this.missed += 1;

        // If the player guesses incorrectly five times, end the game
        if(this.missed >= 5) {
            this.gameOver();
        }
    }

    /**
     * Checks to see if the player has revealed all of the letters in the active phrase
     */
    checkForWin() {
        let correctGuesses = 0;
        const phraseCharacters = document.querySelectorAll('#phrase ul li');

        for(let i = 0; i < phraseCharacters.length; i++) {
            // 'space' should be factored in so correctGuesses properly tallies to length of array
            if(phraseCharacters[i].className === 'show'
            || phraseCharacters[i].className === 'space') {
                correctGuesses++;
                
                // Compare the correct number of guesses with length of phrase
                if(correctGuesses === phraseCharacters.length)
                {
                    return true; // Win
                }
            }
        }
        return false; // Continue game
    }

    /**
     * Depending on outcome of game, updates overlay with a win or loss message
     */
    gameOver() {
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'block';
        const message = document.querySelector('#game-over-message');

        // Determine game over message
        if(this.missed >= 5) {
            overlay.className = 'lose';
            message.innerHTML = `<br>Bummer! You ran out of guesses.</br>
                                 <br>Want to try again?</br>`;
        } else {
            overlay.className = 'win';
            message.innerHTML = `<br>Congratulations, you guessed "${this.activePhrase.phrase.content}" correctly!</br>
                                 <br>Want to play again?</br>`;
        }

        // Reset game board
        this.resetGame();
    }

    /**
     * Resets the game board, including phrase display, key elements and scoreboard
     */
    resetGame() {
        // Clear all phrase letter elements
        document.querySelector('#phrase ul').innerHTML = '';

        // Reset all key elements
        const keys = document.querySelectorAll('#qwerty button');
        console.log(keys);
        for(let i = 0; i < keys.length; i++) {
            keys[i].disabled = false;
            keys[i].className = 'key';
        }
        
        // Reset hearts/scoreboard
        const tries = document.querySelectorAll('.tries');
        for(let i = 0; i < tries.length; i++) {
            tries[i].firstElementChild.src = 'images/liveHeart.png';
        }
        this.missed = 0;
    }
}