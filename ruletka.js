const symbols = ['♠', '♦', '♥', '♣', '7', 'BAR', '🍒', '🔔'];

        function getRandomSymbol() {
            return symbols[Math.floor(Math.random() * symbols.length)];
        }

        function spinRoulette() {
            const slot1 = document.getElementById('slot1');
            const slot2 = document.getElementById('slot2');
            const slot3 = document.getElementById('slot3');
            const resultDiv = document.getElementById('result');
            const spinButton = document.getElementById('spinButton');
            const retryButton = document.getElementById('retryButton');
            const loseImage = document.getElementById('loseImage');

            const symbol1 = getRandomSymbol();
            const symbol2 = getRandomSymbol();
            const symbol3 = getRandomSymbol();

            slot1.textContent = symbol1;
            slot2.textContent = symbol2;
            slot3.textContent = symbol3;

            if (symbol1 === symbol2 && symbol2 === symbol3) {
                resultDiv.textContent = 'Победа!';
                resultDiv.classList.add('win');
                spinButton.style.display = 'none';
                retryButton.style.display = 'block';
                loseImage.style.display = 'none';
            } else {
                resultDiv.textContent = 'Проигрыш';
                resultDiv.classList.remove('win');
                spinButton.style.display = 'none';
                retryButton.style.display = 'block';
                loseImage.style.display = 'block';
            }
        }

        const spinButton = document.getElementById('spinButton');
        spinButton.addEventListener('click', spinRoulette);