
// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () { 

    // Initial card values and storing
    let cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let flippedCards = [];
    let matchedCards = [];
    let level = 1;
    let timer;
    let timeLeft = 30;

    // Shuffle function using Fisher-Yates algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create the game board
    function createBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = ''; // Clear the board
        const shuffledCards = shuffle(cards);
        gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(cards.length)}, 100px)`;

        shuffledCards.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <div class="front">${card}</div>
                <div class="back"></div>
            `;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    // Flip card function
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    // Check for match function
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const value1 = card1.querySelector('.front').textContent;
        const value2 = card2.querySelector('.front').textContent;

        if (value1 === value2) {
            matchedCards.push(card1, card2);
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);

            if (matchedCards.length === cards.length) {
                clearInterval(timer);
                alert('Congratulations! You won! Moving to the next level...');
                level++;
                cards = cards.concat(['I', 'I', 'J', 'J', 'K', 'K', 'L', 'L']);
                startGame();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }

        flippedCards = [];
    }

    // Timer function
    function updateTimer() {
        const timerDisplay = document.getElementById('HighScoreContainer');
        timerDisplay.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! You lose!');
            resetGame();
        } else {
            timeLeft--;
        }
    }

    // Start the game
    function startGame() {
        matchedCards = [];
        flippedCards = [];
        timeLeft = 30;
        createBoard();
        timer = setInterval(updateTimer, 1000);
    }

    // Reset the game
    function resetGame() {
        clearInterval(timer);
        level = 1;
        cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
        startGame();
    }

    // Initialize the game
    startGame();
});