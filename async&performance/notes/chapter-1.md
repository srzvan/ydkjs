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
```javascript
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
