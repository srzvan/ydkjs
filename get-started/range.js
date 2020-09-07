function range(start, end) {
  if (end !== undefined) {
    if (start == end) {
      return [end];
    }

    return generateRange(start, end);
  } else {
    return end => generateRange(start, end);
  }

  function generateRange(s, e) {
    let range = [];

    for (let i = s; i <= e; i++) {
      range.push(i);
    }

    return range;
  }
}

console.log(range(3, 3)); // [3]
console.log(range(3, 8)); // [3,4,5,6,7,8]
console.log(range(3, 0)); // []

var start3 = range(3);
var start4 = range(4);

console.log(start3(3)); // [3]
console.log(start3(8)); // [3,4,5,6,7,8]
console.log(start3(0)); // []

console.log(start4(6)); // [4,5,6]
