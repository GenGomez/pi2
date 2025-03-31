let timer;
let millisInicial;
let millisFinal;
let activat;

function setup() {
  createCanvas(400, 400);
  textFont('Courier New');
  textAlign(CENTER, CENTER);
  activat = false;
  millisInicial = millis();
}

function draw() {
  if(activat){
    if(millisFinal > 0 ){
      print(millisFinal);
      background(220);
      textSize(24);
      text('HAS PESCAT UN PEIX!!!', height/2, width/5);
      textSize(90);
      text(floor(millisFinal/1000), height/2,width*3/5);
      millisInicial = millis();
      millisFinal = timer-millisInicial;
      }
    }
  }  

function keyPressed(){
  if(key == ' '){
    activat = true;
    millisFinal = 5000+millis();
    timer = 5000+millis();
  }
}