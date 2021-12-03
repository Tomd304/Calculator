let display = ''
let displayHistory = ''
let leftNumber = ''
let operator = ''
let rightNumber = ''
let answer = 0;
let displayText = document.querySelector('.display-text')
let displayHistoryText = document.querySelector('.display-history')
let equationArr = [ , , ,]

buttons = document.querySelectorAll('button')

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (operator != '' && isOperator(btn.innerText)) {
            splitDisplay(display)
            if (rightNumber == '') {
                operator = btn.innerText
                display = display.slice(0, display.length - 1) + btn.innerText
                updateDisplayText(display)
            }
            else {
                saveHistory()
                updateHistoryText()
                display = String(compute())
                operator = ''
                updateDisplayText(display) 
            }
            
        }
        if (btn.innerText != '=' && btn.innerText != 'Delete') {
            if (rightNumber == '' && isOperator(btn.innerText) && operator != '') {    
            }
            else {
                display += btn.innerText
                updateDisplayText(display)
            }
            }
        if (btn.innerText == 'Reset') {
            clear()
            updateHistoryText()
            updateDisplayText('0')
        }
        if (btn.innerText == 'Delete') {
            if (display.length <= 1) {
                display = ''
                updateDisplayText('0');
                return
            }
            else {
                if (isOperator(display.slice(display.length - 1, display.length))) {
                    operator = ''
                }
                display = display.slice(0, display.length - 1)
                updateDisplayText(display)
            }
        }

        splitDisplay(display)

        //display += btn.target.
    });
});

function saveHistory() {
    displayHistory = display
}

function updateHistoryText() {
    displayHistoryText.innerText = displayHistory
}

function updateDisplayText(str) {
    displayText.innerText = str    
}

function compute() {
    switch (operator) {
        case '+':
            return add(leftNumber, rightNumber)
        case '-':
            return subtract(leftNumber, rightNumber)
        case '/':
            return divide(leftNumber, rightNumber)
        case '*':
            return multiply(leftNumber, rightNumber)
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
    leftNumber = ''
    operator = ''
    rightNumber = ''
    answer = 0;
}

function isDecimal(number) {
    return (number % 1)
}

function isOperator(key) {
    switch (key) {
        case '*':
        case '/':
        case '+':
        case '-':
        case '=':
            return true;
    }
    return false;
}

function splitDisplay(equation) {
    leftNumber = ''
    rightNumber = ''
    switch (true) {
        case equation.includes('*'):
            equationArr = equation.split('*')
            operator = '*'
            break;
        case equation.includes('/'):
            equationArr = equation.split('/')
            operator = '/'
            break;
        case equation.includes('+'):
            equationArr = equation.split('+')
            operator = '+'
            break;            
        case equation.includes('-'):
            equationArr = equation.split('-')
            operator = '-'
            break;
    }
    leftNumber = equationArr[0]
    rightNumber = equationArr[1]
}