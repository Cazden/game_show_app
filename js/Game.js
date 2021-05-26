/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [{
            phrase: 'Hello World' 
        }, {
            phrase: 'Cherry Pie'
        }, {
            phrase: 'Alley Cat'
        }, {
            phrase: 'Yellow Submarine'
        }, {
            phrase: 'Kamehameha'
        }];
        this.activePhrase = null;
    }

    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        return this.phrases[~~(Math.random() * this.phrases.length)];
    }

