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
        this.yVelocity = -15; //Applying Negative Velocity since y=0 is the top
    }

    //Applying horizontal velocity
    Move(amt) {
        this.xVelocity += amt;
    }

    

    //Updating the positions based on the velocity
    UpdatePosition() {
        this.position.x += this.xVelocity;
        this.position.y += this.yVelocity;
    }

    //Drawing the players Rectangle on Canvas Context
    DrawPlayer(ctx) {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    //Calling all update logic for player
    Update(platforms) {
        this.UpdatePosition();

        for (var platform of platforms) {
            this.CheckPlatformCollision(platform);
        }
    }

    CheckPlatformCollision(platform) {
        document.getElementById("test").innerHTML = this.GetRightSide();

        


        if (this.GetBottomSide() > platform.position.y + platform.height) return;

        if (this.GetBottomSide() >= platform.position.y) {

            if (this.GetRightSide() >= platform.position.x && this.position.x <= platform.position.x + platform.width) {
                this.position.y = platform.position.y - this.height;
                this.yVelocity = 0;
            }

        }

    }
}

class Platform {
    constructor(num) {
        //this.position = new Position(50, 100);
        this.position = new Position(Math.random() * 250, (316 - (50 * num)));
    }
    width = 60;
    height = 20;
    hasLanded = false;

    DrawPlatform(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Game {
    //Assigning local variables to base values
    gravity = 1;
    constructor() {
        this.canvas = document.getElementById("GameArea");
        this.player = new Player();

        this.canvas.height = 316;
        this.canvas.width = 316;
        this.context = this.canvas.getContext("2d");

        this.platforms = [new Platform(1)];
    }

    //Clearing the screen so that we can redraw
    Clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    ApplyGravity() {
        this.player.yVelocity += this.gravity;
    }

    AddNewPlatform() {
        this.platforms.push(new Platform(this.platforms.length + 1));
    }

    DrawPlatforms() {
        for (var platform of this.platforms) {
            platform.DrawPlatform(this.context);
        }
    }

    //Runs all the update logic for the game
    Update() {
        this.Clear();

        //document.getElementById("test").innerHTML = this.player.position.x + ", " + this.player.position.y;
        this.ApplyGravity();
        this.player.Update(this.platforms);
        this.KeepPlayerWithinScreen();
        this.player.DrawPlayer(this.context);
        this.DrawPlatforms();
    }

    KeepPlayerWithinScreen() {
        this.player.position.x = (this.player.position.x <= 0) ? 0 : (this.player.GetRightSide() >= this.canvas.width) ? this.canvas.width - this.player.width : this.player.position.x;
        this.player.position.y = (this.player.position.y <= 0) ? 0 : (this.player.GetBottomSide() >= this.canvas.height) ? this.canvas.height - this.player.height : this.player.position.y;
    }

    PushAllPlatformsDown(amt) {
        for (var platform of this.platforms) {
            platform.position.y += amt;
        }
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


document.onkeyup = () => {
    game.player.xVelocity = 0;

}
//Setting up Game Tick
function tick() {
    game.Update();
}

function PlayerJump() {
    game.player.Jump();
}

function SpawnPlatform() {
    game.AddNewPlatform();
}

function PushPlatformsDown() {
    game.PushAllPlatformsDown(10);
}

setInterval(tick, 10);
setInterval(SpawnPlatform, 700);

setInterval(PushPlatformsDown, 500);