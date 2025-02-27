//Creating snake class
class Snake {
    x = 0;
    y = 0;

    position = [];
    direction = [0, 0];

    updatePosition() {

        this.x += this.direction[0];
        this.y += this.direction[1];
        this.position = [this.x, this.y];
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Food {
    foodX = 0;
    foodY = 0;
    position = [];
    isEatten = false;


}

var snake = new Snake(1, 7);

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

//Setting up Game Tick
function tick() {
    snake.updatePosition();
    clearBoard();
    drawSnake();
    document.getElementById("test").innerHTML = snake.position;
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

setInterval(tick, 100);







