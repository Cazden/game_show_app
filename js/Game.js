/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
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

    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        return this.phrases[~~(Math.random() * this.phrases.length)];
    }

