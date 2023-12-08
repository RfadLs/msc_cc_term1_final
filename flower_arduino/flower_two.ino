#include <Adafruit_NeoPixel.h>

#define NUMPIXELS 1 
#define NEOPIXEL_PIN 5 
#define TRIGGER_PIN 3  
#define ECHO_PIN 4  
#define BUTTON_PIN 7  

Adafruit_NeoPixel myNeopixel = Adafruit_NeoPixel
(NUMPIXELS, NEOPIXEL_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  myNeopixel.begin();
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT);
  Serial.begin(9600);
}

void loop() {
  int distance = getDistance();

  if (distance < 10) {
    bloomFlower();
  } else {
    closeFlower();
  }


  if (digitalRead(BUTTON_PIN) == HIGH) {
    changeColor();
    delay(500);
  }
}

int getDistance() {
  digitalWrite(TRIGGER_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN, LOW);

  int duration = pulseIn(ECHO_PIN, HIGH);
  int distance = duration * 0.034 / 2;

  return distance;
}

void bloomFlower() {
  myNeopixel.setPixelColor(0, myNeopixel.Color(0, 255, 200));
  myNeopixel.show();
}

void closeFlower() {
  myNeopixel.setPixelColor(0, myNeopixel.Color(255, 200, 100));
  myNeopixel.show();
}

void changeColor() {
  myNeopixel.setPixelColor(0, myNeopixel.Color(0, 255, 0));
  myNeopixel.show();
}
