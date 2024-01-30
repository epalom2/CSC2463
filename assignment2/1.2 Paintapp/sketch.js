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

function setup() {
  createCanvas(800, 600);
  drawPalette();
}

function draw() {
  if (mouseIsPressed) {
    // Draw when mouse is pressed
    stroke(currentColor);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function drawPalette() {
  let boxWidth = 30;
  let boxHeight = height / palette.length;
  
  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    rect(0, i * boxHeight, boxWidth, boxHeight);
  }
}

function mouseClicked() {
  // Check if the mouse is within the palette area
  if (mouseX < 30 && mouseY < height) {
    let index = Math.floor(mouseY / (height / palette.length));
    currentColor = palette[index];
  }
}
