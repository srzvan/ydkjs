# Asynchrony: Now & Later
* **never** make synchronous Ajax calls
* situations where browsers decide it is needed to defer console I/O to the background might occur


## Event loop
* up until ES6 (when `Promise`s where introduced) the **hosting environment** was responsible of managing the event loop (the JS engine having an on-demand execution environment role)
* the event loop works similarly to a queue (First-In, First-Out)
* `setTimeout` sets up a timer and when that timer expires, the callback supplied to it gets put in the event loop by the hosting environment
  * if there already are items in the event loop waiting to be executed, the callback has to wait
  * the guarantee (*roughly speaking*) that this function offers is that the callback will not run **BEFORE** the supplied `timeout`
  * *depending on the state of the event queue*, the callback can be executed at or ofter the supplied `timeout`

### Simplified pseudocode
```js
// eventLoop is an array that acts as a queue (first-in, first-out)
var eventLoop = [ ];
var event;

// keep going "forever"
while (true) {
	// perform a "tick"
	if (eventLoop.length > 0) {
		// get the next event in the queue
		event = eventLoop.shift();

		// now, execute the next event
		try {
			event();
		}
		catch (err) {
			reportError(err);
		}
	}
}
```
## Parallel Threading
* async - the gap between *now* & *later*
  * tasks executed in serial, disallowing parallel access and changes to shared memory
* parallel - things being able to occur simultaneously
  * processes/threads
	* multiple threads can share the memory of a single process
* JS is not always **deterministic**


## Run-to-completion
A block/function will run to its completion before any other task is passed for execution by the event loop.

### Race condition
```js
var a = 1;
var b = 2;

function foo() {
	a++;
	b = b * a;
	a = b + 3;
}

function bar() {
	b--;
	a = 8 + b;
	b = a * 2;
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```
`foo` & `bar` race against each other to see which runs first. It's a *race condition* because you cannot predict reliably how `a` & `b` will turn out.

## Concurrency
Concurency is when two or more "processes"/tasks are executing simultaneously over the same period, regardless of whether their individual constituent operations happen in *parallel* or not.

### Interaction
When concurrent "processes" have to interact with each other, a need for coordination arises in order to prevent *race conditions* and to have the ability to reliably predict the outcome of the code.

```js
// FROM THIS
var res = [];

function response(data) {
	res.push( data );
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );

// TO THIS
var res = [];

function response(data) {
	if (data.url == "http://some.url.1") {
		res[0] = data;
	}
	else if (data.url == "http://some.url.2") {
		res[1] = data;
	}
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
```

Nondeterminism = race condition


