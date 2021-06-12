const game = new Game();

// Starts the game when user selects the Start button
const startButton = document.querySelector('#btn__reset');
startButton.focus();
startButton.addEventListener('click', () => game.startGame());

// Handles game interactions when user selects a Key button
const keyDiv = document.querySelector('#qwerty');
keyDiv.addEventListener('click', e => {
    if(e.target.className === 'key') {
        game.handleInteraction(e.target);
    }
});
// Allows keyboard accessibility for selecting Key buttons
window.addEventListener('keydown', e => {
    if(game.hasStarted) {
        game.handleInteraction(e.key);
    }
});

// Loop through all buttons in kevDiv and add keydown handlers to each one that will pass into game.handleInteractions
// Code handleInteraction to accept key codes and behave the same way as a click event (i.e. disable the key with the key code passed in)