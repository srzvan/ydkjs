function toggle() {
  var currentIndex = 0;

  function t() {
    if (arguments.length == 0) {
      return undefined;
    }

    return arguments[currentIndex++ % arguments.length];
  }

  return t.bind(null, ...arguments);
}

var hello = toggle("hello");
var onOff = toggle("on", "off");
var speed = toggle("slow", "medium", "fast");
var empty = toggle();
