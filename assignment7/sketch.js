
let osc;
let lfo;

function preload() {
  bat = loadImage('assets/flyingfox.webp');
}

function setup() {
  createCanvas(700, 700);
  

  osc = new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.5,
      release: 0.1
    }
  }).toDestination();
  
  // Initialize the LFO and connect it to the oscillator's frequency
  lfo = new Tone.LFO({
    frequency: 10,  
    min: 10,       
    max: 60000        
  });
  lfo.connect(osc.oscillator.frequency);
  lfo.start();
}



function draw() {
  if (mouseIsPressed) {
    background(bat);
    playSound();
  } else {
    background(240);
    text('Press left click to use echolocation', 100, height / 2);
  }
}

function playSound() {
  osc.triggerAttackRelease("A5", "8n");  // Play a note with the LFO applied
}
