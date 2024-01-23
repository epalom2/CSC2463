function setup() {
  
  createCanvas(1000, 1000);
  background(225);
  
  
  
}

function draw() {
  //example 1
  fill(0, 225, 0)
  rect(10, 10, 290, 150);
 
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
}




