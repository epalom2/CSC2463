function setup() {
  
  createCanvas(1000, 1000);
  background(225);
  
  
}

function draw() {
  background(225);
  noStroke();
  
  //example 1
  fill(0, 225, 0)
  rect(10, 10, 290, 150);
 
  stroke(0);
  fill(255);
  circle(85, 85, 130);

  fill(255);
  square(165, 25, 120);

  //example 2
  noStroke();
  fill(255);
  square(10, 200, 300);

  fill(255, 0, 0, 100);
  circle(160, 305, 150);

  fill(0, 0, 255, 100);
  circle(110, 400, 150);

  fill(0, 255, 0, 100);
  circle(210, 400, 150);

  //example 3 
  fill(0);
  rect(400, 10, 300, 160);

  fill(255, 255, 0);
  circle(470, 90, 100);

  fill(0);
  triangle(470, 90, 400, 130, 400, 40);

  fill(255, 0, 0);
  rect(560, 30, 115, 110, 50, 50, 0, 0);

  fill(255);
  circle(590, 80, 33);

  fill(255);
  circle(645, 80, 33);

  fill(0, 0, 255);
  circle(590, 80, 20);

  fill(0, 0, 255);
  circle(645, 80, 20);
}




