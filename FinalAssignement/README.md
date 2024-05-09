#Final Integration Project Documentation

###By Ethan Palomino

##Project Outline

The main goal of this project was to successfully integrate all of the learned aspects of programming image and graphics, Sound, and physical computing. 

-For programming image and graphics into our project, P5.js and sprite animation was used to cover the graphics feild of our final project. 

-For sound we used the integration of Tone.js, which allowed us to use an oscillator and synth to create sound effects for our project. Additionally, background music was imported into the project. 

-Finally, the physical computing involved with our project featured digital and analog inputs/outputs to give us controls for the game, as well  as signifiers to add interactebility to our project for the user.

##Narrative Description

The idea of the ptoject was to create a simple timed game where our character is working in a security facility, where he has to activate all the devices to secure the area before the time runs out. Using P5 play, A startup, playing state, gameover, and victory screen were all implemented into the project using GameState. This allowed the user to type any keyboard for starting and reseting the game. 

###Graphics and Image implementation

In order to achive this we needed to implement a game reset method that respawned all the devices on the map and reseted the characters spawn position every time the game ended. If the user activates all of the devices on the map before the timer runs out, the victory screen will be displayed. If they run out of time, the game over screen will be displayed. Both screens allowed the user to reset the game if they want to play again. 

The draw() function handles the logic for the screens:

function draw() {
  image(bgImage, 0, 0, width, height);
  switch (game.state) {
      case GameState.Playing:
          image(bgImage, 0, 0, width, height); // Draw background image
          updateGame();
          displayTimer();
          displayScore(); 
          checkGameOver();
          break;
      case GameState.GameOver:
          displayGameOver();
          break;
      case GameState.Start:
          displayStartScreen();
          break;
      case GameState.Victory:
          displayVictoryScreen();
          break;
  }
}


the methods being called in the draw function where handled with the following methods:

![alt text](assets/ScreenLogic2463.png)

If you notice, the code has a resetGame() and displayScore() function for successfully handling the reset game feature, and displaying the score on the playing state. The source code can all be found in sketch.js

####Startup screen:
![alt text](assets/StartupScreen2463.png)

####GameOver Screen
![alt text](assets/gameOver2463.png)

####Victory Screen
![alt text](assets/VictoryScreen2463.png)

####Playing State(Gameplay of actual project screenshot)
![alt text](assets/VictoryScreen2463.png)

For our main character, we imported a sprite sheet from the internet that is inspiered from the game Splunky. the name of the character himself is from another game called meatboy. We used this sprite sheet to animate our charater, as well as animations to have him walk around the map. 

There are also "devices" that our character would interact with, once interacted with, the devices would dissapear from the screen. The way to win is to interact with all the devices before the timer runs out. The "device" sprite was drawn with https://www.piskelapp.com/ . 

Characters and devices first had to be loaded into the project using "load" int the preload() function. There was also for loops under the function update() that allowed the devices to spawn anywhere randomly everytime the game is started and reset. Furthermore, there was some logic too add to the score count everytime a device is interacted with. Once the score reaches 10 the game will end, if time runs out and the score isn't 10, game over will be displayed.  

####preload() Function
![alt text](assets/Preload()2463.png)

This shows how the sprites and devices were loaded into the canvas, along with the animation logic for the main Character. If you notice, animations defines the exact rows/ columns of the characters movement depending on which direction they are walking in. This works by specifying the frames that should be played in row/ column to display the animation of each walking direction.

####Sprite sheet used:
![alt text](assets/PC Computer - Spelunky - Meat Boy.png)

####Device sprite
![alt text](assets/TheDevice.png)

###Sound Design

The sound was first imported in with the help of Tone.js for some sound effects, and some free, no copyright, 16-bit music was imported in for some background music.

First we had to update our index.html file to allow us to use the synth and oscillator from Tone.js. We also had to add Tone.js to our projects library to physically be able to call to it in our code. The actual Tone.js file is under the libraries directory. 

![alt text](assets/Tone,js.png)

The Logic with the sound effects was to indicate if a player activated the device correctly, or did it wrong. A checkmark like sound effect was used to indicate that the device was activated successfully, and 