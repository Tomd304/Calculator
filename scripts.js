let display = ''
let displayHistory = ''
let previousNumber = 0
let operator = ''
let currentNumber = ''
let answer = 0;
let displayText = document.querySelector('.display-text')
let displayHistoryText = document.querySelector('.display-history')

buttons = document.querySelectorAll('button')

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        input(btn.innerText)
        if (btn.innerText == '=') {
            displayText.innerText = Math.round(answer*100)/100
        }
        else if (btn.innerText == 'C') {
            displayText.innerText = '0'
        }
        else {
            display += btn.innerText
            displayText.innerText = display
        }
        displayHistoryText.innerText = displayHistory
        //display += btn.target.
    });
});

function input(key) {
    switch (true) {
        case key >= 0 && key <= 9:
            currentNumber += key
            console.log('number pressed')
            console.log(currentNumber)
            break;
        case key == '+':
        case key == '-':
        case key == '/':
        case key == '*':  
            if (operator == '') {
                previousNumber = currentNumber
                currentNumber = ''                
                operator = key
            }
            else {
                answer = compute()
                previousNumber = answer
                currentNumber = ''
                operator = key
                displayHistory = display
                display = answer
            }
            break;
        case key == '=':
            answer = compute()    
            displayHistory = display
            display = answer
            currentNumber = answer
            operator = ''
            break;
        case key == 'C':
            console.log('clear pressed')
            clear()
            break;
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
	return parseInt(num1) + parseInt(num2);
};

const subtract = function(num1, num2) {
	return parseInt(num1) - parseInt(num2);
};

const multiply = function(num1, num2) {
    return parseInt(num1)* parseInt(num2)
};

const divide = function(num1, num2) {
    return parseInt(num1) / parseInt(num2)
};

function clear() {
    display = ''
    displayHistory = ''
    number = []
    operator = []
    currentNumber = ''
    answer = 0;
}