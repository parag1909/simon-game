const buttonColors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Start the game on keypress
document.addEventListener("keypress", () => {
  if (!started) {
    document.getElementById("level-title").textContent = `Level ${level}`;
    nextSequence();
    started = true;
  }
});

// Handle button clicks
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!started) {
        document.getElementById("level-title").textContent = "Press Any Key to Start!";
        return;
    }
    const userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = `Level ${level}`;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  setTimeout(() => {
    document.getElementById(randomChosenColor).classList.add("flash");
    playSound(randomChosenColor);
    setTimeout(() => {
      document.getElementById(randomChosenColor).classList.remove("flash");
    }, 300);
  }, 500);
}

// Check the player's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("flash-red");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

    setTimeout(() => {
      document.body.classList.remove("flash-red");
    }, 200);

    startOver();
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Play sound
function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// Button press animation
function animatePress(currentColor) {
  const button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}
