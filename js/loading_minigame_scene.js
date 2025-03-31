let millisInicial;
let countdownDuration = 6000; // 5 seconds
let activat = false;

function setup() {
  createCanvas(400, 400);
  textFont('Courier New');
  textAlign(CENTER, CENTER);
  activat = false;
  millisInicial = millis();
}


function draw() {
  background(220);
  if (activat) {
    let timeLeft = countdownDuration - (millis() - millisInicial);

    if (timeLeft > 0) {
      textSize(24);
      text('HAS PESCAT UN PEIX!!!', width / 2, height / 5);
      textSize(90);
      text(floor(timeLeft / 1000), width / 2, height * 3 / 5);
    } else {
      activat = false; // Stop the timer when it reaches zero
    }

  }  

function keyPressed(){
  if(key == ' '){
    activat = true;
    millisFinal = 5000+millis();
    timer = 5000+millis();
  }
}




function keyPressed() {
  if (keyCode === 32) { // Spacebar
    activat = true;
    millisInicial = millis(); // Start the timer
  }
}
