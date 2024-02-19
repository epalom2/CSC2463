let bugs = [];
let squishedBugs = 0;
let timer = 30;
let squishedBugImage;

function preload() {
  // Load bug images
  bugSprites = [];
  for (let i = 0; i < 7; i++) {
    bugSprites[i] = loadImage(`assignment4/libraries/Bug Squish.png`);
  }

}

function setup() {
  createCanvas(800, 600);

  // Create initial bugs
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(width), random(height), random([-1, 1])));
  }

  // Set up the timer
  setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      noLoop(); // Stop the game after 30 seconds
    }
  }, 1000);
}

function draw() {
  background(220);

  // Display bugs
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].update();
    bugs[i].display();
  }

  // Display score and timer
  fill(0);
  textSize(24);
  text(`Bugs Squished: ${squishedBugs}`, 20, 30);
  text(`Time Remaining: ${timer} seconds`, width - 220, 30);
}

function mousePressed() {
  // Check if the mouse is over a bug
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].contains(mouseX, mouseY)) {
      bugs[i].squish();
      squishedBugs++;
      // Increase bug speed after squishing
      bugs[i].increaseSpeed();
      break; // Stop checking bugs after squishing one
    }
  }
}

class Bug {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = 2;
    this.currentFrame = 0;
  }

  update() {
    // Move bug based on direction vector
    this.x += this.direction * this.speed;

    // Change direction when reaching the canvas edges
    if (this.x < 0 || this.x > width) {
      this.direction *= -1;
    }

    // Update bug animation frame
    this.currentFrame = (this.currentFrame + 1) % bugSprites.length;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.direction === 1 ? 0 : PI); // Rotate 0 radians or PI radians based on direction
  
    // Draw bug animation
    image(
      bugSprites[this.currentFrame],
      -bugSprites[this.currentFrame].width / 2,
      -bugSprites[this.currentFrame].height / 2
    );
  
    pop();
  
    // Update animation frame
    if (frameCount % 10 === 0) {
      this.currentFrame = (this.currentFrame + 1) % bugSprites.length;
    }
  }
  

  contains(px, py) {
    // Check if the point (px, py) is inside the bug's bounding box
    return (
      px > this.x - bugSprites[0].width / 2 &&
      px < this.x + bugSprites[0].width / 2 &&
      py > this.y - bugSprites[0].height / 2 &&
      py < this.y + bugSprites[0].height / 2
    );
  }

  squish() {
    // Change bug sprite to squished image
    bugSprites = [squishedBugImage];
  }

  increaseSpeed() {
    this.speed += 0.5;
  }
}

// Note: This code assumes you have a mechanism to choose the correct animation frame based on the bug's state and direction.
// You'll need to implement the logic for frame selection based on your sprite sheet's layout and update the display method accordingly.
