class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            'hello world', 
            'cherry pie', 
            'alley cat',
            'yellow submarine',
            'kame hame ha'
            ].map(text => new Phrase(text));
        this.activePhrase = null;
        this.hasStarted = false;
    }

    /**
     * Calls all methods and handles all interactions required to start the game
     */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        this.hasStarted = true;
        const hearts = document.querySelectorAll('.tries');
        hearts[this.missed].firstElementChild.className = 'blink';
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
     * @param {Object || String}      Key to check for match
     */
    handleInteraction(key) {
        
        // If string value is passed in, convert to corresponding object with matching value
        if(typeof(key) === 'string') {
            const keyObjects = document.querySelectorAll('#qwerty button');
            keyObjects.forEach(obj => {
                if(obj.textContent === key) {
                    key = obj;
                }
            });
        }

        const keyCode = key.textContent;

        // Make sure we're not working with strings like 'Alt', 'Shift', etc. passed in from key presses
        if(/^[A-Z]$/i.test(keyCode)) {
            key.disabled = true;
            
            if(this.activePhrase.checkLetter(keyCode)) {
                key.className = 'chosen';
                this.activePhrase.showMatchedLetter(keyCode);
    
                if(this.checkForWin()) {
                    this.gameOver();
                }
                
            } else {
                key.className = 'wrong';
                this.removeLife();
            }
        }
    }

    /**
     * Remove a life from the scoreboard and keep tally of incorrect guesses
     * Handle game over interactions if out of guess attempts
     */
    removeLife() {
        const tries = document.querySelectorAll('.tries');
        tries[this.missed].firstElementChild.src = 'images/lostHeart.png';
        
        // Remove blink effect from current heart, then add effect to next heart
        if(this.missed < tries.length - 1) {
            tries[this.missed].firstElementChild.className = '';
            tries[this.missed + 1].firstElementChild.className = 'blink';
        }
        
        this.missed += 1;

        if(this.missed >= tries.length) {
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
        if(this.missed >= document.querySelectorAll('.tries').length) {
            overlay.className = 'lose';
            message.innerHTML = `<br>Bummer! You ran out of guesses.</br>
                                 <br>Want to try again?</br>`;
        } else {
            overlay.className = 'win';
            message.innerHTML = `<br>Congratulations, you guessed "${this.activePhrase.phrase}" correctly!</br>
                                 <br>Want to play again?</br>`;
        }

        this.resetGame();
    }

    /**
     * Resets the game board, including phrase display, key elements and scoreboard
     */
    resetGame() {
        this.hasStarted = false;

        // Clear all phrase letter elements
        document.querySelector('#phrase ul').innerHTML = '';

        // Reset all key elements
        const keys = document.querySelectorAll('#qwerty button');
        for(let i = 0; i < keys.length; i++) {
            keys[i].disabled = false;
            keys[i].className = 'key';
        }
        
        // Reset hearts/scoreboard
        const tries = document.querySelectorAll('.tries');
        for(let i = 0; i < tries.length; i++) {
            tries[i].firstElementChild.src = 'images/liveHeart.png';
            tries[i].firstElementChild.className = '';
        }
        this.missed = 0;

        // Reinitialize focus to start button
        document.querySelector('#btn__reset').focus();
    }
}