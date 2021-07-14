var words = ["transformers", "avengers", "batman", "titanic", "avatar"];

function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let random = RandomNumber(0, words.length - 1);
let answer = words[random];
let hiddenAnswer = [];
let previousGuesses = [];
let guessLeft = 5;
let game = document.querySelector(".game");

for (let i = 0; i < answer.length; i++) {
  hiddenAnswer.push("_");
}

game.innerHTML = hiddenAnswer.join(" ");

function GuessLetter() {
  let guess = document.getElementById("guess").value;
  let textBox = document.getElementById("guess");
  let error = document.getElementById("error");
  let letters = /^[a-z]/;
  // make sure input is valid
  if (guess.toLowerCase().match(letters) === null) {
    error.innerHTML = `You have entered an invalid character. Try again!`;
    textBox.value = "";
    textBox.focus();
    return;
  }
  // store the previous attempts
  if (previousGuesses.includes(guess)) {
    error.innerHTML = `You have already guessed "${guess}." Try again!`;
    textBox.value = "";
    textBox.focus();
    return;
  }

  // check whether guess was correct
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] == guess) {
      hiddenAnswer[i] = guess;
      game.innerHTML = hiddenAnswer.join(" ");
      textBox.value = "";
      error.innerHTML = "";
      textBox.focus();
      checkWin(hiddenAnswer);
      return;
    }
  }
  // if guess was incorrect
  guessLeft -= 1;
  error.innerHTML = `"${guess}" is incorrect. ${guessLeft} guesses left`;
  previousGuesses.push(guess);
  textBox.value = "";
  textBox.focus();
  checkWin(hiddenAnswer);
}

function checkWin(arr) {
  if (!arr.includes("_")) {
    alert("You Win!");
  }
  if (guessLeft == 0) {
    alert("You Lose! No guesses left.");
    location.reload();
  }
}
