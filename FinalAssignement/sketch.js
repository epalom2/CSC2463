let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 1000;

let sprite;
let characters = [];
let devices = [];

let bgImage;
let startImage;
let deviceImage; 
let gameOverImage;

let synth;
let envelope;
let osc;

let backgroundMusic;

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver",
  Victory: "Victory"
};

let game = {
  state: GameState.Start,
  elapsedTime: 0,
  maxTime: 80, 
  score: 0, // Added to track the number of deactivated devices
  totalDevices: 10 // Total number of devices to deactivate
};


function preload() {
  let animations = {
      stand: {row: 0, frames: 1},
      walkRight: {row: 0, col: 1, frames: 8},
      walkUp: {row: 5, frames: 6 },
      walkDown: {row: 5, col:6, frames: 6}
  };
  
  characters.push(new Character(400,300,80,80,'assets/PCComputer-Spelunky-MeatBoy.png', animations));
  bgImage = loadImage('assets/newMapP5.png');
  deviceImage = loadImage('assets/TheDevice.png');
  startImage = loadImage('assets/walkieTalkie1.png')
  gameOverImage = loadImage('assets/Skull.png')

  soundFormats("mp3");
  backgroundMusic = loadSound("assets/GameMuisc.mp3")
}

function setup() {
  port = createSerial();
  createCanvas(800, 800);
  circleX = width / 2;
  circleY = height / 2;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  
  devices = []; // Resetting devices array to make sure it's empty before populating
    for (let i = 0; i < 10; i++) {
        let x = random(50, width - 50);
        let y = random(50, height - 50);
        devices.push(new Device(x, y)); // Create new Device instances
    }

     // Sound setup
     synth = new p5.PolySynth();
     envelope = new p5.Envelope();
     envelope.setADSR(0.001, 0.5, 0.1, 0.5);
     envelope.setRange(1, 0);
     osc = new p5.Oscillator();
     osc.setType('sine');
     osc.freq(240);
     osc.amp(envelope);
     osc.start();  // Start the oscillator here

     playBackgroundMusic();
  }

function draw() {
  image(bgImage, 0, 0, width, height);
  switch (game.state) {
      case GameState.Playing:
          image(bgImage, 0, 0, width, height); // Draw background image
          updateGame();
          displayTimer();
          displayScore(); 
          checkGameOver();
          break;
      case GameState.GameOver:
          displayGameOver();
          break;
      case GameState.Start:
          displayStartScreen();
          break;
      case GameState.Victory:
          displayVictoryScreen();
          break;
  }
}

function playBackgroundMusic() {

  backgroundMusic.play();
  backgroundMusic.loop();
  backgroundMusic.setVolume(0.3);
  userStartAudio();

}

function playSound() {
  let volume = map(mouseX, 0, width, 0.1, 1);
  let freq = map(mouseY, 0, height, 50, 2000); // Changed frequency range
  envelope.setADSR(0.001, map(mouseX, 0, width, 0.1, 1), 0.1, map(mouseY, 0, height, 0.1, 1));
  envelope.setRange(volume, 0);
  osc.freq(freq);
  envelope.play(osc);
}

function playDeviceInteractionSound() {
  osc.freq(950); 
  envelope.play();
}

class Character {
  constructor(x,y,width,height, spriteSheet, animations){
      this.sprite = new Sprite(x, y, width, height)
      this.sprite.spriteSheet = spriteSheet;
      
      this.sprite.anis.frameDelay = 8;
      this.sprite. addAnis(animations);
      this.sprite.changeAni('stand');
      
  }

  walkRight() {
      this.sprite.changeAni('walkRight');
      this.sprite.vel.x = 1;
      this.sprite.scale.x = 1;
      this.sprite.vel.y = 0;
  }
  
  walkLeft() {
      this.sprite.changeAni('walkRight');
      this.sprite.vel.x = -1;
      this.sprite.scale.x = -1;
      this.sprite.vel.y = 0;
  }
  
  walkUp() {
      this.sprite.changeAni('walkDown');
      this.sprite.vel.y = 1;
      this.sprite.vel.x = 0;
  }
  
  walkDown() {
      this.sprite.changeAni('walkUp');
      this.sprite.vel.y = -1;
      this.sprite.vel.x = 0;
  }
  
  stop() {
      this.sprite.vel.x = 0;
      this.sprite.vel.y = 0;
      this.sprite.changeAni('stand');
  }

}

