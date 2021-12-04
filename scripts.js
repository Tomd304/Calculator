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
        buttonClicked(btn.innerText)
    });
});

document.addEventListener('keydown', logKey);

function logKey(e) {
    keyPressed(e)
}

function keyPressed(e) {
    switch (true) {
        case e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == '110':
            numberInput(e.key)
            break;
        case e.keyCode == 106 || e.keyCode == 107:
        case e.keyCode >= 109 && e.keyCode <= 111:
        case e.keyCode == 61:
            operatorInput(e.key)
            break;
        case e.keyCode == 13:
            operatorInput('=')
            break;
        case e.keyCode == 27:
            resetInput()
            break;
        case e.keyCode == 8:
            deleteInput()
            break;
    }
    splitDisplay(display);
}

function buttonClicked(btn) {
    switch (true) {
        case btn >= 0 && btn <= 9 || btn == '.':
            numberInput(btn)
            break;
        case btn == '+' || btn == '-' || btn == '*' || btn == '/' || btn == '=':
            operatorInput(btn)
            break;
        case btn == 'Reset':
            resetInput()
            break;
        case btn == 'Delete':
            deleteInput()
            break;
    }
    splitDisplay(display);
}

function numberInput(key) {
    if (displayText.innerText == '0' && key =='0') {
        return
    }
    if (key == '.') {
        if (leftNumber.includes(key) && rightNumber == '') {
            return
        }
        else if (operator != '' && rightNumber.includes(key)) {
            return
        }
    }
    display += key
    updateDisplayText(display)
}

function operatorInput(key) {
    if (displayText.innerText == '0') {
        return
    }
    if (operator != '') {
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
    if (key != '=') {
        if (rightNumber == '' && operator != '') {    
        }
        else {
            display += key
            updateDisplayText(display)
        }
    }
    
}

function resetInput() {
    clear()
    updateHistoryText()
    updateDisplayText('0')
}

function deleteInput() {
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

function clear() {
    display = ''
    displayHistory = ''
    leftNumber = ''
    operator = ''
    rightNumber = ''
    answer = 0;
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
        default:
            leftNumber = display
            return;
    }
    leftNumber = equationArr[0]
    rightNumber = equationArr[1]
}