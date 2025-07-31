const rightSymbols = ["×", "-", "+", "÷", "="];
const topSysmbols = ["AC", "+/-", "⌫"];

const display = document.getElementById("display");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll("#buttons button");

let A = 0;
let operator = null;
let B = null;
let operationString = "";

function clearAll() {
    A = 0;
    operator = null;
    B = null;
    operationString = "";
    resultDisplay.textContent = "";
}

buttons.forEach(button => {
    const value = button.textContent;

    button.addEventListener("click", function() {
        if (rightSymbols.includes(value)) {
            if (value == "=") {
                if (A != null && operator != null) {
                    B = display.value;
                    operationString = A + " " + operator + " " + B;
                    let numA = Number(A);
                    let numB = Number(B);
                    let result = 0;

                    if (operator == "÷") {
                        result = numA / numB;
                    } else if (operator == "+") {
                        result = numA + numB;
                    } else if (operator == "-") {
                        result = numA - numB;
                    } else if (operator == "×") {
                        result = numA * numB;
                    }

                    display.value = result;
                    resultDisplay.textContent = operationString;


                    A = result;
                    B = null;
                    operator = null;
                }
            } else {
                if (display.value !== "") {
                    operator = value;
                    A = display.value;
                    operationString = A + " " + operator;
                    resultDisplay.textContent = operationString;
                    display.value = "";
                }
            }

        } else if (topSysmbols.includes(value)) {
            if (value == "AC") {
                clearAll();
                display.value = "";
            } else if (value == "+/-") {
                if (display.value != "" && display.value != "0") {
                    display.value = display.value[0] == "-" ? display.value.slice(1) : "-" + display.value;
                }
            } else if (value == "⌫") {
                display.value = display.value.slice(0, -1);
            }

        } else {
            if (value == ".") {
                if (!display.value.includes(".")) {
                    display.value = display.value === "" ? "0." : display.value + ".";
                }
            } else if (value == "%") {
                display.value = Number(display.value) / 100;
            } else {
                display.value = display.value === "0" ? value : display.value + value;
            }
        }
    });
});