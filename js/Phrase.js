class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    /**
     * Adds the active phrase to display as elements for DOM manipulation
     */
    addPhraseToDisplay() {
        const ul = document.querySelector('#phrase ul');
        const currentPhrase = this.phrase;

        for(let i = 0; i < currentPhrase.length; i++) {
            const li = document.createElement('li');

            if(currentPhrase[i] === ' ') {
                li.className = 'space';
            } else {
                li.textContent = currentPhrase[i];
                li.className = `hide letter ${currentPhrase[i]}`;
            }
            
            ul.appendChild(li);
        }
    }

    /**
     * Checks to see if the letter passed in matches any letters in the active phrase
     * @param {Object}          Letter to check for match
     * @returns {Boolean}       Value to return whether the letter matches or not
     */
    checkLetter(letter) {
        const currentPhrase = this.phrase.content;

        for(let i = 0; i < currentPhrase.length; i++) {
            if(currentPhrase[i].toLowerCase() === letter.textContent) {
                return true; // Match
            }
        }
    }

    /**
     * Reveals matched letter(s) in the phrase display
     * @param {Object}      Matching letter to reveal
     */
    showMatchedLetter(letter) {
        const currentPhrase = this.phrase.content;

        for(let i = 0; i < currentPhrase.length; i++) {
            if(currentPhrase[i].toLowerCase() === letter.textContent) {
                const phraseLetters = document.querySelectorAll('#phrase ul li');
                
                phraseLetters.forEach(li => {
                    if(li.textContent.toLowerCase() === letter.textContent) {
                        li.className = 'show';
                    }
                });
            }
        }
    }
}