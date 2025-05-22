const gridSize = 4;
let rectSize;
const borderSize = 50;
let canvaSize;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ"
let tamanyText = borderSize/3;
//let fonsAnimat;
//comentari oopsi
let nPeixosIni = 1;
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
let sonarUsable = true;
let countdownDuration = 5000;
let stat = -2;
let indexPeix = 0;
let letters = "JKL";
let currentLetter;
let puls = 1;
let pulsDir = 1;
let fishScore = 1000;
let minFishScore = 1000;
let scoreChange = 130;
let timeGameInicial = 120000;
let timeGameMax = timeGameInicial;
let timeGameLeft = timeGameMax;
let felicitacions = ["Ets el rei de la pesca! Aquest peix\n ja sabia que no tenia escapatòria!",
  "Compte, que amb aquest ritme acabaràs\n buidant tot el mar!",
  "Avi, t’hauríem d’anomenar el mestre\n pescador virtual! Quin art!",
  "Amb aquestes mans, podries pescar\n fins i tot un tauró!",
  "No és sort, és talent! Ja pots donar\n classes de pesca!"];
let felicitacio;
let backgroundMinijocImg;
let canyaImg;
let baixellMiniImg;
let numDia;
let pescat;

// stat == -2 pantalla de presentacio
// stat == -1 pantalla de tutorial
// stat == 0 pescant amb el baixell
// bool cinematica
// stat == 1 preparat per pescar
// stat == 2 minijoc de pesca J K L
// stat == 3 felicitacio per pescar
// stat == 4 felicitacio per dia complert
// stat == 5 perdut

let musica;
let cinematica = true;

// array de imatges
let baixellImg =[];
/*felicitacionsDia = [
  "Una nit més, un peix més, una història més.",
  "El mar ens ha posat a prova... i avui hem guanyat!",
  "Quan la foscor cau, només els valents tornen a casa.",
  "Aquesta nit el vent ens ha xiuxiuejat, i nosaltres li hem respost amb coratge.",
  "No tots els herois porten capa; alguns portem xarxes i records salats.",
  "Hem pescat més que peixos: hem pescat vida!",
  "Una nit lluitant amb les onades, un dia més per brindar amb els amics.",
  "Sobreviure al mar és honorar la vida.",
  "La mar no regala res... però avui ens ha deixat tornar.",
  "No és només pescar, és vèncer la nit i tornar a explicar-ho."];*/
felicitacionsFinal = [
  "Has resistit {X} dies\nentre onades i vents.\nEl mar t’espera de nou, capità!",
  "Cada dia al mar et fa més fort.\n{X} dies superats!\nEstàs a punt per conquerir-ne molts més.",
  "El teu viatge marí\nja té {X} dies d’història.\nLa propera aventura ja t’està cridant.",
  "Has dominat el mar\ndurant {X} dies.\nImagina tot el que encara pots aconseguir!",
  "{X} dies navegant, pescant i lluitant.\nEts pur esperit de mar.\nEl millor encara ha d’arribar!",
  "Has sobreviscut {X} dies\n amb coratge i determinacio.\nLa pròxima expedició serà encara més gran!",
  "Després de {X} dies plens de reptes,\nmereixes una pausa...\nperò el mar no oblida els seus herois.",
  "Cada dia que passes al mar et transforma.\nAmb {X} dies superats,\nets més llegenda que pescador!",
  "El mar et coneix pel teu nom.\n{X} dies pescant són només el principi\nd'una gran història."];
  numDia = 0;
  let felicitacioFinal;

