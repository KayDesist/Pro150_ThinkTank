//Helper class for positioning
class Position {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class Player {
    position = new Position(50, 150);

    //For the canvas
    width = 50;
    height = 75;

    //For Game Physics
    jumpHeight = 0;

    xVelocity = 0;
    yVelocity = 0; 
    drag = 1;

    //Getting the Right Side Position
    GetRightSide() {
        return this.position.x + this.width;
    }

    //Getting the Bottom Side Position
    GetBottomSide() {
        return this.position.y + this.height;
    }

    //Applying vertical velocity
    Jump() {
        this.yVelocity = -20; //Applying Negative Velocity since y=0 is the top
    }

    //Applying horizontal velocity
    Move(amt) {
        this.xVelocity += amt;
    }

    

    //Updating the positions based on the velocity
    UpdatePosition() {
        this.position.x += this.xVelocity;
        this.position.y += this.yVelocity;
        

        this.xVelocity -= (this.xVelocity > 0) ? this.drag : 0;
        this.yVelocity -= (this.yVelocity > 0) ? this.drag : 0;
    }

    //Drawing the players Rectangle on Canvas Context
    DrawPlayer(ctx) {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    //Calling all update logic for player
    Update() {
        this.UpdatePosition();
    }
}

class Platform {
    position = new Position();

    width = 60;
    height = 20;

    constructor() {
        this.position.x = Math.floor(Math.random() * 316);
        this.position.y = Math.floor(Math.random() * 316);
    }

    DrawPlatform() {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Game {

    //Assigning local variables to base values
    gravity = 1.5;
    constructor() {
        this.canvas = document.getElementById("GameArea");
        this.player = new Player();

        this.canvas.height = 316;
        this.canvas.width = 316;
        this.context = this.canvas.getContext("2d");
    }

    //Clearing the screen so that we can redraw
    Clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    ApplyGravity() {
        this.player.yVelocity += this.gravity;
    }

    //Runs all the update logic for the game
    Update() {
        this.Clear();

        //document.getElementById("test").innerHTML = this.player.position.x + ", " + this.player.position.y;
        this.ApplyGravity();
        this.player.Update();
        this.KeepPlayerWithinScreen();
        this.player.DrawPlayer(this.context);
    }

    KeepPlayerWithinScreen() {
        this.player.position.x = (this.player.x <= 0) ? 0 : (this.player.GetRightSide() >= this.canvas.width) ? this.canvas.width - this.player.width : this.player.position.x;
        this.player.position.y = (this.player.y <= 0) ? 0 : (this.player.GetBottomSide() >= this.canvas.height) ? this.canvas.height - this.player.height : this.player.position.y;
    }
}


game = new Game();

//Getting user input
document.onkeydown = (e) => {
    let key = e.key;

    if (key == "w") {
        game.player.Jump();
    }

    if (key == "a") {
        game.player.Move(-2);
    }

    if (key == "d") {
        game.player.Move(2);
    }
}

//Setting up Game Tick
function tick() {
    game.Update();
}

setInterval(tick, 10);