class Device {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.active = true;
      this.toBeDeactivated = false; // New flag
      this.deactivationCounter = 30; // Delay frames before actually deactivating
  }

  update() {
      if (this.toBeDeactivated && this.deactivationCounter > 0) {
          this.deactivationCounter--;
          if (this.deactivationCounter === 0) {
              this.active = false;
          }
      }
  }

  toggleLock() {
      if (this.active && !this.toBeDeactivated) {
          this.toBeDeactivated = true; 
          ++game.score
      }
  }

  draw() {
      if (this.active) {
          image(deviceImage, this.x, this.y, 50, 50);
      }
  }

  contains(x, y) {
      return this.active && x >= this.x && x <= this.x + 50 &&
             y >= this.y && y <= this.y + 50;
  }
}

function updateCharacterMovement(character) {


      characters.forEach((character) => {
        // Move right
        if (joyX > 20) {  // Threshold to prevent drift
          character.walkRight();
        }
        // Move left
        else if (joyX < -20) { // Threshold to prevent drift
          character.walkLeft();
        }
        // Move up
        if (joyY > 20) { // Threshold to prevent drift
          character.walkUp();
        }
        // Move down
        else if (joyY < -20) { // Threshold to prevent drift
          character.walkDown();
        }
        // Stop moving if joystick is near center position
        if (Math.abs(joyX) <= 20 && Math.abs(joyY) <= 20) {
          character.stop();
        }
   });
}

function updateGame() {
  devices.forEach(device => {
      device.update();
      device.draw(); // Draw devices only if active
  });

  let str = port.readUntil("\n");
  if (str) {
      let values = str.split(",");
      if (values.length > 2) {
          joyX = parseInt(values[0]);
          joyY = parseInt(values[1]);
          let swPressed = values[2].trim() === "1"; // Check if button is pressed

          // Update movement regardless of switch press
          characters.forEach(character => {
              updateCharacterMovement(character);
          });

          // Handle device interaction separately
          if (swPressed) {
              characters.forEach(character => {
                  checkDeviceInteraction(character);
              });
          }
      }
  }
}


function checkDeviceInteraction(character) {
  let interactionValid = false;
  devices.forEach(device => {
      if (device.active && device.contains(character.sprite.position.x, character.sprite.position.y)) {
          device.toggleLock();
          
          interactionValid = true;
      }
  });

  // Send command to Arduino to control LED
  if (interactionValid) {
      port.write('G');
      playDeviceInteractionSound();
  } if (!interactionValid){
      port.write('R');
      playInvalidInteractionSound();
  }
}


function playInvalidInteractionSound() {
  osc.freq(300); // Lower frequency for invalid interaction
  envelope.play();
}


function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}


function displayTimer() {
  let currentTime = game.maxTime - game.elapsedTime;
  fill(255, 20, 0);
  textSize(24);
  text(`Time Left: ${ceil(currentTime)}`, 100, 50);
  game.elapsedTime += deltaTime / 1000;
}

function checkGameOver() {
  if (game.score >= game.totalDevices) {
      game.state = GameState.Victory;  // Set to Victory when all devices are deactivated
  } else if (game.maxTime - game.elapsedTime < 0) {
      game.state = GameState.GameOver; // Set to GameOver when time runs out
  }
}


function displayVictoryScreen() {
  background(0);
  image(startImage, 0, 0, width, height);
  fill(50, 205, 50); // Light green color
  textSize(40);
  textAlign(CENTER);
  text("Congratulations! You've won!", width / 2, height / 2);
  textSize(30);
  text("Press Any Key to Restart", width / 2, height / 2 + 50);
}

function displayGameOver() {
  background(0);
  image(gameOverImage, 0, 0, width, height);
  fill(255, 0, 0);
  textSize(40);
  textAlign(CENTER);
  text("Game Over!", width / 2, height / 2);
  textSize(30);
  text("Press Any Key to Restart", width / 2, height / 2 + 50);
}

function displayStartScreen() {
  background(100);
  
  fill(225, 255, 0);
  textSize(50);
  textAlign(CENTER);
  text("DEVICE GAME", width / 2, height / 2);
  text("Press Any Key to Start", width / 2, height / 3.5);
}

function displayScore() {
  fill( 0, 255, 255);
  textSize(24);
  text(`Score: ${game.score}`, 80, 80); // Display score below the timer
}

function keyPressed() {
  if (game.state === GameState.Start || game.state === GameState.GameOver || game.state === GameState.Victory) {
      resetGame();
      game.state = GameState.Playing;
  }
}

function resetGame() {
  game.elapsedTime = 0;
  game.score = 0; // Reset score
  game.state = GameState.Playing; // Ensure game state is set to Playing

  // Reactivate all devices
  devices.forEach(device => {
    device.active = true;
    device.toBeDeactivated = false;
    device.deactivationCounter = 30; // Reset the counter if you're keeping the delayed deactivation
  });

  console.log("Game has been reset."); // Debugging log
}