function preload(){
  fonsMar = loadImage("img/world/sea.png");

  peixosImg[0] = loadImage("img/fish/whiteSmallFish.png");
  peixosImg[1] = loadImage("img/fish/whiteMediumFish.png");
  peixosImg[2] = loadImage("img/fish/whiteBigFish.png");

  baixellImg[0] = [];
  baixellImg[1] = [];
  baixellImg[2] = [];
  baixellImg[1][1] = loadImage("img/ship/0,-1.png");
  baixellImg[1][0] = loadImage("img/ship/0,-1.png");
  baixellImg[1][2] = loadImage("img/ship/0,1.png");
  baixellImg[2][0] = loadImage("img/ship/1,-1.png");
  baixellImg[2][2] = loadImage("img/ship/1,1.png");
  baixellImg[2][1] = loadImage("img/ship/1,0.png");
  baixellImg[0][0] = loadImage("img/ship/-1,-1.png");
  baixellImg[0][2] = loadImage("img/ship/-1,1.png");
  baixellImg[0][1] = loadImage("img/ship/-1,0.png");
  
  boia = loadImage("img/world/buoy.png");
  baixellMiniImg = loadImage("img/minigame/baxeillMinijoc.png");
  canyaImg = loadImage("img/minigame/fishingRod.png");
  backgroundMinijocImg= loadImage("img/minigame/fonsMinijoc.png");
  soundFormats('mp3','wav');

  moon = loadImage("img/world/moon.png");
  sun = loadImage("img/world/sun.png");

  audio_sonar1 = loadSound('audio/sonar-ping.wav');
  audio_sonar2 = loadSound('audio/sonar-ping.wav');
  audio_sonar3 = loadSound('audio/sonar-ping.wav');
  audio_win_peix = loadSound('audio/win_peixets.wav');
  audio_canya_be = loadSound('audio/so_canya_pescar.wav');
  audio_canya_malament = loadSound('audio/splash.wav');
  audio_passar_dia = loadSound('audio/passardedia.mp3');

  missatge = loadImage("img/world/message.png");
  portadaElsPescas = loadImage("img/world/portadaElsPescas.png");

}

function setup() {
  if(window.innerHeight >= window.innerWidth){
    canvaSize = window.innerWidth;
  }
  else{
    canvaSize = window.innerHeight;
  }
  createCanvas(canvaSize, canvaSize);
  //fonsAnimat.play();
  nPeixos = nPeixosIni;
  rectSize = (canvaSize-borderSize)/gridSize;
  posY = (canvaSize+rectSize);
  posX = (canvaSize+borderSize)/2;
  for(let i = 0; i < nPeixos; i++){
    generarPeix();
  } 
  textFont('Courier New');
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  millisInicial = millis();

}

