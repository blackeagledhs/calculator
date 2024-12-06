let currentInput = "0";
let previousInput = null;
let operator = null;

// Elements
const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

// Event Listener
buttons.addEventListener('click', (e) => {
    const button = e.target;
    if (!button.matches('button')) return;

    const type = button.classList[0];
    const value = button.textContent;

    switch (type) {
        case 'digit':
            handleDigit(value);
            break;
        case 'operator':
            handleOperator(value);
            break;
        case 'equals':
            calculate();
            break;
        case 'clear':
            clearCalculator();
            break;
        case 'backspace':
            handleBackspace();
            break;
        case 'decimal':
            handleDecimal();
            break;
    }
    updateDisplay();
});

function handleDigit(value) {
    // If the current display is "0", replace it with the new digit
    if (currentInput === "0" && value !== ".") {
        currentInput = value;
    } else {
        currentInput += value;
    }
}

function handleOperator(value) {
    if (previousInput !== null && operator !== null) {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = "0";  // Allow the user to input the next number
}

function calculate() {
    if (previousInput === null || operator === null) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (operator === "/" && num2 === 0) {
        currentInput = "Error";
        previousInput = null;
        operator = null;
        return;
    }

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
            currentInput = (num1 / num2).toString();
            break;
    }

    operator = null;
    previousInput = null;
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1) || "0";
}

function clearCalculator() {
    currentInput = "0";
    previousInput = null;
    operator = null;
}

function updateDisplay() {
    display.textContent = currentInput;
}
