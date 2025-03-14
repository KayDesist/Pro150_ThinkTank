// Board Class
class Board {
    constructor() {
        this.boardWidth = 500;
        this.boardHeight = 500;
        this.context = null;
    }

    initialize(boardElement) {
        this.context = boardElement.getContext("2d");
        boardElement.height = this.boardHeight;
        boardElement.width = this.boardWidth;
    }
}

// Player Class
class Player {
    constructor() {
        this.width = 250;
        this.height = 10;
        this.velocityX = 60;
        this.x = 0;
        this.y = 0;
    }

    initialize(boardWidth, boardHeight) {
        this.x = boardWidth / 2 - this.width / 2;
        this.y = boardHeight - this.height - 5;
    }
}

// Ball Class
class Ball {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.velocityX = 1 ;
        this.velocityY = 1;
        this.x = 0;
        this.y = 0;
    }

    initialize(boardWidth, boardHeight) {
        this.x = boardWidth / 2;
        this.y = boardHeight / 2;
    }
}

// Block Class
class Block {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.break = false;
    }
}

// Game Class
class Game {
    constructor() {
        this.board = new Board();
        this.player = new Player();
        this.ball = new Ball();
        this.blockArray = [];
        this.blockWidth = 50;
        this.blockHeight = 10;
        this.blockColumns = 8;
        this.blockRows = 10;
        this.blockMaxRows = 10;
        this.blockCount = 0;
        this.blockX = 15;
        this.blockY = 45;
        this.score = 0;
        this.gameOver = false;
    }

    initialize(boardElement) {
        this.board.initialize(boardElement);
        this.player.initialize(this.board.boardWidth, this.board.boardHeight);
        this.ball.initialize(this.board.boardWidth, this.board.boardHeight);

        // Initialize blocks
        this.createBlocks();

        // Add Event Listener
        document.addEventListener("keydown", this.movePlayer.bind(this));

        // Start the game loop
        requestAnimationFrame(this.update.bind(this));
    }

    update() {
        requestAnimationFrame(this.update.bind(this));
        if (this.gameOver) return;

        this.board.context.clearRect(0, 0, this.board.boardWidth, this.board.boardHeight);

        // Draw player
        this.board.context.fillStyle = "lightgreen";
        this.board.context.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        // Draw ball
        this.board.context.fillStyle = "white";
        this.ball.x += this.ball.velocityX;
        this.ball.y += this.ball.velocityY;
        this.board.context.fillRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height);

        // Handle collisions
        this.handleBallCollisions();

        // Handle block collisions
        this.handleBlockCollisions();

        // Check for game over
        this.checkGameOver();

        // Draw score
        this.board.context.font = "20px sans-serif";
        this.board.context.fillText(this.score, 10, 25);
    }

    handleBallCollisions() {
        if (this.topCollision(this.ball, this.player) || this.bottomCollision(this.ball, this.player)) {
            this.ball.velocityY *= -1;
        } else if (this.leftCollision(this.ball, this.player) || this.rightCollision(this.ball, this.player)) {
            this.ball.velocityX *= -1;
        }

        if (this.ball.y <= 0) {
            this.ball.velocityY *= -1;
        } else if (this.ball.x <= 0 || (this.ball.x + this.ball.width >= this.board.boardWidth)) {
            this.ball.velocityX *= -1;
        }
    }

    handleBlockCollisions() {
        for (let i = 0; i < this.blockArray.length; i++) {
            let block = this.blockArray[i];
            if (!block.break) {
                if (this.topCollision(this.ball, block) || this.bottomCollision(this.ball, block)) {
                    block.break = true;
                    this.ball.velocityY *= -1;
                    this.score += 100;
                    this.blockCount -= 1;
                } else if (this.leftCollision(this.ball, block) || this.rightCollision(this.ball, block)) {
                    block.break = true;
                    this.ball.velocityX *= -1;
                    this.score += 100;
                    this.blockCount -= 1;
                }
                this.board.context.fillStyle = "skyblue";
                this.board.context.fillRect(block.x, block.y, block.width, block.height);
            }
        }

        if (this.blockCount === 0) {
            this.score += 100 * this.blockRows * this.blockColumns;
            this.blockRows = Math.min(this.blockRows + 1, this.blockMaxRows);
            this.createBlocks();
        }
    }

    checkGameOver() {
        if (this.ball.y + this.ball.height >= this.board.boardHeight) {
            this.board.context.font = "20px sans-serif";
            this.board.context.fillText("Game Over: Press 'Space' to Restart", 80, 400);
            this.gameOver = true;
        }
    }

    movePlayer(e) {
        
        if (this.gameOver) {
            if (e.code === "Space") {
                this.resetGame();
            }
            return;
        }
        if (e.code === "ArrowLeft") {
           
            let nextPlayerX = this.player.x - this.player.velocityX;
            if (!this.outOfBounds(nextPlayerX)) {
                this.player.x = nextPlayerX;
            }
            
        } else if (e.code === "ArrowRight") {
           
            let nextPlayerX = this.player.x + this.player.velocityX;
            if (!this.outOfBounds(nextPlayerX)) this.player.x = nextPlayerX;

        }
    }

    outOfBounds(xPosition) {

        return (xPosition < 0 || xPosition + this.player.width > this.board.boardWidth);
    }
    


    detectCollision(a, b) {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    topCollision(ball, block) {
        return this.detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
    }

    bottomCollision(ball, block) {
        return this.detectCollision(ball, block) && (block.y + block.height) >= ball.y;
    }

    leftCollision(ball, block) {
        return this.detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
    }

    rightCollision(ball, block) {
        return this.detectCollision(ball, block) && (block.x + block.width) >= ball.x;
    }

    createBlocks() {
        this.blockArray = [];
        for (let c = 0; c < this.blockColumns; c++) {
            for (let r = 0; r < this.blockRows; r++) {
                let block = new Block(
                    this.blockX + c * this.blockWidth + c * 10,
                    this.blockY + r * this.blockHeight + r * 10,
                    this.blockWidth,
                    this.blockHeight
                );
                this.blockArray.push(block);
            }
        }
        this.blockCount = this.blockArray.length;
    }

    resetGame() {
        this.gameOver = false;
        this.player.initialize(this.board.boardWidth, this.board.boardHeight);
        this.ball.initialize(this.board.boardWidth, this.board.boardHeight);
        this.blockArray = [];
        this.blockRows = 3;
        this.score = 0;
        this.createBlocks();
    }
}

window.onload = function () {
    const boardElement = document.getElementById("board");
    const game = new Game();
    game.initialize(boardElement);
}
