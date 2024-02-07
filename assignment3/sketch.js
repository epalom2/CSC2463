let characters = [];

function preload() {
  sprite = loadImage('libraries/PC Computer - Spelunky - Spelunky Guy.png');
  sprite1 = loadImage('libraries/PC Computer - Spelunky - Green.png');
}

function setup() {
  createCanvas(800, 600);

  // Instantiate two characters with different positions and speeds
  characters.push(new Character(width / 3, height / 3, sprite, 2));
  characters.push(new Character((2 * width) / 3, height / 2, sprite1, 3));
}

function draw() {
  background(220);

  // Move the characters continuously when the arrow keys are held down
  if (keyIsDown(RIGHT_ARROW)) {
    for (let i = 0; i < characters.length; i++) {
      characters[i].setDirection(1);
    }
  } else if (keyIsDown(LEFT_ARROW)) {
    for (let i = 0; i < characters.length; i++) {
      characters[i].setDirection(-1);
    }
  } else {
    for (let i = 0; i < characters.length; i++) {
      characters[i].setDirection(0);
    }
  }

  // Draw and update each character
  for (let i = 0; i < characters.length; i++) {
    characters[i].update();
    characters[i].display();
  }
}

class Character {
  constructor(x, y, sprite, speed) {
    this.x = x;
    this.y = y;
    this.frameWidth = 80;
    this.frameHeight = 80;
    this.frameCount = 9;
    this.currentFrame = 0;
    this.scaleFactor = 1;
    this.frameDelay = 5;
    this.direction = 0;
    this.speed = speed;
    this.sprite = sprite;
  }

  update() {
    // Update animation frame based on frameDelay
    if (frameCount % this.frameDelay === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    }

    // Move the character based on the direction and speed
    this.x += this.direction * this.speed;

    // Boundary checks to keep the character within the canvas
    this.x = constrain(this.x, 0, width - this.frameWidth);
  }

  display() {
    // Display the character at its current position
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor, 1);

    // Check if the character is stationary
    if (this.direction === 0) {
      // Display idle frame when stationary
      image(
        this.sprite,
        0,
        0,
        this.frameWidth,
        this.frameHeight,
        0, // Use the first frame for idle animation
        0,
        this.frameWidth,
        this.frameHeight
      );
    } else {
      // Display walking animation when moving
      image(
        this.sprite,
        0,
        0,
        this.frameWidth,
        this.frameHeight,
        this.currentFrame * this.frameWidth,
        0,
        this.frameWidth,
        this.frameHeight
      );
    }

    pop();
  }

  setDirection(dir) {
    // Set the direction for left or right-facing
    this.direction = dir;
    if (dir !== 0) {
      this.scaleFactor = dir; // Set the scale factor for left or right-facing
    }
  }
}
