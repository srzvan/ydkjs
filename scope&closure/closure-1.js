var isPrime = (function isPrimeWithCache() {
  var cache = {};

  function isPrime(v) {
    if (v <= 3) {
      return v > 1;
    }

    if (v % 2 == 0 || v % 3 == 0) {
      return false;
    }

    var vSqrt = Math.sqrt(v);

    for (let i = 5; i <= vSqrt; i += 6) {
      if (!(v in cache)) {
        if (v % i == 0 || v % (i + 2) == 0) {
          cache[v] = false;
          break;
        }
      }
    }

    if (!(v in cache)) {
      cache[v] = true;
    }

    return cache[v];
  }

  return isPrime;
})();

var factorize = function factorizeWithCache() {
  var cache = {};

  function factorize(v) {
    if (!isPrime(v)) {
      let i = Math.floor(Math.sqrt(v));

      while (v % i != 0) {
        i--;
      }

      if (v in cache) {
        return cache[v];
      }

      cache[v] = [...factorize(i), ...factorize(v / i)];

      return cache[v];
    }

    return [v];
  }

  return factorize;
};
