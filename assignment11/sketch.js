let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 3;

let currentColor = '#000000'; // Initial color is black
let brushSize = 10; // Initial brush size
let paletteWidth = 30; // Width of the color palette
let canDraw = true; // Flag to control drawing



let synth;
let envelope;
let osc;

let palette = [
  '#FF0000', // red
  '#FFA500', // orange
  '#FFFF00', // yellow
  '#00FF00', // green
  '#00FFFF', // cyan
  '#0000FF', // blue
  '#FF00FF', // magenta
  '#A52A2A', // brown
  '#FFFFFF', // white
  '#000000'  // black
];

function setup() {
  port = createSerial();
  createCanvas(1000, 1000);
  circleX = width / 2;
  circleY = height / 2;
  drawPalette();
  synth = new p5.PolySynth();
  envelope = new p5.Envelope();
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope.setRange(1, 0);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(envelope);
  osc.start();  // Start the oscillator here
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);
}

function drawPalette() {
  let boxHeight = height / palette.length;
  
  push(); // Save the current drawing state
  noStroke();
  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]); // Set the fill color to the current palette color
    rect(0, i * boxHeight, paletteWidth, boxHeight);
  }
  pop(); // Restore the original drawing state
}

function hexToRgb(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function draw() {
  //background(220);

  let str = port.readUntil("\n");
  let values = str.split(",");
  if (values.length > 2) {
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]);

    if (joyX > 0) {
      circleX += speed;
    } else if (joyX < 0) {
      circleX -= speed;
    }

    if (joyY > 0) {
      circleY += speed;
    } else if (joyY < 0) {
      circleY -= speed;
    }
  }

  if (sw == 1) {
    // Random color change when the switch is pressed
    currentColor = palette[Math.floor(Math.random() * palette.length)];
    playColorChangeSound(); // Play a sound when the color changes
    // Convert hex color to RGB
    let rgb = hexToRgb(currentColor);
    // Send RGB values to Arduino
    port.write(`${rgb[0]},${rgb[1]},${rgb[2]}\n`);
  }
  circle(circleX, circleY, 20);
  fill(currentColor);


}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

function playSound() {
  let volume = map(mouseX, 0, width, 0.1, 1);
  let freq = map(mouseY, 0, height, 50, 2000); // Changed frequency range
  envelope.setADSR(0.001, map(mouseX, 0, width, 0.1, 1), 0.1, map(mouseY, 0, height, 0.1, 1));
  envelope.setRange(volume, 0);
  osc.freq(freq);
  envelope.play(osc);
}

function playBrushSound() {
  osc.freq(500); // Changed frequency to make it different
  osc.start();
}


function playColorChangeSound() {
  osc.freq(1200); // Higher frequency for color change
  envelope.play(osc);
  setTimeout(() => {
    osc.freq(600); // Quick change to a lower frequency for effect
  }, 100);
}


function keyPressed() {
  if (key === 'c' || key === 'C') {
    clear(); // Clear the canvas
    drawPalette(); // Redraw the palette after clearing
    backgroundColor = 255; // Reset background color if necessary
    playClearScreenSound();
  }
}


function keyTyped() {
  if (keyIsDown(CONTROL) && key === 's') {
    // Save the file with corresponding sound when Command + S is pressed
    saveCanvas('My Masterpiece', 'png');
    playSaveSound();
  }
}

function playClearScreenSound() {
  osc.setType('sawtooth');
  osc.freq(1500); // Start with a high frequency
  envelope.play(osc);
  setTimeout(() => {
    osc.freq(300); // Drop to a lower frequency quickly
  }, 100);
}

// function mousePressed() {
//   osc.start(); // Ensure the oscillator starts on a user action
//   if (mouseX < paletteWidth && mouseY < height) {
//     let index = Math.floor(mouseY / (height / palette.length));
//     currentColor = palette[index];
//     playColorChangeSound();
//     canDraw = false;
//     setTimeout(() => canDraw = true, 100);
//   } else {
//     canDraw = true;
//     playBrushSound();
//   }
// }