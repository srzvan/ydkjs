function toggle(...args) {
  var currentIndex = 0;

  return next;

  /* **************************************** */

  function next() {
    if (args.length == 0) {
      return undefined;
    }

    return args[currentIndex++ % args.length];
  }
}

var hello = toggle("hello");
var onOff = toggle("on", "off");
var speed = toggle("slow", "medium", "fast");
var empty = toggle();
