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

// Allows keyboard accessibility for pressing Key buttons
window.addEventListener('keydown', e => {
    if(game.hasStarted) {
        game.handleInteraction(e.key);
    }
});
