const gridSize = 12;
let rectSize;
const borderSize = 50;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ"
let tamanyText = borderSize/3;
let nPeixosIni = 3
let nPeixos;
let peixos = [];
let taulell = [];
let posY;
let posX;
let directX = 0;
let directY = 0;
let speed = 0.2;
let llum = 1;
let waves = [];
let peixosImg = [];
let timerSonar = 0;
let cooldownSonar = 10000;
let sonarUsos = 3;
let sonarUsable = true;
let countdownDuration = 4000;
let stat = 0;
let indexPeix = 0;
let letters = "JKL";
let currentLetter;
let fishScore = 1000;
let timerGame;
let gameTime;
let timeGameLeft;

function setup() {
  peixosImg[0] = loadImage("img/fish/whiteSmallFish.png");
  peixosImg[1] = loadImage("img/fish/whiteMediumFish.png");
  peixosImg[2] = loadImage("img/fish/whiteBigFish.png");
  createCanvas(800, 800);
  nPeixos = nPeixosIni;
  rectSize = (height-borderSize)/gridSize;
  posY = (height- (rectSize/2));
  posX = (height+borderSize)/2;
  for(let i = 0; i < nPeixos; i++){
    generarPeix();
  } 
  textFont('Courier New');
  textAlign(CENTER, CENTER);
  timerGame = millis();
  gameTime = 20000;
}

function draw() {
  if(stat == 0){
    timeGameLeft = gameTime - (millis() - timerGame);
    if (timeGameLeft >=0){
      stat = 4;
    }
    dibuixarTaulell();
    fill(255,0,0);
    let posXQ = round((posX - rectSize/4) /rectSize) - 1;
    let posYQ = round((posY - rectSize/4) /rectSize) - 1;
    if(posYQ >= gridSize -2 && posXQ <= ceil(gridSize/2) && posXQ >= floor(gridSize/2)-1){
      for(let i = 0; i < nPeixos; i++){
        peixos[i].revelar()
      }
    }
    for(let i = 0; i < nPeixos; i++){
      if(peixos[i].comparar(posXQ,posYQ)){
        indexPeix = i;
        stat = 1;
        millisInicial = millis();
      }
    }
    circle(posX,posY,rectSize/2);
    
    for(let i = 0; i < nPeixos; i++){
      peixos[i].dibuixar()
    }
  
  
    if(timerSonar < millis()){
      sonarUsable = true;
    }
  
    posX = posX + (directX * speed * deltaTime);
    posY = posY + (directY * speed * deltaTime);
    
    if(posX < borderSize + (rectSize/4)){
      posX = borderSize + (rectSize/4);
    }
    if(posY < borderSize + (rectSize/4)){
      posY = borderSize + (rectSize/4);
    }
    
    if(posX > width - (rectSize/4)){
      posX = width - (rectSize/4);
    }
    if(posY > height - (rectSize/4)){
      posY = height - (rectSize/4);
    }  
  }
  else if(stat == 1){
    background(220);
    timeLeft = countdownDuration - (millis() - millisInicial); 
    if(timeLeft > 0) {
      textSize(height/10 + 10);
      text('PEIX TROBAT!', width / 2, height *0.4);
      textSize(height/25);
      text("PREPARA'T PER PESCAR", width / 2, height *0.5);
      textSize(height/10 + 30);
      text(floor(timeLeft / 1000), width / 2, height * 0.65);
    } else {
      stat = 2;
      fishScore = 1000;
      peixos.splice(indexPeix,1);
      currentLetter = randomLetter();
      nPeixos--;
      if(nPeixos == 0){
        nPeixos = nPeixosIni
        for(let i = 0; i<nPeixos; i++){
          generarPeix();
        }
        posY = (height- (rectSize/2));
        posX = (height+borderSize)/2;
      }
    } 
  }
  else if(stat == 2){
    background(getBackgroundColor(currentLetter));
    fill(255);
    text("Press: " + currentLetter, width / 2, height / 2);
    text("Timer: " + fishScore, width / 2, height / 2 + 40);
    fishScore++;
    if(fishScore >= 1000){
      fishScore = 1000;
    }
  }

}


function generarPeix(){
  let ocupat = true;
  let x,y;
  while(ocupat){
    x = floor(random(gridSize));
    y = floor(random(gridSize));
    ocupat = false;
    if(y >= gridSize -2 && x <= ceil(gridSize/2) && x >= floor(gridSize/2)-1){
      ocupat = true
    }
    for(let i = 0; i < peixos.length; i++){
      if(peixos[i].comparar(x,y)){
        ocupat = true;
      }

    }
    }
    let peix = new Peix(x,y,rectSize*0.9,peixosImg);
    peixos.push(peix);
}


