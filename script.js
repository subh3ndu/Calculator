class Calculator {
  constructor(prevOperandText, currOperandText) {
    this.prevOperandText = prevOperandText;
    this.currOperandText = currOperandText;
    this.clear();
  }

  clear() {
    this.prevOperand = "";
    this.currOperand = "";
    this.operation = undefined;
  }

  append(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand += number.toString();
  }

  chooseOperation(operator) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") this.calculate();

    this.operation = operator;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  calculate() {
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    let compute =
      this.operation === "+"
        ? prev + curr
        : this.operation === "-"
        ? prev - curr
        : this.operation === "×"
        ? prev * curr
        : this.operation === "÷"
        ? prev / curr
        : "";

    this.prevOperand = "";
    this.currOperand = isNaN(compute) ? "Not a Number" : compute;
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) integerDisplay = "";
    else
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });

    if (decimalDigits != null) return `${integerDisplay}.${decimalDigits}`;
    else return integerDisplay;
  }

  update() {
    this.currOperandText.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operation != null)
      this.prevOperandText.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
    else this.prevOperandText.innerText = "";
  }
}

const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const clear = document.querySelector("[data-clear]");
const del = document.querySelector("[data-delete]");
const equal = document.querySelector("[data-equal]");
const prevOperandText = document.querySelector("[data-prevOperand]");
const currOperandText = document.querySelector("[data-currOperand]");

const calculator = new Calculator(prevOperandText, currOperandText);

numbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.append(btn.innerText);
    calculator.update();
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.update();
  });
});

clear.addEventListener("click", () => {
  calculator.clear();
  calculator.update();
});

equal.addEventListener("click", () => {
  calculator.calculate();
  calculator.update();
});

del.addEventListener("click", () => {
  calculator.delete();
  calculator.update();
});
