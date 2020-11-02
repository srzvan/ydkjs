var isPrime = (function isPrimeWithCache() {
  var cache = {};

  return isPrime;

  /* ***************************** */

  function isPrime(v) {
    if (v in cache) {
      return cache[v];
    }

    if (v <= 3) {
      return (cache[v] = v > 1);
    }

    if (v % 2 == 0 || v % 3 == 0) {
      return (cache[v] = false);
    }

    var vSqrt = Math.sqrt(v);

    for (let i = 5; i <= vSqrt; i += 6) {
      if (v % i == 0 || v % (i + 2) == 0) {
        return (cache[v] = false);
      }
    }

    return (cache[v] = true);
  }
})();

var factorize = (function factorizeWithCache() {
  var cache = {};

  return factorize;

  /* ***************************************** */

  function factorize(v) {
    if (v in cache) {
      return cache[v];
    }

    if (!isPrime(v)) {
      let i = Math.floor(Math.sqrt(v));

      while (v % i != 0) {
        i--;
      }

      return (cache[v] = [...factorize(i), ...factorize(v / i)]);
    }

    return (factors[v] = [v]);
  }
})();
