let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
const speed = 3;
let mousePressedFlag = false;
let spacebarPressed = false;

function setup() {
  createCanvas(700, 700);
  circleX = width / 2;
  circleY = height / 2;

  setupSerial();
  setupConnectButton();

  frameRate(20);
}

function setupSerial() {
  port = createSerial();
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
}

function setupConnectButton() {
  connectButton = createButton("Connect");
  connectButton.mousePressed(toggleConnection);
}

function draw() {
  background(220);
  updatePositionFromJoystick();
  drawColoredSections();
  sendColorToPort();
  displayMovingCircle();
}

function updatePositionFromJoystick() {
  let latest = port.readUntil("\n");
  let values = latest.split(",");
  if (values.length > 2) {
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]);

    circleX += joyX > 0 ? speed : joyX < 0 ? -speed : 0;
    circleY += joyY > 0 ? speed : joyY < 0 ? -speed : 0;
  }
}

function drawColoredSections() {
  noStroke();
  const segmentWidth = width / 3;
  fill("yellow");
  rect(0, 0, segmentWidth, height);
  fill("blue");
  rect(segmentWidth, 0, segmentWidth, height);
  fill("green");
  rect(2 * segmentWidth, 0, segmentWidth, height);
}

function sendColorToPort() {
  if (port.opened() && frameCount % 3 == 0) {
    let pixel = get(circleX, circleY);
    let message = computeColorMessage(pixel);
    port.write(message);
  }
}

function computeColorMessage(pixel) {
  if (mousePressedFlag) {
    return `0 0 0\n`;
  } else if (spacebarPressed) {
    return `${pixel[0] + 20} ${pixel[1] + 20} ${pixel[2] + 20}\n`;
  }
  return `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
}

function displayMovingCircle() {
  fill(sw === 1 ? "blue" : "red");
  circle(circleX, circleY, 10);
}

function toggleConnection() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}

function mousePressed() {
  mousePressedFlag = !mousePressedFlag;
}
