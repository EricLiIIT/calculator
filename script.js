let last = document.querySelector("#last");
let current = document.querySelector("#current");
let allBtn = document.querySelectorAll("button");
let computeBtn = document.getElementById("equals");
let clearBtn = document.querySelector("#clear");
let deleteBtn = document.querySelector("#delete");
let decimal = document.querySelector("#decimal");
let percent = document.querySelector("#percent");

let num1 = "";
let num2 = "";
let nextOperand = "";
let operator = "";
let result = "";
let expression = [num1, operator, num2, result];

deleteBtn.addEventListener("click", () => {
  if (last.textContent.slice(-1) != "=") {
    let editedExpression = last.textContent.slice(0, -1);
    last.textContent = editedExpression;
    expression[2] = "";
  }
});

decimal.addEventListener("click", () => {
  if (!last.textContent.includes(".")) {
    last.textContent += ".";
    expression[0] += ".";
  }
});

allBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    checkInput(event);
  });
});

clearBtn.addEventListener("click", () => {
  expression = [num1, operator, num2, result];
  last.textContent = "";
  current.textContent = "";
});

computeBtn.addEventListener("click", () => {
  if (
    !isNaN(parseFloat(expression[0])) &&
    expression[1] &&
    !isNaN(parseFloat(expression[2]))
  ) {
    let result = operate(...expression);
    last.textContent += "=";
    current.textContent = result;
    expression = [result, operator, num2, result];
  }
});

function checkInput(event) {
  let input = event.target.textContent;
  let inputIsOperator = isNaN(parseFloat(event.target.textContent));

  if (
    input == "Clear" ||
    input == "=" ||
    input == "Del" ||
    input == "%" ||
    input == "."
  ) {
    return;
  }

  // prevent adding operators after you have a full expression
  if (expression[0] && expression[1] && expression[2] && inputIsOperator) {
    return;
  }

  // prevent stringing numbers after immediately after evaluating
  if (last.textContent.slice(-1) == "=" && !inputIsOperator) return;

  // prevent entering operator first
  if (expression[0].length <= 0 && inputIsOperator) return;

  // if there is a result from the previous op use that as operand 1
  if (inputIsOperator && expression[3]) {
    last.textContent = "";
    last.textContent += expression[3];
  } else if ((!expression[0] || expression[0].length >= 1) && !expression[1]) {
    if (!inputIsOperator) {
      expression[0] += input;
    }
  }

  // if there is no operator and the input is an operator
  if (!expression[1] && inputIsOperator) {
    expression[1] = input; // set operator
    if (!isNaN(parseFloat(expression[3])) && inputIsOperator) {
      last.textContent = "";
      last.textContent += expression[3];
      last.textContent += input;
      return;
    }
  }

  // if there is no second operand, there is an operator, and input is operator
  if (!expression[2] && expression[1] && inputIsOperator) {
    expression[1] = input; // change operator
    last.textContent += input;
    return;
  }

  // if there is first operand and operator, add second operand
  if (!isNaN(parseFloat(expression[0])) && expression[1] && !inputIsOperator) {
    if (input == "0" && expression[1] == "/") {
      alert("You can't divide by zero!");
      return;
    }
    // set second operand
    if (!expression[2] || expression[2].length >= 1) {
      // allows to enter multi digits
      expression[2] += input;
    }
  }
  last.textContent += input;
}

function add(firstNum, secondNum) {
  let sum = parseFloat(firstNum) + parseFloat(secondNum);
  return sum;
}

function subtract(firstNum, secondNum) {
  let difference = parseFloat(firstNum) - parseFloat(secondNum);
  return difference;
}

function multiply(firstNum, secondNum) {
  let product = parseFloat(firstNum) * parseFloat(secondNum);
  return product;
}

function divide(firstNum, secondNum) {
  if (secondNum == 0) return;
  let quotient = parseFloat(firstNum) / parseFloat(secondNum);
  return quotient;
}

function operate(num1, operator, num2) {
  if (operator == "+") return add(num1, num2);
  if (operator == "-") return subtract(num1, num2);
  if (operator == "x") return multiply(num1, num2);
  if (operator == "/") return divide(num1, num2);
}
