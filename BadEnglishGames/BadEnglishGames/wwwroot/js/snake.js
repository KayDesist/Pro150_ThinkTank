//Creating snake class
class Snake {
    x = 0;
    y = 0;

    position = [];
    direction = [0, 0];
    body = [[0, 0]]; 
    score = 0;

    updatePosition() {

        this.x += this.direction[0];
        this.y += this.direction[1];
        this.position = [this.x, this.y];

        // Check collision with walls or itself (Game Over)
        if (this.x < 0 || this.x >= 12 || this.y < 0 || this.y >= 30 || this.checkCollision()) {
            alert("Game Over! Score: " + this.score);
            location.reload(); // Reload to restart game
            return;
        }

        // Check if apple is eaten
        if (this.x === apple.x && this.y === apple.y) {
            this.score++;
            spawnApple();
            this.body.push([this.body[this.body.length - 1]]); // Grow the snake
        }

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
        this.spawn();
    }

    spawn() {
        this.x = Math.floor(Math.random() * 12);
        this.y = Math.floor(Math.random() * 30);
    }
}

var snake = new Snake(1, 7);
var apple = new Apple();

//Getting User Input
document.onkeypress = (e) => {
    let key = e.keyCode;

    if (key == "w".charCodeAt(0)) {
        snake.direction = [0, -1];
    }
    else if (key == "a".charCodeAt(0)) {
        snake.direction[0] = -1;
        snake.direction = [-1, 0];
    }
    else if (key == "s".charCodeAt(0)) {
        snake.direction = [0, 1];
    }
    else if (key == "d".charCodeAt(0)) {
        snake.direction = [1, 0];
    }
}

//Setting up Game Tick
function tick() {
    snake.updatePosition();
    clearBoard();
    drawSnake();
    drawApple();
    document.getElementById("test").innerHTML = snake.position;
    document.getElementById("test").innerHTML = "Score: " + snake.score;
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
    document.getElementById(snake.x + " - " + snake.y).style.backgroundColor = "green";
}

function drawApple() {
    document.getElementById(apple.x + " - " + apple.y).style.backgroundColor = "red";
}

function spawnApple() {
    apple.spawn();
}

setInterval(tick, 100);







