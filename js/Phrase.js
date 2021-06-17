class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
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
                li.textContent = currentPhrase[i].toUpperCase();
                li.className = `hide letter ${currentPhrase[i]}`;
            }
            
            ul.appendChild(li);
        }
    }

    /**
     * Checks to see if the letter passed in matches any letters in the active phrase
     * @param {String}          Letter to check for match
     * @returns {Boolean}       Value to return whether the letter matches or not
     */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    /**
     * Reveals matched letter(s) in the phrase display
     * @param {String}      Matching letter to reveal
     */
    showMatchedLetter(letter) {
        const phraseLetters = document.querySelectorAll(`#phrase ul li.${letter}`);
        phraseLetters.forEach(li => {
            li.className = 'show';
        });
    }
}