/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    addPhraseToDisplay() {
        const ul = document.querySelector('#phrase ul');
        const currentPhrase = this.phrase.content;
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

    checkLetter() {

    }

    showMatchedLetter() {

    }
}