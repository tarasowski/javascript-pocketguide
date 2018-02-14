# Promises Step by Step

Here is the definition of promises for dummies

## What is a promise? 

One way of thinking about the `Promise` is the future value. Another possibility that are `Promises` are giving us is the possibility to subscribe to the completion event. (Promises are eager = it executes immediately vs. Observables are lazy = executes only if we subscribe).

## How to create a Promise?

In order to create a `Promise` we start with the revealing constructor function. 

````
new Promise((resolve, reject) {
    // do stuff
    if (success) {
        resolve(value);
    } else {
        reject(err);
    }
});
````
Since a `Promise` is an object and objects are values we can pass it around across our program. As we can see above a `Promise` can be fullfilled or rejected. Those are the only possible outcomes of a promise. 

````
const promise = new Promise((resolve, reject) {...});
````
## How to get the value out of the Promise?

A `Promise` have 3 possible states:

* pending (The promise will always log pending as long as its results are not resolved yet.)
* resolved (The ability to resolve the promise is only revealed to the constructing code, and is crucially not revealed to anyone using the promise)
* rejected (The ability to reject the promise is only revealed to the constructing code, and is crucially not revealed to anyone using the promise)

**Note:** `then()` is an event handler. Event handlers are JavaScript codes that execute JavaScript when something happens. In this case if a promise gets `resolved()` or `rejected()` the `then()` executes another function / callback within `()`  `onFulfillment` is the first argument and `onRejection` is the second argument or the second function.

````
const p1 = new Promise((resolve, reject) => {
        resolve(42);
});
p1.then(data => console.log(data)) // output 42
  .then(...);
````

## How to compose Promises?

<script src="https://gist.github.com/mittyo/13721121715a263e041688f5025c9402.js"></script>







