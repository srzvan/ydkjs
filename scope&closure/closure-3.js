var calculator = calculator();

function calculator() {
  var input = [];

  return function calc(key) {
    var lastInputValue = input[input.length - 1];

    if (isInvalidInput(key)) {
      return undefined;
    }

    if (isNumber(key)) {
      if (isNumber(lastInputValue)) {
        input.splice(input.length - 1, 1, toNumber(lastInputValue + key));
      } else if (lastInputValue == "=") {
        input.splice(0, input.length, toNumber(key));
      } else {
        input.push(toNumber(key));
      }
    } else if (key == "=") {
      const total = equals();
      input.splice(0, input.length, total, "=");

      return formatTotal(total);
    } else {
      input.push(key);
    }

    return key;
  };

  function equals() {
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

    return total;
  }

  function toNumber(val) {
    return Number.parseInt(val);
  }

  function isNumber(val) {
    return !Object.is(Number.parseInt(val), NaN);
  }

  function isInvalidInput(k) {
    var operations = ["+", "-", "/", "*", "="];

    return (
      (input.length == 0 && !isNumber(k)) || (operations.indexOf(k) == -1 && !isNumber(k)) || Number.parseInt(k) >= 10
    );
  }
}

function useCalc(calc, keys) {
  return [...keys].reduce(function showDisplay(display, key) {
    var ret = String(calc(key));

    return `${display}${ret != "" && key == "=" ? "=" : ""}${ret}`;
  }, "");
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
