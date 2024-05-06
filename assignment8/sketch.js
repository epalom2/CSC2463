// Constants and configurations
const palette = [
  '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF',
  '#0000FF', '#FF00FF', '#A52A2A', '#FFFFFF', '#000000'
];
const paletteWidth = 30;
const brushSize = 1;

// State variables
let currentColor = '#000000';
let canDraw = true;

// Audio components
let synth, envelope, osc;

function setup() {
  createCanvas(1500, 800);
  initializeAudio();
  drawPalette();
}

function draw() {
  if (mouseIsPressed && mouseX > paletteWidth + 5 && canDraw) {
    stroke(currentColor);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
    playSound();
  }
}

function mousePressed() {
  osc.start(); 
  if (mouseX < paletteWidth && mouseY < height) {
    selectColor();
  } else {
    canDraw = true;
    playBrushSound();
  }
}

function keyPressed() {
  if (key === 'C' || key === 'c') {
    clearCanvas();
  }
}

function keyTyped() {
  if (keyIsDown(CONTROL) && key === 's') {
    saveDrawing();
  }
}

// Helper functions
function initializeAudio() {
  synth = new p5.PolySynth();
  envelope = new p5.Envelope(0.001, 0.5, 0.1, 0.5, 1, 0);
  osc = new p5.Oscillator('sine', 240);
  osc.amp(envelope);
  osc.start();
}

function drawPalette() {
  let boxHeight = height / palette.length;
  push();
  noStroke();
  palette.forEach((color, index) => {
    fill(color);
    rect(0, index * boxHeight, paletteWidth, boxHeight);
  });
  pop();
}

function selectColor() {
  let index = Math.floor(mouseY / (height / palette.length));
  currentColor = palette[index];
  playColorChangeSound();
  canDraw = false;
  setTimeout(() => canDraw = true, 100);
}

function clearCanvas() {
  clear();
  drawPalette();
  playClearScreenSound();
}

function saveDrawing() {
  saveCanvas('My Masterpiece', 'png');
  playSaveSound();
}

function playSound() {
  let volume = map(mouseX, 0, width, 0.1, 1);
  let freq = map(mouseY, 0, height, 50, 5000);
  envelope.setADSR(0.001, map(mouseX, 0, width, 0.1, 1), 0.1, map(mouseY, 0, height, 0.1, 1));
  envelope.setRange(volume, 0);
  osc.freq(freq);
  envelope.play(osc);
}

function playBrushSound() {
  osc.freq(1000);
  osc.start();
}

function playColorChangeSound() {
  osc.freq(3000);
  envelope.play(osc);
  setTimeout(() => osc.freq(800), 100);
}

function playClearScreenSound() {
  osc.setType('sawtooth');
  osc.freq(1500);
  envelope.play(osc);
  setTimeout(() => osc.freq(300), 100);
}

function playSaveSound() {
  osc.setType('triangle');
  osc.freq(1000);
  envelope.play(osc);
  setTimeout(() => osc.freq(500), 100);
}
