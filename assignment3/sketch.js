let sprite;

function preload() {
    sprite = new Sprite(200, 200, 80, 80);
    sprite.spriteSheet = 'libraries/PC Computer - Spelunky - Green.png'
    let animations = {
        stand: {row: 0, frames: 1},
        walkRight: {row: 0, col: 1, frames: 8},
        walkUp: {row: 5, frames: 6},
        walkDown: {row: 5, frames: 6}
    };
    sprite.anis.frameDelay = 8;
    sprite. addAnis(animations);
    sprite.changeAni('walkRight');
}

function setup(){
    createCanvas(400, 400);
}

function draw(){
    background(0);
    if(sprite.x > width) {
        sprite.vel.x = -1;
        sprite.scale.x = -1;
    }
}

function keyTyped() {
    switch(key) {
        case 'd':
            sprite.changeAni('walkRight');
            sprite.vel.x = 1;
            sprite.scale.x = 1;
            sprite.vel.y = 0;
            break;
        case 'a':
            sprite.changeAni('walkRight');
            sprite.vel.x = -1;
            sprite.scale.x = -1;
            sprite.vel.y = 0;
            break;
        case 'w':
            sprite.changeAni('walkUp');
            sprite.vel.y = -1;
            sprite.vel.x = 0;
            break;
        case 's':
            sprite.changeAni('walkdown');
            sprite.vel.y = 1;
            sprite.vel.x = 0;

    }
}

