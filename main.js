//letters
const letters = "abcdefghijklmnopqrstuvwxyz+";

//get array from letters
let lettersArray = Array.from(letters);

//Select letters container
let lettersContainer = document.querySelector(".letters");

//success Guess
let successGuess = 0;

document.querySelector(
  "footer"
).innerHTML = `Hangman created by <span id="atwa">ATWA</span>`;

document.getElementById("atwa").addEventListener("click", function () {
  window.open("https://atwa-portfolio.netlify.app/", "_blank");
});

lettersArray.forEach((letter) => {
  //create span
  let span = document.createElement("span");

  //creat letters textnode
  let theLetter = document.createTextNode(letter);

  //append theLetter to span
  span.appendChild(theLetter);

  //add clase for span
  span.classList = "letter-box";

  //append span to lettersContainer
  lettersContainer.appendChild(span);
});

//opject of words
const words = {
  programming: ["Python", "JavaScript", "Java", "C++", "Ruby"],
  countries: [
    "Egypt",
    "Canada",
    "Brazil",
    "USA",
    "Japan",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Australia",
    "India",
    "China",
    "Mexico",
    "Argentina",
    "South Korea",
  ],
  people: [
    "John",
    "Emma",
    "Michael",
    "Sophia",
    "David",
    "Maria",
    "Alexander",
    "Isabella",
    "William",
    "Olivia",
    "James",
    "Ava",
    "Daniel",
    "Mia",
    "Lucas",
  ],
  movies: [
    "Inception",
    "Matrix",
    "Interstellar",
    "Pulp Fiction",
    "Godfather",
    "Shawshank Redemption",
    "Forrest Gump",
    "The Dark Knight",
    "Titanic",
    "Avatar",
    "Fight Club",
    "Goodfellas",
    "Jurassic Park",
    "Star Wars",
    "Lord of the Rings",
  ],
};

//get random property
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];

//add the category info
document.getElementById("category").innerText = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

//get the letters in array
let letterAndSpace = Array.from(randomValueName);

//get the span element
letterAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");

  //add class to spaces
  if (letter === " ") {
    emptySpan.classList = "this-space";
  }
  lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

//set wrong attemps
let wrongAttemps = 0;

//select the draw
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  //set the stateus
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get clicked letter
    let letterClicked = e.target.innerText.toLowerCase();

    // Assuming `randomValueName` is a predefined variable
    let theChoseWord = Array.from(randomValueName.toLowerCase());

    theChoseWord.forEach((wordLetter, wordIndex) => {
      if (letterClicked == wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = letterClicked;
            successGuess++;
          }
          if (successGuess === randomValueName.length) {
            winGame();

            lettersContainer.classList.add("finsished");
          }
        });
      }
    });

    //out the loop
    //if letter is wrong
    if (theStatus !== true) {
      wrongAttemps++;

      //add class wrong to the draw
      theDraw.classList.add(`wrong-${wrongAttemps}`);

      //play fail sound
      document.getElementById("fail").play();

      if (wrongAttemps === 5) {
        endGame();

        lettersContainer.classList.add("finsished");
      }
    }
    if (theStatus === true) {
      //play success sound
      document.getElementById("success").play();
    }
  }
});

let massage = document.querySelector(".message");

function winGame() {
  // add win sound with message
  document.getElementById("success-game").play();

  massage.innerHTML = `
      <h3>Congratulations! 🎉</h3>
      <p>You find the word <span>${randomValueName}</span></p>
      <button onclick="location.reload()" class="refresh-btn">Play Again</button>
  `;

  massage.style.cssText = `
      background-color: #f0fdf4;
      color: #16a34a;
      border: solid #bbf7d0 1px;
  `;

  // Add button styles
  const style = document.createElement("style");
  style.textContent = `
      .refresh-btn {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #16a34a;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
      }
      .refresh-btn:hover {
          background-color: #15803d;
      }
  `;
  document.head.appendChild(style);
}

function endGame() {
  // add lose sound with message
  document.getElementById("fail-game").play();

  massage.innerHTML = `
      <h3>Game Over!</h3>
      <p>You didn't find the word <span>${randomValueName}</span></p>
      <button onclick="location.reload()" class="refresh-btn-lose">Try Again</button>
  `;

  massage.style.cssText = `
      background-color: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
  `;

  // Add button styles
  const style = document.createElement("style");
  style.textContent = `
      .refresh-btn-lose {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #dc2626;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
      }
      .refresh-btn-lose:hover {
          background-color: #b91c1c;
      }
  `;
  document.head.appendChild(style);
}