function draw() {
  textStyle(NORMAL);

  if(stat == 0) {
    timeGameLeft -= deltaTime; 
    if (timeGameLeft <= 0) {
      felicitacioFinal = felicitacionsFinal[floor(random(0, felicitacionsFinal.length))];
      stat = 5;
    }
    
    dibuixarTaulell();

    fill(255,0,0);
    let posXQ = Math.round(((posX + (rectSize/2) - borderSize)/rectSize)) - 1
    posXQ = constrain(posXQ,0,gridSize-1)
    let posYQ = Math.round(((posY + (rectSize/2) - borderSize)/rectSize)) - 1
    posYQ = constrain(posYQ,0,gridSize-1)
    if(posYQ >= gridSize -2 && posXQ <= ceil(gridSize/2) && posXQ >= floor(gridSize/2)-1){
      for(let i = 0; i < peixos.length; i++){
        peixos[i].revelar()
      }
    }
    for(let i = 0; i < peixos.length; i++){
      if(peixos[i].comparar(posXQ,posYQ)){
        indexPeix = i;
        stat = 1;
        millisInicial = millis();
      }
    }

    for(let i = 0; i < peixos.length; i++){
      peixos[i].dibuixar()
    }
  
    //circle(posX,posY,rectSize/2);
    dibuixarBaixell(posX,posY,rectSize);
    timerSonar -= deltaTime;
    if(timerSonar <= 0){
      timerSonar = 0;
      sonarUsable = true;
    }
  
    posX = posX + (directX * speed * deltaTime);
    posY = posY + (directY * speed * deltaTime);
    
    if (!cinematica) {
      if (posX < borderSize) {
        posX = borderSize;
      }
      if (posY < borderSize) {
        posY = borderSize;
      }

      if (posX > canvaSize) {
        posX = canvaSize;
      }
      if (posY > canvaSize) {
        posY = canvaSize;
      }
    }

    if(timeGameLeft <= 10000){
      push()
      rectMode(CORNER);
      let nitOpacity = map(timeGameLeft,10000,0,0,160);
      fill(0,11,89,nitOpacity);
      rect(borderSize,borderSize,canvaSize,canvaSize);
      pop();
    }

    if(cinematica && posY > (canvaSize-rectSize)) {
      directY = -1;
    } else if(cinematica && posY <= (canvaSize-rectSize)) {
      directY = 0;
      cinematica = false;
      sonarUsable = false;
        timerSonar = 10000;
        for(let i = 0; i < nPeixos; i++){
          peixos[i].revelar()
        }
        waves.push({ x: posX, y: posY, radius: 1, alpha: 255 });
        audio_sonar1.play();
        audio_sonar2.play();
        audio_sonar3.play();
    }
  } // Preparat per pescar
  else if(stat == 1){
    
    backgroundMinijocImg.resize(0,height);
    image(backgroundMinijocImg,width/2,height/2);
    timeLeft = countdownDuration - (millis() - millisInicial); 
    missatge.resize(0,width);
    image(missatge,width/2, height/2);
    fill(255);
    textStyle(BOLD);
    if(timeLeft > 0) {
      textSize(height/10 + 10);
      text('PEIX TROBAT!', width / 2, height *0.4);
      textSize(height/25);
      text("PREPARA'T PER PESCAR", width / 2, height *0.5);
      textSize(height/10 + 30);
      text(floor(timeLeft / 1000) + 1, width / 2, height * 0.65);
    } else {
      stat = 2;
      fishScore = map(peixos[indexPeix].fishLenght,10,100,100,1000);
      minFishScore = fishScore;
      currentLetter = randomLetter();
      nPeixos--;
    } 
  } // Minijoc de pesca J K L
  else if(stat == 2){
    backgroundMinijocImg.resize(0,height);
    baixellMiniImg.resize(width * 0.8,0);
    canyaImg.resize(width * 0.15,0);
    tint(255,255);
    image(backgroundMinijocImg,width/2,height/2);
    image(canyaImg,width * 0.45,height*0.13);
    image(baixellMiniImg,width * 0.25,height*0.25);
    fill(255);
    strokeWeight(0);
    //text("Press: " + currentLetter, width / 2, height / 2);
    //text("Timer: " + fishScore, width / 2, height / 2 + 40);
    strokeWeight(2);
    let finishLine = map(fishScore,1000,-300,height*0.6,height*0.1);
    line(width * 0.52,height*0.061,width*0.52,finishLine);
    push();
    let drawSize = map(peixos[indexPeix].fishLenght,10,100,100,300);
    translate((width * 0.52), finishLine + (drawSize * 0.4));
    fill(0,0);
    strokeWeight(40);
    stroke(getBackgroundColor(currentLetter));
    if(puls >= 1.2){
      pulsDir =  -1;
    }
    else if(puls <= 0.8){
      pulsDir = 1;
    }
    puls += 0.01 * pulsDir;
    circle(0,0,drawSize * puls);
    rotate(90);
    image(peixos[indexPeix].img,0,0,drawSize,drawSize);
    pop();
    //fishScore++;
    if(fishScore >= minFishScore){
      fishScore = minFishScore;
    }
  } // Felicitacio per pescar
  else if (stat == 3) {
    backgroundMinijocImg.resize(0,height);
    image(backgroundMinijocImg,width/2,height/2);
    timeLeft = countdownDuration - (millis() - millisInicial); 
    missatge.resize(0,width);
    image(missatge,width/2, height/2);
    textStyle(BOLD);
    textSize(height/35 + 5);
    fill(255);
    noStroke();
    text(felicitacio, width / 2, height *0.3);
    textSize(height/15 + 10);
    text(round(map(peixos[indexPeix].fishLenght, 10, 100, 10, 50), 2) + "cm", width / 2, height * 0.8);
    image(peixos[indexPeix].img, width / 2, height * 0.6, peixos[indexPeix].imgSize, peixos[indexPeix].imgSize);
    text(floor(timeLeft / 1000) + 1, width * 0.9, height * 0.8);
    if(timeLeft <= 0) {
      peixos.splice(indexPeix, 1);
      if(nPeixos == 0){
        numDia ++;
        millisInicial = millis();
        stat = 4;
        audio_passar_dia.play();
      }
      else{
        stat = 0;
      }
      directX = 0;
      directY = 0;
    }

  } // Felicitacio per dia complert
  else if(stat == 4){
    backgroundMinijocImg.resize(0,height);
    image(backgroundMinijocImg,width/2,height/2);
    timeLeft = countdownDuration - (millis() - millisInicial); 
    missatge.resize(0,width);
    image(missatge,width/2, height/2);
    fill(255);
    textStyle(BOLD)
    textSize(height/10 + 5);
    text("Dia "+numDia+"\nsobreviscut",width / 2, height / 2);
    text(floor(timeLeft / 1000) + 1, width * 0.9, height * 0.8);
    if(timeLeft <= 0) {
      nPeixos = nPeixosIni
      for(let i = 0; i<nPeixos; i++){
        generarPeix();
      }
      stat = 0;
    }
  }  //pantalla de derrota
  else if(stat == 5){
    backgroundMinijocImg.resize(0,height);
    image(backgroundMinijocImg,width/2,height/2);
    missatge.resize(0,width);
    image(missatge,width/2, height/2);
    textSize(height/35 + 5);
    textStyle(BOLD);
    fill(255); 
    text(felicitacioFinal.replaceAll("{X}", numDia.toString()),width / 2, height / 2);
  }
   // Pantalla de tutorial
  else if(stat == -1){
    backgroundMinijocImg.resize(0,height);
    image(backgroundMinijocImg,width/2,height/2);
    missatge.resize(0,width);
    image(missatge,width/2, height/2);
    textSize(height/10 + 10);
    fill(255);
    textStyle(BOLD)
    text("Instruccions", width / 2, height * 0.3);
    textSize(height/35 + 5);
    text("Mou el vaixell amb la palanca", width / 2, height * 0.45);
    text("Per pescar un peix, prem el boto\n del color correcte!", width / 2, height * 0.60);
    text("Prem els botons per activar el sonar!", width / 2, height * 0.75);
  } // Pantalla de presentacio
  else if(stat == -2){
    portadaElsPescas.resize(0,height);
    image(portadaElsPescas,width/2,height/2);
    push();
    rectMode(CENTER);
    strokeWeight(4);
    stroke(255,215,0,255);
    fill(189,30,30,255);
    rect(width / 2,height *0.8,width*0.8,75, 20);
    textSize(height/35 + 5);
    noStroke();
    fill(255);
    textStyle(BOLD)
    text("Prem qualsevol boto per començar", width / 2, height *0.8);
    pop();
  }
}

