let letters = "ASD";
let currentLetter; // Will be initialized in setup()
let letterTime = 60; // Frames to press
let timer = letterTime;
let score = 0;
let gameOver = false;

function setup() {
  currentLetter = randomLetter(); // Initialize after p5.js is ready
  createCanvas(400, 200);
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(getBackgroundColor(currentLetter));

  if (!gameOver) {
    // Display current letter to press
    fill(0);
    text("Press: " + currentLetter, width / 2, height / 2);
    text("Timer: " + timer, width / 2, height / 2 + 40);
    text("Score: " + score, width / 2, height / 2 + 80);
    
    // Countdown timer
    timer--;
    if (timer <= 0) {
      gameOver = true;
    }
  } else {
    fill(255, 255, 255);
    text("Game Over!", width / 2, height / 2);
  }
}

function keyPressed() {
  if (!gameOver && key.toUpperCase() === currentLetter) {
    score++;
    currentLetter = randomLetter();
    timer = letterTime; // Reset timer
  } else {
    gameOver = true;
  }
}

function randomLetter() {
  return letters.charAt(floor(random(letters.length)));
}

function getBackgroundColor(letter) {
  if (letter === 'A') return color(0, 0, 255); // Blau
  if (letter === 'S') return color(255, 0, 0); // Vermell
  if (letter === 'D') return color(255, 255, 0); // Groc
  return color(220); // Default
}