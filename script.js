// ------------------- DOM Elements -------------------
const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// the available words for the users
const words = ['superbia', 'balotelli', 'MaineRoad', 'SheikhMansour', 'BlueMoon'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

let correctLetters = [];
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

// update the wrong letters
function updateWrongLetters() {
  console.log('update wrong');

  wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : '' }
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;


  // display parts
  figureParts.forEach((part, index) => {
    let errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })

  // stop showing all the parts
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately, you lost';
    popup.style.display = 'flex';
  }
};


// show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}


// ------------------- event listeners -------------------
window.addEventListener('keydown', (e) => {

  if (e.keyCode <= 90 && e.keyCode >= 65) {

    let letter = e.key;

    if (selectedWord.includes(letter)) {
      if ((!(correctLetters.includes(letter)))) {
        correctLetters.push(letter)

        displayWord();
      } else {
        showNotification();
      }
    } else {

      if (!(wrongLetters.includes(letter))) {
        wrongLetters.push(letter)
        updateWrongLetters();
      } else {
        showNotification();
      }
    }

  }

});


//restart the game after click
playAgainButton.addEventListener('click', () => {
  // clear arrays
  wrongLetters.splice(0);
  correctLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetters();

  popup.style.display = 'none';
})


// init
displayWord();