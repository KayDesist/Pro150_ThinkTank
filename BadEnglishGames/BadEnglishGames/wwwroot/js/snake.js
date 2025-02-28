//Creating snake class
class Snake {
    x = 0;
    y = 0;

    position = [];
    direction = [0, 0];
    body = [[0, 0]];

    updatePosition() {

        this.x += this.direction[0];
        this.y += this.direction[1];
        this.position = [this.x, this.y];

        // Move the snake
        this.body.pop(); 
        
    }

    checkCollision() {
        return this.body.slice(1).some(segment => segment[0] === this.x && segment[1] === this.y);
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
}

class Game {
    snake = new Snake(0,0);
    apple = new Apple();

    screenWidth = 30;
    screenHeight = 12;

    constructor() {
        this.snake = new Snake(1, 1);
        this.apple = new Apple();
    }

    screenCollision() {
        if (this.snake.x < 0 || this.snake.x >= 12 || this.snake.y < 0 || this.snake.y >= 30) {
            alert("Game Over! Score: " + this.score);
            location.reload(); // Reload to restart game
        }
    }

    appleCollision() {
        if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {
            this.score++;
            spawnApple();

            newPosition = [this.snake.body[this]]

            this.body.push(); // Grow the snake
        }
    }
}


var game = new Game();

//Getting User Input
document.onkeypress = (e) => {
    let key = e.keyCode;

    if (key == "w".charCodeAt(0)) {
        game.snake.direction = [0, -1];
    }
    else if (key == "a".charCodeAt(0)) {
        game.snake.direction = [-1, 0];
    }
    else if (key == "s".charCodeAt(0)) {z
        game.snake.direction = [0, 1];
    }
    else if (key == "d".charCodeAt(0)) {
        game.snake.direction = [1, 0];
    }
}

//Setting up Game Tick
function tick() {
    game.snake.updatePosition();
    clearBoard();
    drawSnake();
    drawApple();
    document.getElementById("test").innerHTML = game.snake.position;
    //document.getElementById("test").innerHTML = "Score: " + snake.score;
}

function clearBoard() {
    var cells = document.getElementsByClassName("SnakeCell");

    for (let rows = 0; rows < 12; rows++) {
        for (let cells = 0; cells < 30; cells++) {
            document.getElementById(rows + " - " + cells).style.backgroundColor = "white";
        }
    }

    
}

function drawSnake() {
    document.getElementById(game.snake.x + " - " + game.snake.y).style.backgroundColor = "green";
}

function drawApple() {
    document.getElementById(game.apple.x + " - " + game.apple.y).style.backgroundColor = "red";
}

setInterval(tick, 100);