function dibuixarTaulell(){
  background(222);
  fill(255);
  stroke(0);
  strokeWeight(4);
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      if(j >= gridSize -2 && i <= ceil(gridSize/2) && i >= floor(gridSize/2)-1){
        fill(128, 82, 8);
      }
      else{
        fill(57, 89, 196);
      }
      rect((i*rectSize) + borderSize, (j*rectSize) + borderSize, rectSize, rectSize);
    }
  }
  dibuixarSonar();
  textSize(tamanyText);
  fill(222);
  strokeWeight(0)
  rect(0,0,width,borderSize);
  rect(0,0,borderSize,height);
  fill(0);
  stroke(0);
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  for(let i = 1; i < gridSize+1; i++){
    text(alphabet.substring(i-1,i), (((i - 1) * rectSize) + rectSize/2) + borderSize, borderSize/2);
  }
  
  for(let i = 1; i < gridSize+1; i++){
    text(i, borderSize/2,(((i - 1) * rectSize) + rectSize/2) + borderSize);
  }
  
}

function dibuixarSonar(){
  for (let i = waves.length - 1; i >= 0; i--) {
    let wave = waves[i];
    
    // Stroke color with fading effect
    stroke(34, 194, 23, wave.alpha);
    noFill();
    strokeWeight(5);

    // Ensure waves expand beyond screen limits
    let maxSize = dist(0, 0, width, height) * 1.5; // Covers entire screen & beyond

    // Draw three expanding waves
    ellipse(wave.x, wave.y, wave.radius * 0.4);  // Smallest wave
    ellipse(wave.x, wave.y, wave.radius * 0.8);  // Medium wave
    ellipse(wave.x, wave.y, wave.radius * 1.2);  // Largest wave

    // Expand wave
    wave.radius += 4;  // Faster expansion

    // Fade out
    wave.alpha -= 1;

    // Remove wave when it fully fades
    if (wave.alpha <= 0 || wave.radius > maxSize) {
      waves.splice(i, 1);
    }
  }
}

function keyPressed(){
  if(stat == 0){
    if(sonarUsable == true){
      if(key === ' ') {
        sonarUsable = false;
        timerSonar = millis() + cooldownSonar;
        print(timerSonar);
        for(let i = 0; i < nPeixos; i++){
          peixos[i].revelar()
        }
        waves.push({ x: posX, y: posY, radius: 1, alpha: 255 });
      }
    }
    
    if(key == 'ArrowUp' || key == 'W' || key == 'w') {
      directY = -1;
    }
  
    if (key == 'ArrowDown' || key == 'S' || key == 's') {
      directY = 1;
    }
    
    if (key == 'ArrowLeft' || key == 'A' || key == 'a') {
      directX = -1;
    }
  
    if (key == 'ArrowRight' || key == 'D' || key == 'd') {
      directX = 1;
    }
  }
  else if(stat == 2){
    if(key.toUpperCase() === currentLetter) {
      currentLetter = randomLetter();
      fishScore -= 100;
      if(fishScore <= 0){
        stat = 0;
        directX = 0;
        directY = 0;
      }
    } else {
      fishScore += 100;
        if(fishScore >= 1000){
          fishScore = 1000;
        }
    }
  }
}

function keyReleased(){
  if(stat == 0){
    if(key == 'ArrowUp' || key == 'W' || key == 'w') {
      if(directY < 0){
        directY = 0;
      }
    }
  
    if (key == 'ArrowDown' || key == 'S' || key == 's') {
      if(directY > 0){
        directY = 0;
      }
    }
    
    if (key == 'ArrowLeft' || key == 'A' || key == 'a') {
      if(directX < 0){
        directX = 0;
      }
    }
  
    if (key == 'ArrowRight' || key == 'D' || key == 'd') {
      if(directX > 0){
        directX = 0;
      }
    }
  }
}



function randomLetter() {
  return letters.charAt(floor(random(letters.length)));
}

function getBackgroundColor(letter) {
  if (letter === 'J') return color(0, 0, 255); // Blau
  if (letter === 'K') return color(255, 0, 0); // Vermell
  if (letter === 'L') return color(0, 255, 0); // Verd
}