/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const game = new Game();

const startButton = document.querySelector('#btn__reset');
startButton.addEventListener('click', () => game.startGame());