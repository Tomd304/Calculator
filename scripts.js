let display = ''
let displayHistory = ''
let previousNumber = ''
let operator = ''
let currentNumber = ''
let answer = 0;
let displayText = document.querySelector('.display-text')
let displayHistoryText = document.querySelector('.display-history')

buttons = document.querySelectorAll('button')

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!statementExists() && btn.innerText == '=') {
            return;
        }
        else if (isDecimal(previousNumber) && btn.innerText == '.') {
            return;
        }
        else {
            input(btn.innerText)
            if (btn.innerText == '=') {
                displayText.innerText = answer
            }
            else if (btn.innerText == 'Reset') {
                displayText.innerText = '0'
            }
            else {
                display += btn.innerText
                displayText.innerText = display
            }
            displayHistoryText.innerText = displayHistory            
        }
        
        //display += btn.target.
    });
});

function input(key) {
    switch (true) {
        case key >= 0 && key <= 9 || key == '.':
            if (operator == '') {
                previousNumber += key
                console.log(previousNumber)
            }
            else {
                currentNumber += key
                console.log(currentNumber)
            }
            console.log('number pressed')

            break;
        case key == '+':
        case key == '-':
        case key == '/':
        case key == '*':  
            if (operator == '' || operator == '=') {
                operator = key
            }
            else {
                answer = compute()
                previousNumber = answer
                currentNumber = ''
                operator = key
                displayHistory = display
                display = answer
                splitDisplay()
            }
            break;
        case key == '=':
            answer = compute()    
            displayHistory = display
            display = answer
            previousNumber = answer
            currentNumber = ''
            operator = '='
            break;
        case key == 'Reset':
            console.log('clear pressed')
            clear()
            break;
        case key =='Delete':
    }
}

function compute() {
    switch (operator) {
        case '+':
            return add(previousNumber, currentNumber)
        case '-':
            return subtract(previousNumber, currentNumber)
        case '/':
            return divide(previousNumber, currentNumber)
        case '*':
            return multiply(previousNumber, currentNumber)
    }
}

const add = function(num1, num2) {
    return Math.round((parseFloat(num1) + parseFloat(num2)) * 100000) / 100000
};

const subtract = function(num1, num2) {
    return Math.round((parseFloat(num1) - parseFloat(num2)) * 100000) / 100000
};

const multiply = function(num1, num2) {
    return Math.round(parseFloat(num1) * parseFloat(num2) * 100000) / 100000
};

const divide = function(num1, num2) {
    if (num2 == 0) {
        return '0';
    }
    return Math.round(parseFloat(num1) / parseFloat(num2) * 100000) / 100000
};

function statementExists() {
    return currentNumber == '' ? false : previousNumber == '' ? false : operator == '' ? false : true;
}
function clear() {
    display = ''
    displayHistory = ''
    previousNumber = ''
    operator = ''
    currentNumber = ''
    answer = 0;
}

function isDecimal(number) {
    return (number % 1)
}

