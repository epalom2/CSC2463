const int buttonPin = 2;
const int ledPin = 13;
const int buttonPin2 = 12;
const int ledPin2 = 4;

// Timing constants
const int dotTime = 200;  // time duration of a dot
const int dashTime = 600; // time duration of a dash
const int elementSpace = 200;  // space between elements (dot or dash)
const int letterSpace = 600;   // space between letters

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(buttonPin, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  int buttonState2 = digitalRead(buttonPin2);

  if (buttonState == HIGH) {
    // Morse code for HELLO: .... . .-.. .-.. ---
    letterH(ledPin);
    letterE(ledPin);
    letterL(ledPin);
    letterL(ledPin);
    letterO(ledPin);
  }

  if (buttonState2 == HIGH) {
    // Morse code for O: ---
    for (int i = 0; i < 3; i++) {
      dash(ledPin2);
    }
  }
}

void dot(int pin) {
  digitalWrite(pin, HIGH);
  delay(dotTime);
  digitalWrite(pin, LOW);
  delay(elementSpace);
}

void dash(int pin) {
  digitalWrite(pin, HIGH);
  delay(dashTime);
  digitalWrite(pin, LOW);
  delay(elementSpace);
}

void letterH(int pin) {
  for (int i = 0; i < 4; i++) {
    dot(pin);
  }
  delay(letterSpace);
}

void letterE(int pin) {
  dot(pin);
  delay(letterSpace);
}

void letterL(int pin) {
  dot(pin);
  dash(pin);
  dot(pin);
  dot(pin);
  delay(letterSpace);
}

void letterO(int pin) {
  for (int i = 0; i < 3; i++) {
    dash(pin);
  }
  delay(letterSpace);
}

