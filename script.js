// ------------------- DOM Elements -------------------
const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// the available words for the users
const words = ['superbia', 'balotelli', 'MaineRoad', 'SheikhMansour', 'BlueMoon'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

let correctLetters = ['s', 'u', 'p', 'e', 'r', 'b', 'i', 'a'];
let wrongLetters = [];

// ------------------- functions -------------------
function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

  const innerWord = wordElement.innerText.replace(/[ \n]/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won 🏆 🏅'
    popup.style.display = 'flex';
  }
}

displayWord();