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

    removeLife() {
        // Removes a life from the scoreboard by replacing one of the liveHeart.png with lostHeart.png and increments the 'missed' property
        // If the player has 5 missed guesses, call gameOver()
    }

    checkForWin() {
        // Checks to see if the palyer has revealed all of the letters in the active phrase
    }

    gameOver() {
        document.querySelector('#overlay').style.display = 'block';
        // Depending on outcome of game, updates the H1 element with a win or loss message and replaces overlay's start CSS class with either 'win' or 'lose' CSS class
    }
}