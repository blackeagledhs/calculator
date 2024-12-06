let currentInput = "0";
let previousInput = null;
let operator = null;

// Select display and buttons
const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName !== 'BUTTON') return;

    const buttonType = target.classList[0];
    const buttonValue = target.textContent;

    if (buttonType === 'digit') {
        handleDigit(buttonValue);
    } else if (buttonType === 'operator') {
        handleOperator(buttonValue);
    } else if (buttonType === 'equals') {
        calculate();
    } else if (buttonType === 'clear') {
        clearCalculator();
    } else if (buttonType === 'backspace') {
        handleBackspace();
    } else if (buttonType === 'decimal') {
        handleDecimal();
    }

    updateDisplay();
});

function handleDigit(value) {
    currentInput = currentInput === "0" ? value : currentInput + value;
}

function handleOperator(value) {
    if (previousInput !== null && operator !== null) {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = "0";
}

function calculate() {
    if (previousInput === null || operator === null) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '/':
            currentInput = num2 === 0 ? "Error" : (num1 / num2).toString();
            break;
    }

    operator = null;
    previousInput = null;
}

function handleBackspace() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function clearCalculator() {
    currentInput = "0";
    previousInput = null;
    operator = null;
}

function updateDisplay() {
    display.textContent = currentInput;
}
