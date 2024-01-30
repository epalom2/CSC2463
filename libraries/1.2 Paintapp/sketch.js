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

function setup() {
  createCanvas(800, 600);
  drawPalette();
}

function draw() {
  if (mouseIsPressed && mouseX > paletteWidth) {
    // Draw when mouse is pressed and not on the palette
    stroke(currentColor);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function drawPalette() {
  let boxHeight = height / palette.length;
  
  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    rect(0, i * boxHeight, paletteWidth, boxHeight);
  }
}

function mouseClicked() {
  // Check if the mouse is within the palette area
  if (mouseX < paletteWidth && mouseY < height) {
    let index = Math.floor(mouseY / (height / palette.length));
    currentColor = palette[index];
  }
}
