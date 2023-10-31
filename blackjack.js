 const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        let deck = [];
        let playerHand = [];
        let dealerHand = [];
        let playerScore = 0;
        let dealerScore = 0;
        let gameOver = false;

        const messageElement = document.getElementById('message');
        const startButton = document.getElementById('startButton');
        const hitButton = document.getElementById('hitButton');
        const standButton = document.getElementById('standButton');
        const restartButton = document.getElementById('restartButton');
        const playerHandElement = document.getElementById('playerHand');
        const dealerHandElement = document.getElementById('dealerHand');

        startButton.addEventListener('click', startGame);
        hitButton.addEventListener('click', hit);
        standButton.addEventListener('click', stand);
        restartButton.addEventListener('click', restartGame);

        function startGame() {
            startButton.style.display = 'none';
            hitButton.style.display = 'inline';
            standButton.style.display = 'inline';
            playerHand = [];
            dealerHand = [];
            playerScore = 0;
            dealerScore = 0;
            gameOver = false;
            playerHandElement.innerHTML = 'Ваши карты: ';
            dealerHandElement.innerHTML = 'Карты дилера: ';
            messageElement.textContent = '';
            buildDeck();
            shuffleDeck();
            dealInitialCards();
            updateScores();
        }

        function buildDeck() {
            for (const suit of suits) {
                for (const value of values) {
                    deck.push({ suit, value });
                }
            }
        }

        function shuffleDeck() {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }

        function dealInitialCards() {
            playerHand.push(deck.pop());
            dealerHand.push(deck.pop());
            playerHand.push(deck.pop());
            dealerHand.push(deck.pop());
        }

        function updateScores() {
            playerScore = calculateScore(playerHand);
            dealerScore = calculateScore(dealerHand);
            playerHandElement.innerHTML = 'Ваши карты: ' + playerHand.map(card => getCardHTML(card)).join('');
            dealerHandElement.innerHTML = 'Карты дилера: ' + getCardHTML(dealerHand[0]) + ' **скрыта**';
        }

        function calculateScore(hand) {
            let score = 0;
            let hasAce = false;
            for (const card of hand) {
                if (card.value === 'A') {
                    hasAce = true;
                }
                if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
                    score += 10;
                } else {
                    score += parseInt(card.value);
                }
            }
            if (hasAce && score + 10 <= 21) {
                score += 10;
            }
            return score;
        }

        function getCardHTML(card) {
            return `<img class="card" src="images/${card.value}_of_${card.suit}.png" alt="${card.value} of ${card.suit}">`;

        }

        function hit() {
            if (!gameOver) {
                playerHand.push(deck.pop());
                updateScores();
                if (playerScore > 21) {
                    gameOver = true;
                    messageElement.textContent = 'Вы проиграли!';
                    showRestartButton();
                }
            }
        }

        function stand() {
            if (!gameOver) {
                while (dealerScore < 17) {
                    dealerHand.push(deck.pop());
                    updateScores();
                }
                gameOver = true;
                if (dealerScore > 21 || dealerScore < playerScore) {
                    messageElement.textContent = 'Вы выиграли!';
                } else if (dealerScore > playerScore) {
                    messageElement.textContent = 'Вы проиграли!';
                } else {
                    messageElement.textContent = 'Ничья!';
                }
                showRestartButton();
            }
        }

        function showRestartButton() {
            restartButton.style.display = 'inline';
        }

        function restartGame() {
            startButton.style.display = 'inline';
            hitButton.style.display = 'none';
            standButton.style.display = 'none';
            restartButton.style.display = 'none';
            playerHandElement.innerHTML = 'Ваши карты: ';
            dealerHandElement.innerHTML = 'Карты дилера: ';
            messageElement.textContent = 'Добро пожаловать в Блэкджек!';
            deck = [];
        }