//memory match js

//TODO
//animations(flip, correct match,shuffle)
//timer
//win/lose condition
//point system
//create incremental level system 



// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
    //card values and storing
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

    let flippedCards = [];
    
    let matchedCards = [];

    //shuffle(Fisher-Yates algorithm(ew i had to study))
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            
            const j = Math.floor(Math.random() * (i + 1));
           
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array; // Return the shuffled array
    }

    
    function createBoard() {
        const gameBoard = document.getElementById('game-board'); 
        const shuffledCards = shuffle(cards); 

        // Loop through the shuffled cards and create a card element for each
        shuffledCards.forEach((card) => {
            const cardElement = document.createElement('div'); // Create a new div for the card
            cardElement.classList.add('card'); 

            // Set the inner HTML of the card (front and back faces)
            cardElement.innerHTML = `
                <div class="front">${card}</div> <!-- Front face shows the card value -->
                <div class="back"></div> <!-- Back face is blank -->
            `;
         
            cardElement.addEventListener('click', flipCard);
            // Append the card to the game board
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
       
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped'); 
            flippedCards.push(this);

            // If two cards are flipped, check for a match after a delay
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000); 
            }
        }
    }


    function checkForMatch() {
        const [card1, card2] = flippedCards; // Destructure the two flipped cards
        const value1 = card1.querySelector('.front').textContent; 
        const value2 = card2.querySelector('.front').textContent; 

        // Check if the values of the two cards match
        if (value1 === value2) {
            
            matchedCards.push(card1, card2);
           
            if (matchedCards.length === cards.length) {
                alert('Congratulations! You won!'); // Show a win message
            }
        } else {
            // If they don't match, flip the cards back
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        // Reset the flippedCards array for the next turn
        flippedCards = [];
    }

    // Call the createBoard function to initialize the game
    createBoard();
});
