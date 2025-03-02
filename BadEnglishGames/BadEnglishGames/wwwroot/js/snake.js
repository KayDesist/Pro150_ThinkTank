//Creating snake class
class Snake {
    x = 0;
    y = 0;

    position = [];
    direction = [0, 0];
    body = [[0, 0]];

    growSnake() {
        //If the snake has only one segment to the body,
        //add the new segment to the end in the opposite direction of the movement (direction var)

        var newPosition = [];

        if (this.body.length == 1) {
            //Getting the direction opposite of our movement
            var newDirection = [this.direction[0] * -1, this.direction[1] * -1];

            //Getting the position from the position plus newDirection
            newPosition = [this.position[0] + newDirection[0], this.position[1] + newDirection[1]];
        }

        //We need the last position and the second last position of the snake
        //This way we can gauge the "endDirection" of the tail
        else if (this.body.length > 1) {
            //Formula: (SecondTail = ST) (Tail = T) (N = new)
            //   ST - T = N_dir
            //   -N_dir + T = N_pos

            var secondTailPosition = this.body[this.body.length - 2];
            var tailPosition = this.body[this.body.length - 1];
            
            var newDirection = [secondTailPosition[0] - tailPosition[0], secondTailPosition[1] - tailPosition[1]];
            var negNewDirection = [newDirection[0] * -1, newDirection[1] * -1];

            newPosition = [negNewDirection[0] + tailPosition[0], negNewDirection[1] + tailPosition[1]];
        }

        this.body.push(newPosition);
        //

    }


    updatePosition() {

        this.x += this.direction[0];
        this.y += this.direction[1];
        this.position = [this.x, this.y];
        //The last segment of the body becomes the first part of the body

        //Unless the length is one, in which case we just update the head
        if (this.body.length == 1) {
            this.body[0] = this.position;
        }
        else if (this.body.length > 1) {
            var lastPosition = this.body.pop();

            //Adds the last position to the front of the snake
            this.body.unshift(this.position);
        } 
        
    }

    checkCollision() {
        var inBody = false;
        
        for (var pos of this.body.slice(1)) {
            if (pos[0] == this.position[0] && pos[1] == this.position[1]) {
                inBody = true;
            }
        }

        return inBody;
    }

    drawSnake() {
        for (var pos of this.body) {
            if (pos != null) document.getElementById(pos[0] + " - " + pos[1]).style.backgroundColor = "green";
        }
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.body = [[x, y]];
    }
}

// Apple logic
class Apple {
    x = 0;
    y = 0;

    constructor() {
        this.setSpawnLocation();
    }

    setSpawnLocation() {
        this.x = Math.floor(Math.random() * 12);
        this.y = Math.floor(Math.random() * 30);
    }

    drawApple() {
        document.getElementById(this.x + " - " + this.y).style.backgroundColor = "red";
    }
}

class Game {
    snake = new Snake(0,0);
    apple = new Apple();

    screenWidth = 30;
    screenHeight = 12;

    score = 0;

    startGame() {
        this.snake = new Snake(1, 1);
        this.apple = new Apple();
        score = 0;
    }

    constructor() {
        this.startGame();
    }

    gameOver() {
        alert("Game Over! Score: " + this.score);
        this.startGame();
    }

    update() {
        this.snake.updatePosition();
        this.snakeCollision();
        this.screenCollision();
        this.appleCollision();
        this.clearBoard();
        this.snake.drawSnake();
        this.apple.drawApple();
    }

    screenCollision() {
        if (this.snake.x < 0 || this.snake.x >= screenHeight || this.snake.y < 0 || this.snake.y >= screenWidth) {
            this.gameOver();
        }
    }

    snakeCollision() {
        if (this.snake.checkCollision()) {
            this.gameOver();
        }
    }

    spawnApple() {
        this.apple = new Apple();

        var isInSnake = false;

        while (!isInSnake) {
            this.apple.setSpawnLocation();
            isInSnake = !this.snake.body.includes(this.apple.position);
        }
    }

    appleCollision() {
        if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {

            //Getting score updated
            this.score += 10;

            //Spawning new apple
            this.spawnApple();

            //Grow Snake
            this.snake.growSnake();

        }
    }

    clearBoard() {

        var cells = document.getElementsByClassName("SnakeCell");

        for (let rows = 0; rows < 12; rows++) {
            for (let cells = 0; cells < 30; cells++) {
                document.getElementById(rows + " - " + cells).style.backgroundColor = "white";
            }
        }


    }
}


var game = new Game();

//Getting User Input
document.onkeypress = (e) => {
    let key = e.keyCode;

    if (key == "w".charCodeAt(0)) {
        game.snake.direction = [-1, 0];
    }
    else if (key == "a".charCodeAt(0)) {
        game.snake.direction = [0, -1];
    }
    else if (key == "s".charCodeAt(0)) {
        game.snake.direction = [1, 0];
    }
    else if (key == "d".charCodeAt(0)) {
        game.snake.direction = [0, 1];
    }
}

//Setting up Game Tick
function tick() {
    game.update();
    //document.getElementById("test").innerHTML = "Score: " + snake.score;
}

setInterval(tick, 100);