
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

let currentColor = '#000000'; // Initial color is black
let brushSize = 10; // Initial brush size
let paletteWidth = 30; // Width of the color palette
let canDraw = true; // Flag to control drawing


let synth;
let envelope;
let osc;

function setup() {
  createCanvas(1500, 800);
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
}


function draw() {
  if (mouseIsPressed && mouseX > (paletteWidth + 5) && canDraw) {
    stroke(currentColor);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
    playSound(); // Call the function to play sound while drawing
  }
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


function mousePressed() {
  osc.start(); // Ensure the oscillator starts on a user action
  if (mouseX < paletteWidth && mouseY < height) {
    let index = Math.floor(mouseY / (height / palette.length));
    currentColor = palette[index];
    playColorChangeSound();
    canDraw = false;
    setTimeout(() => canDraw = true, 100);
  } else {
    canDraw = true;
    playBrushSound();
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


function playSaveSound() {
  osc.setType('triangle');
  osc.freq(1000); // Start with a medium-high frequency
  envelope.play(osc);
  setTimeout(() => {
    osc.freq(500); // Go to a lower frequency
  }, 100);
}

