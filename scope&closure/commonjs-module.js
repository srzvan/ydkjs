module.exports.publicAPI = publicAPI;

var input = [];
var publicAPI = {
  number,
  plus,
  minus,
  mult,
  div,
  eq,
};

function number(n) {
  var lastInputValue = input[input.length - 1];

  if (!isNumber(n) || Number.parseInt(n) >= 10) {
    return undefined;
  }

  if (isNumber(lastInputValue)) {
    input.splice(input.length - 1, 1, toNumber(lastInputValue + n));
  } else if (lastInputValue == "=") {
    input.splice(0, input.length, toNumber(n));
  } else {
    input.push(toNumber(n));
  }

  return n;
}

function plus() {
  if (isInputEmpty()) {
    return undefined;
  }

  input.push("+");

  return "+";
}

function minus() {
  if (isInputEmpty()) {
    return undefined;
  }

  input.push("-");

  return "-";
}

function mult() {
  if (isInputEmpty()) {
    return undefined;
  }

  input.push("*");

  return "*";
}

function div() {
  if (isInputEmpty()) {
    return undefined;
  }

  input.push("/");

  return "/";
}

function eq() {
  var total = 0;
  var currentOperation = "";

  for (let val of input) {
    if (isNumber(val)) {
      if (currentOperation) {
        switch (currentOperation) {
          case "+":
            total += val;
            break;
          case "-":
            total -= val;
            break;
          case "*":
            total *= val;
            break;
          case "/":
            total /= val;
            break;
          default:
            break;
        }

        continue;
      }

      total += val;
    } else {
      currentOperation = val;
    }
  }

  input.splice(0, input.length, total, "=");

  return formatTotal(total);
}

function formatTotal(display) {
  if (Number.isFinite(display)) {
    // constrain display to max 11 chars
    let maxDigits = 11;
    // reserve space for "e+" notation?
    if (Math.abs(display) > 99999999999) {
      maxDigits -= 6;
    }

    // reserve space for "-"?
    if (display < 0) {
      maxDigits--;
    }

    // whole number?
    if (Number.isInteger(display)) {
      display = display.toPrecision(maxDigits).replace(/\.0+$/, "");
    }
    // decimal
    else {
      // reserve space for "."
      maxDigits--;
      // reserve space for leading "0"?
      if (Math.abs(display) >= 0 && Math.abs(display) < 1) {
        maxDigits--;
      }

      display = display.toPrecision(maxDigits).replace(/0+$/, "");
    }
  } else {
    display = "ERR";
  }

  return display;
}

function toNumber(val) {
  return Number.parseInt(val);
}

function isNumber(val) {
  return !Object.is(Number.parseInt(val), NaN);
}

function isInputEmpty() {
  return input.length == 0;
}
