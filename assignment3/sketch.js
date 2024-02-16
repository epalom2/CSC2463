let sprite;
let characters = [];

function preload() {
    let animations = {
        stand: {row: 0, frames: 1},
        walkRight: {row: 0, col: 1, frames: 8},
        walkUp: {row: 5, frames: 6},
        walkDown: {row: 5, col:6, frames: 6}
    };
    characters.push(new Character(100,100,80,80,'assets/PC Computer - Spelunky - Spelunky Guy.png', animations));
    characters.push(new Character(200,200,80,80,'assets/PC Computer - Spelunky - Green.png', animations));
    characters.push(new Character(300,300,80,80,'assets/PC Computer - Spelunky - Meat Boy.png', animations));


}

function setup(){
    createCanvas(400, 400);
}

function draw(){
    background(0);

    characters.forEach((character) => {
        if(kb.pressing('d')){
            character.walkRight();
        } else if (kb.pressing('a')){
            character.walkLeft();
        } else {
            character.stop();
        }
    })
    
    
    // if(sprite.x + sprite.width/4 > width) {
    //     walkLeft();
    // } else if (sprite.x - sprite.width/4 < 0) {
    // walkRight();
    // }
}

class Character {
    constructor(x,y,width,height, spriteSheet, animations){
        this.sprite = new Sprite(x, y, width, height)
        this.sprite.spriteSheet = spriteSheet;
        
        this.sprite.anis.frameDelay = 8;
        this.sprite. addAnis(animations);
        this.sprite.changeAni('stand');
    }

    walkRight() {
        this.sprite.changeAni('walkRight');
        this.sprite.vel.x = 1;
        this.sprite.scale.x = 1;
        this.sprite.vel.y = 0;
    }
    
    walkLeft() {
        this.sprite.changeAni('walkRight');
        this.sprite.vel.x = -1;
        this.sprite.scale.x = -1;
        this.sprite.vel.y = 0;
    }
    
    walkUp() {
        this.sprite.changeAni('walkUp');
        this.sprite.vel.y = -1;
        this.sprite.vel.x = 0;
    }
    
    walkDown() {
        this.sprite.changeAni('walkdown');
        this.sprite.vel.y = 1;
        this.sprite.vel.x = 0;
    }
    
    stop() {
        this.sprite.vel.x = 0;
        this.sprite.vel.y = 0;
        this.sprite.changeAni('stand');
    }

}




function keyTypedold() {
    switch(key) {
        case 'd':
            walkRight();
            break;
        case 'a':
            walkLeft();
            break;
        case 'w':
            walkUp();
            break;
        case 's':
            walkDown();
            
    }
}