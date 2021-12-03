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
        input(btn.innerText)
        //display += btn.target.
    });
});

document.addEventListener('keydown', logKey);

function logKey(e) {
    switch (true) {
        case e.keyCode >= 97 && e.keyCode <= 105:
        case e.keyCode == 106 || e.keyCode == 107:
        case e.keyCode >= 109 && e.keyCode <= 111:
        case e.keyCode == 61:
            input(e.key)
            break;
        case e.keyCode == 27:
            input('Reset')
            break;
        case e.keyCode == 8:
            input('Delete')
            break;
        case e.keyCode == 13:
            input('=')
            break;
    }
}

function input(key) {
    if (operator != '' && isOperator(key)) {
        splitDisplay(display)
        if (rightNumber == '') {
            operator = key
            display = display.slice(0, display.length - 1) + key
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
    if (key != '=' && key != 'Delete') {
        if (rightNumber == '' && isOperator(key) && operator != '') {    
        }
        else {
            display += key
            updateDisplayText(display)
        }
        }
    if (key == 'Reset') {
        clear()
        updateHistoryText()
        updateDisplayText('0')
    }
    if (key == 'Delete') {
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
}

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