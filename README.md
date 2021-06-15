# game_show_app
 *A browser-based word guessing game called 'Phrase Hunter' inspired by the classic 'Hangman', where players must guess which letters are contained in the phrase while having a limited number of guess attempts.*

 **Features**
 - Each time the player guesses a letter, the game compares the letter the player has chosen with the random phrase. If the letter is in the phrase, the gameboard displays the chosen letters on the screen
 - A player continues to select letters until they guess the phrase (and win), or make five incorrect guesses (and lose)
 - If the player completes the phrase before they run out of guesses, a winning screen appears. If the player guesses incorrectly five times, a losing screen appears
 - Dynamic onscreen keyboard that reacts to focus/hover events by transitioning to capitalized and boldened characters
 - Increased accessibility by coding physical key presses to activate onscreen keys, as well as focus indicators for navigating with the keyboard
 - Features 5 unique phrases that are randomly selected


 ---

 **Code Example**

Showcases how key selections are handled.
 ```/**
     * Handles user key interactions by checking for letter matches based on event handling and win/loss scenarios
     * @param {Object || String}      Letter to check for match
     */
    handleInteraction(letter) {
        
        // If string value is passed in, convert to corresponding object with matching value
        if(typeof(letter) === 'string') {
            const letterObjects = document.querySelectorAll('#qwerty button');
            letterObjects.forEach(obj => {
                if(obj.textContent === letter) {
                    letter = obj;
                }
            });
        }

        // Make sure we're not working with strings like 'Alt', 'Shift', etc. passed in from key presses
        if(/^[A-Z]$/i.test(letter.textContent)) {
            letter.disabled = true;
            
            if(this.activePhrase.checkLetter(letter)) {
                letter.className = 'chosen';
                this.activePhrase.showMatchedLetter(letter);
    
                if(this.checkForWin()) {
                    this.gameOver();
                }
                
            } else {
                letter.className = 'wrong';
                this.removeLife();
            }
        }
    }
```

---

**CSS Styles**

Added additional CSS styling to the project, including:
- Added a blink animation to hearts
    - Reminds the player to keep an eye on the scoreboard
- Changed the font to a *monospaced* font
    - Accomodates for a shifting/resizing effect when hovering/focusing on keys when using a *proportionate* font
- Increased width for the *'space'* class
    - Keeps the rest of the phrase evenly spaced
- Removed outline and added a focus/hover effect to all onscreen key buttons
    - Focused/hovered buttons will transition to bold/uppercase

---