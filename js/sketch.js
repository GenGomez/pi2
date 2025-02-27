const gridSize = 8;
let rectSize;
const borderSize = 50;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ"
let tamanyText = borderSize/3;
let nPeixos = 3;
let peixos = [];
let taulell = [];
let posY;
let posX;
let speed = 3;
let llum = 1;
let waves = [];


function setup() {
  createCanvas(600, 600);
  rectSize = (height-borderSize)/gridSize;
  posY = (height- (rectSize/2));
  posX = (height+borderSize)/2;
  for(let i = 0; i < nPeixos; i++){
    generarPeix();
  } 
  console.log(peixos);
}

function draw() {
  dibuixarTaulell()
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
      console.log("PESCANT!!!!")
    }
  }
  circle(posX,posY,rectSize/2);



  for(let i = 0; i < nPeixos; i++){
    peixos[i].dibuixar()
  }
  if(keyIsDown(32)) {
    for(let i = 0; i < nPeixos; i++){
      peixos[i].revelar()
    }
    waves.push({ x: posX, y: posY, radius: 1, alpha: 255 });
  }
  
  if(keyIsDown(87)) {
    posY = posY - speed;
  }

  if (keyIsDown(83)) {
    posY = posY + speed;
  }
  
  if (keyIsDown(65)) {
    posX = posX - speed;
  }

  if (keyIsDown(68)) {
    posX = posX + speed;
  }
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


function generarPeix(){
  let ocupat = true;
  let x,y;
  while(ocupat){
    x = floor(random(gridSize));
    y = floor(random(gridSize));
    console.log(x + " "+ y)
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
    let peix = new Peix(x,y,rectSize/2);
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