function dibuixarBaixell(x,y,size){
  if(sonarUsable){
    if(puls >= 1.2){
      pulsDir =  -1;
    }
    else if(puls <= 0.8){
      pulsDir = 1;
    }
    puls += 0.01 * pulsDir;
    push();
    fill(34, 194, 23,25);
    for(i=1;i<=10;i++){
      fill(34, 194, 23,25*i);
      circle(x,y,size* (1 - (i/10)) * puls);
    }
    pop();
  }
  let imgB = baixellImg[directX+1][directY+1]
  tint(255,255);
  image(imgB,x,y,size,size);
  baixellImg[1][1] = imgB;
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
  image(fonsMar,width/2,width/2,width,width);
  fill(255);
  stroke(0);
  strokeWeight(1);
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      fill(255,255,255,0);
      rect((i*rectSize) + borderSize, (j*rectSize) + borderSize, rectSize, rectSize);
    }
  }
  push();
  imageMode(CENTER);
  boia.resize(rectSize,0);
  image(boia,(canvaSize + borderSize)/2 +  rectSize,canvaSize-rectSize*1.25)
  image(boia,(canvaSize + borderSize)/2 -  rectSize,canvaSize-rectSize*1.25)
  pop();
  dibuixarSonar();
  //moon.resize(borderSize,borderSize);
  sun.resize(borderSize,borderSize);

  strokeWeight(0)
  fill(255);
  rect(0,0,borderSize,height);
  /*fill(255);
  rect(0,0,width,borderSize);*/
  fill(0,255,0);
  let sonarFillAmount = map(timerSonar,10000,0,0,height)
  rect(0,height - sonarFillAmount + borderSize,borderSize,sonarFillAmount);
  fill(255,0,0);
  /*let timeFillAmount = map(timeGameLeft,timeGameMax,0,0,width)
  rect(rect(0,0,timeFillAmount,borderSize));*/

  let sunPos = map(timeGameLeft,timeGameMax,0,0,width);
  let timeFillAmount = map(timeGameLeft,timeGameMax,0,100,20)
  push();
  colorMode(HSB);
  fill(195,100,timeFillAmount);
  rect(0,0,width,borderSize)
  pop();

  push();
  imageMode(CORNER);
  image(sun,sunPos,0);
  //image(moon,width-borderSize,0);
  pop();
  /*fill(0);
  stroke(0);
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  for(let i = 1; i < gridSize+1; i++){
    text(alphabet.substring(i-1,i), (((i - 1) * rectSize) + rectSize/2) + borderSize, borderSize/2);
  }
  
  for(let i = 1; i < gridSize+1; i++){
    text(i, borderSize/2,(((i - 1) * rectSize) + rectSize/2) + borderSize);
  }*/
  
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
  // This will log the key pressed
  if(stat == 0 && !cinematica){
    if(sonarUsable == true){
      if((key == 'j' || key == 'J' || key == 'k' || key == 'K' || key == 'l' || key == 'L')) {
        sonarUsable = false;
        timerSonar = 10000;
        for(let i = 0; i < nPeixos; i++){
          peixos[i].revelar()
        }
        waves.push({ x: posX, y: posY, radius: 1, alpha: 255 });
        audio_sonar1.play();
        audio_sonar2.play();
        audio_sonar3.play();
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
      audio_canya_be.play();
      currentLetter = randomLetter();
      fishScore -= (scoreChange + 20);
      if(fishScore <= 0){
        audio_win_peix.play();
        stat = 3;
        felicitacio = random(felicitacions);
        millisInicial = millis();
      }
    } else if(key == 'j' || key == 'J' || key == 'k' || key == 'K' || key == 'l' || key == 'L') {
      audio_canya_malament.setVolume(1);
      audio_canya_malament.play();
      fishScore += scoreChange;
        if(fishScore >= minFishScore){
          fishScore = minFishScore;
        }
    }
  }
  else if(stat == 4){
    if (key == 'j' || key == 'J' || key == 'k' || key == 'K' || key == 'l' || key == 'L') {
        nPeixos = nPeixosIni
        for(let i = 0; i<nPeixos; i++){
          generarPeix();
        }
        posY = (height- (rectSize/2));
        posX = (height+borderSize)/2;
        stat = 0;
      }
  }
  else if(stat == 5){
    if (key == 'j' || key == 'J' || key == 'k' || key == 'K' || key == 'l' || key == 'L') {
        nPeixos = nPeixosIni
        peixos=[];
        for(let i = 0; i<nPeixos; i++){
          generarPeix();
        }
        posY = (height- (rectSize/2));
        posX = (height+borderSize)/2;
        timeGameMax = timeGameInicial
        timeGameLeft = timeGameMax;
        directX = 0;
        directY = 0;
        millisInicial = millis();
        stat = -2;
      }
  }
  else if(stat == -1){
    if (key == 'j' || key == 'J' || key == 'k' || key == 'K' || key == 'l' || key == 'L') {
        stat = 0;
      }
  }
  else if(stat == -2){
    if (key == 'j' || key == 'J' || key == 'k' || key == 'K' || key == 'l' || key == 'L') {
        stat = -1;
      }
  }
}

function keyReleased(){
  if(stat == 0 && !cinematica){
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
  if (letter === 'J') return color(0, 0, 255,204); // Blau
  if (letter === 'K') return color(255, 0, 0,204); // Vermell
  if (letter === 'L') return color(255, 255, 0,204); // Groc
}