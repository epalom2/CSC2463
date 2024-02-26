
let soundFX = new Tone.Players ({
    frog : "assets/bbc_common-fro_nhu0510423.mp3",
    falcon : "assets/bbc_peregrine-_nhu0510423.mp3",
    forest : "assets/bbc_rainforest_nhu0501110.mp3",
    crane: "assets/bbc_black-neck_nhu0502303.mp3"
});
  
let button1, button2, button3, button4, delaySlider;
  
let delay = new Tone.FeedbackDelay("8n", 0.5);
soundFX.connect(delay);
delay.toDestination(); 


function setup() {
  createCanvas(400, 400);

  button1 = createButton('Froggy');
  button1.position (85,150);
  button1.mousePressed (() =>soundFX.player ('frog').start() );

  button2 = createButton('FALCON!');
  button2.position (205, 150);
  button2.mousePressed(() =>soundFX.player ('falcon').start() );

  button3 = createButton('Crickets');
  button3.position (85,250);
  button3.mousePressed (() =>soundFX.player ('forest').start() );

  button4 = createButton('Crane');
  button4.position (205,250);
  button4.mousePressed (() =>soundFX.player ('crane').start() );

  delaySlider = createSlider(0, 1, 0, 0.05);
  delaySlider.position(120, 325)
  delaySlider.mouseReleased( () => delay.delayTime.value = delaySlider.value());
}



function draw() {
  background(220, 100, 200);
  text('Press the buttons for sounds!', 100, 140);
  text('Adjust Delay', 150, 315);
}
