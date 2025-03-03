class MemoryMatchGame {
    constructor() {
        this.cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
        this.flippedCards = [];
        this.matchedCards = [];
        this.level = 1;
        this.timer = null;
        this.timeLeft = 100;
        this.gameBoard = document.getElementById('game-board');
        this.timerDisplay = document.getElementById('HighScoreContainer');
        this.init();
    }

    // Initialize the game
    init() {
        this.startGame();
    }

    // Shuffle function using Fisher-Yates algorithm
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create the game board
    createBoard() {
        this.gameBoard.innerHTML = ''; // Clear the board
        const shuffledCards = this.shuffle(this.cards);
        this.gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(this.cards.length)}, 100px)`;

        shuffledCards.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <div class="front">${card}</div>
                <div class="back"></div>
            `;
            cardElement.addEventListener('click', () => this.flipCard(cardElement));
            this.gameBoard.appendChild(cardElement);
        });
    }

    // Flip card function
    flipCard(cardElement) {
        if (this.flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
            cardElement.classList.add('flipped');
            this.flippedCards.push(cardElement);

            if (this.flippedCards.length === 2) {
                setTimeout(() => this.checkForMatch(), 500); // Reduced delay for faster feedback
            }
        }
    }

    // Check for match function
    checkForMatch() {
        const [card1, card2] = this.flippedCards;
        const value1 = card1.querySelector('.front').textContent;
        const value2 = card2.querySelector('.front').textContent;

        if (value1 === value2) {
            this.matchedCards.push(card1, card2);
            card1.removeEventListener('click', () => this.flipCard(card1));
            card2.removeEventListener('click', () => this.flipCard(card2));

            if (this.matchedCards.length === this.cards.length) {
                clearInterval(this.timer);
                alert('Congratulations! You won! Moving to the next level...');
                this.level++;
                this.cards = this.cards.concat(['I', 'I', 'J', 'J', 'K', 'K', 'L', 'L']);
                this.startGame();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 500); // Reduced delay for faster flip-back
        }

        this.flippedCards = [];
    }

    // Timer function
    updateTimer() {
        this.timerDisplay.textContent = `Time Left: ${this.timeLeft}`;
        if (this.timeLeft <= 0) {
            clearInterval(this.timer);
            alert('Time is up! You lose!');
            this.resetGame();
        } else {
            this.timeLeft--;
        }
    }

    // Start the game
    startGame() {
        this.matchedCards = [];
        this.flippedCards = [];
        this.timeLeft = 100;
        this.createBoard();
        this.timer = setInterval(() => this.updateTimer(), 1000);
    }

    // Reset the game
    resetGame() {
        clearInterval(this.timer);
        this.level = 1;
        this.cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
        this.startGame();
    }
}

// Wait for the DOM to fully load before initializing the game
document.addEventListener("DOMContentLoaded", () => {
    const game = new MemoryMatchGame();
});