let balance = 0;
let currency = 'KZT';

function openTerminal() {
    const terminal = document.getElementById('terminal');
    terminal.style.display = 'block';
    const openButton = document.querySelector('.open-terminal-button');
    openButton.style.display = 'none';
}

function closeTerminal() {
    const terminal = document.getElementById('terminal');
    terminal.style.display = 'none';
    const openButton = document.querySelector('.open-terminal-button');
    openButton.style.display = 'block';
}

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount)) {
        balance += amount;
        updateBalance();
        addToOutput(`Пополнено: ${amount} ${currency}`);
    } else {
        addToOutput('Неверный ввод, введите корректное число.');
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount)) {
        if (balance >= amount) {
            balance -= amount;
            updateBalance();
            addToOutput(`Снято: ${amount} ${currency}`);
        } else {
            addToOutput('Недостаточно средств.');
        }
    } else {
        addToOutput('Неверный ввод, введите корректное число.');
    }
}

function checkBalance() {
    addToOutput(`Ваш баланс: ${balance} ${currency}`);
}

function convertCurrency(targetCurrency) {
    const conversionRates = {
        'USD': 0.0023, 
        'RUB': 0.17,   
        'UAH': 0.06,   
        'KZT': 1
    };

    if (conversionRates.hasOwnProperty(targetCurrency)) {
        const rate = conversionRates[targetCurrency];
        const convertedBalance = (balance / conversionRates[currency]) * rate;
        addToOutput(`Конвертировано в ${targetCurrency}: ${convertedBalance}`);
        currency = targetCurrency;
        updateBalance();
    } else {
        addToOutput('Неверная валюта.');
    }
}

function playFreeGame() {
    const modal = document.getElementById('freeGameModal');
    modal.style.display = 'block';
}

function updateBalance() {
    const balanceSpan = document.getElementById('balance');
    balanceSpan.textContent = balance;
}

function addToOutput(message) {
    const output = document.getElementById('output');
    output.innerHTML += message + '<br>';
}

function clearInput() {
    const inputField = document.getElementById('amount');
    inputField.value = '';
}