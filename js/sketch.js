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
  for(let i = 0; i < nPeixos; i++){
    peixos[i].dibuixar()
  }
  if(keyIsDown(32)) {
    for(let i = 0; i < nPeixos; i++){
      peixos[i].revelar()
    }
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
  textSize(tamanyText);
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
  
}
