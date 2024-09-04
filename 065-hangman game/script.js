const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById("final-message-reveal-word");
const figureParts = document.querySelectorAll(".figure-part");
const hintElement = document.getElementById("hint");
const hintContainer = document.getElementById("hint-container");
const hintButton = document.getElementById("hint-button");

// Words array
const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "element",
  "prototype",
  "callback",
  "undefined",
  "arguments",
  "settings",
  "selector",
  "container",
  "instance",
  "response",
  "console",
  "constructor",
  "token",
  "function",
  "return",
  "length",
  "type",
  "node",
];

// Hints array corresponding to the words
const hints = [
  "A software program or a web app",
  "The process of writing computer programs",
  "A boundary across which two separate components interact",
  "A magic practitioner",
  "A part of something",
  "A preliminary version of something",
  "A function that is passed as an argument",
  "Not defined or known",
  "Values passed to a function",
  "Options or configurations",
  "A part of CSS to target HTML elements",
  "A type of container in programming",
  "An example or single occurrence of something",
  "The reply from a server",
  "A tool used in development",
  "A function used to create an instance of a class",
  "A secret or key used for authentication",
  "A block of code that performs a specific task",
  "A keyword to give back the value from a function",
  "The size or amount of something",
  "A category or classification of data",
  "A point in a data structure",
];

let selectedWordIndex = Math.floor(Math.random() * words.length);
let selectedWord = words[selectedWordIndex];
let selectedHint = hints[selectedWordIndex];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Function to display the hint
function displayHint() {
  hintContainer.style.display = "block";
  hintElement.innerText = selectedHint;
}

// Function to display the word
function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("") // to array
      .map(
        (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")} 
    `; // to string
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

// Function to update the wrong letters
function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

// Function to show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Event listener for keypress
window.addEventListener("keypress", (e) => {
  if (playable) {
    const letter = e.key.toLowerCase();
    if (letter >= "a" && letter <= "z") {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersElement();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Event listener for play again button
playAgainButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWordIndex = Math.floor(Math.random() * words.length);
  selectedWord = words[selectedWordIndex];
  selectedHint = hints[selectedWordIndex];
  displayWord();
  hintContainer.style.display = "none"; // Hide hint again
  updateWrongLettersElement();
  popup.style.display = "none";
});

// Event listener for hint button
hintButton.addEventListener("click", displayHint);

// Init
displayWord();
