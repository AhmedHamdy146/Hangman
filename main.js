// letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//  get array for letters

let lettersArray = Array.from(letters);

// select letters container

let letterContainer = document.querySelector(".letters");

// Generate Letters

lettersArray.forEach((letter) => {
  // Create span
  let span = document.createElement("span");

  // Create letter text node
  let theLetter = document.createTextNode(letter);

  //  Append letter to span
  span.appendChild(theLetter);
  // add class to span

  span.className = "letter-box";
  // append span to letter container

  letterContainer.appendChild(span);
});

// object of words + categories

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Abdo Saber",
    "Anas Maged",
    "jimmy",
    "Hussein",
    "abo omar",
    "GG panda",
    "Ahmed Shehata",
  ],
  countries: [
    "Egypt",
    "jaziaret shandwil",
    "Syria",
    "Palestine",
    "Qatar",
    "Yemen",
  ],
};

// Get Random property

let allKeys = Object.keys(words);

let randomProNumber = Math.floor(Math.random() * allKeys.length);
let randomProName = allKeys[randomProNumber];
let randomProValue = words[randomProName];

let randomValueNumber = Math.floor(Math.random() * randomProValue.length);
let randomValueValue = randomProValue[randomValueNumber];

// Set category info
document.querySelector(".game-info .category span").innerHTML = randomProName;

// Select letter guess container

let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen word to array

let lettersAndSpace = Array.from(randomValueValue.toLowerCase());

// Create spans Depend on word

lettersAndSpace.forEach((letter) => {
  // create empty span
  let span = document.createElement("span");

  if (letter === " ") {
    span.className = "with-space";
  }
  lettersGuessContainer.appendChild(span);
});
// Select guess spans
let lettersGuess = document.querySelectorAll(".letters-guess span");

// Set Wrong attempts
let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

// Handle clicking on letters
// counter
let counter = 0;
lettersAndSpace.forEach((e) => {
  if (e === " ") counter++;
});
document.addEventListener("click", (e) => {
  // Set status

  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    lettersAndSpace.forEach((WordLetter, WordIndex) => {
      if (theClickedLetter === WordLetter) {
        // Loop i=on all guess spans
        theStatus = true;
        lettersGuess.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
            counter++;
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttempts++;
      // Add Class wrong on  the draw
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // play failed sound
      document.getElementById("bad").play();
      if (wrongAttempts === 3) {
        endGame();

        letterContainer.classList.add("finished");
      }
    } else {
      // play success sound
      console.log(counter);
      // console.log(randomValueValue.length)
      document.getElementById("good").play();
      if (counter === randomValueValue.length) winGame();
    }
  }
});
let btn = document.createElement("button");
let btnText = document.createTextNode("Try Again");
btn.className = "btn";
btn.appendChild(btnText);
function endGame() {
  // create popup
  let div = document.createElement("div");

  let divText = document.createTextNode(
    `Rest in peace, The Word is ${randomValueValue}`
  );

  div.appendChild(divText);
  div.appendChild(btn);
  div.className = "popup";
  document.body.appendChild(div);
  document.getElementById("fail").play();
}
let nextLevel = document.createElement("button");
nextLevel.appendChild(document.createTextNode("Next"));
nextLevel.className = "btn";
function winGame() {
  let div = document.createElement("div");

  let divText = document.createTextNode(`Congratulation`);

  div.appendChild(divText);
  div.appendChild(nextLevel);
  div.className = "popup";
  document.body.appendChild(div);
  document.getElementById("success").play();
}
btn.addEventListener("click", (e) => {
  location.reload();
});

nextLevel.addEventListener("click", (e) => {
  location.reload();
});
