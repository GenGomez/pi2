#include <Keyboard.h>

int j1 = 8;
int j2 = 9;
int j3 = 10;
int j4 = 11;

int b1 = 5;
int b2 = 6;
int b3 = 7;
char joystickChars[4] = {'W','S','D','A'};
int entradesJoystick[4] = {j1,j2,j3,j4};

char caracters[3] = {'J','K','L'};
int botons[3] = {b1,b2,b3};
int estatBotoActual[3] = {HIGH, HIGH, HIGH};
int estatBotoAnterior[3] = {HIGH, HIGH, HIGH};
unsigned long ultimaLectura[3] = {0, 0, 0};
int debounceDelay = 50;

void setup() {
  Keyboard.begin();

  for(int i = 0; i < 3; i++){
    pinMode(botons[i],INPUT_PULLUP);
  }
  for(int i = 0; i < 4; i++){
    pinMode(entradesJoystick[i],INPUT_PULLUP);
  }
}


bool joystickPressed[4] = {false, false, false, false}; 

void loop() {
  for (int i = 0; i < 4; i++) { 
    int lectura = digitalRead(entradesJoystick[i]);
    if (lectura == LOW && !joystickPressed[i]) {
      Keyboard.press(joystickChars[i]);
      joystickPressed[i] = true;
    } else if (lectura == HIGH && joystickPressed[i]) {
      Keyboard.release(joystickChars[i]);
      joystickPressed[i] = false;
    }
  }

  for (int i = 0; i < 3; i++) {
    int lectura = digitalRead(botons[i]);
    if (lectura != estatBotoAnterior[i]) {
      ultimaLectura[i] = millis();
    }

    if ((millis() - ultimaLectura[i]) > debounceDelay) {
      if (lectura != estatBotoActual[i]) {
        estatBotoActual[i] = lectura;
        if (lectura == LOW) {
          Keyboard.print(caracters[i]);
        }
      }
    }

    estatBotoAnterior[i] = lectura;
  }
}