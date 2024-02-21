let soundFX;

function preload(){
  soundFx = new touchEnded.Players ({
    frog : "assets/bbc_common-fro_nhu0510423.mp3",
    falcon : "assets/bbc_peregrine-_nhu0510423.mp3"
  }).toDestination(); 
}

function keyPressed(){
  if (key === 'f') {
    soundFX.player('falcon').start();
  } else if (key === 'q') {
    soundFX.player('frog').start();
  }
}
function setup() {
  createCanvas(400, 400);

  button1 = createButton('Froggy');
  button1.position (85,150);
  button1.mousepressed (() =>soundFX.player ('frog').start());

  button2 = createButton('FALCON!');
  button2.position (205, 150);
  button2.mousePressed(() =>soundFX.player ('falcon').start());

}

function draw() {
  background(220, 100, 200);
  text("press f or q :)")
}
