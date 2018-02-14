# Promises Step by Step

Here is a step by step guide for dummies

## What is a promise? 

One way of thinking about the `Promise` is the future value. Another possibility that are `Promises` are giving us is the possibility to subscribe to the completion event. (Promises are eager = they execute immediately vs. Observables are lazy = execute only if we subscribe to them).

**Note:** Promises are immutable once resolved (from the outside it cannot be changed to any port or outside of the system)

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
**Definition of revealing constructor function:** The ability to resolve or reject the promise is only revealed to the constructing code, and is crucially not revealed to anyone using the promise ([Source](https://blog.domenic.me/the-revealing-constructor-pattern/).

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

```js
// Here is the basic anatomy of promise in JavaScript

// Create a promise that is immediately resolved
const p1 = new Promise((resolve, reject) => {
        resolve(42);
});

console.log(p1); // Promise {42}

// We can wrap any value into a promise with Promise.resolve() by doing so we can normalize the values
const p2 = Promise.resolve(42);

console.log(p2); // Promise {42}

// then() method fires a callback in case of success or in case of rejection
p2.then(data => console.log(data)); // 42

// but we can also chain then() methods to have a control flow since each .then() returns another promise
console.log(p2.then(data => data)) // Promise {<pending>}

p2.then(data => data) // Promise {<pending>} this promise gets immediately resolved with the next .then()
  .then(data => console.log(data)) // 42 this then() return another promise, since we are not returning anything it's undefined
  .then(data => {console.log(data); return 38}) // undefined but if we would now return something it will be wrapped into a promise again
  .then(data => console.log(data)); // 38 so the chain can further and further
```

*When the promise finishes it pass along the data in the next promise chain. And when the next one finishes the data is passed to the next promise in the chain. The promise chain does propagate data down from step to step. Promises don't only represent flow control but they also represent data flow.*

## How to catch errors?

There are two diferent possibilities to catch errors. As it was above described the `then(..)` method is an event handler that executes other JavaScript code. Consider:

````
promise.then(success => console.log(success), (error) => console.log(error))
````

The left side fires the success callback function and the right side fires a rejection callback function. This is how we can handle errors while working with `Promises`. But if we want just to get all the errors w/o adding the rejection callback function we can use the `.catch()` method, if error occurs it propagate the error down the chain to the `.catch()` method. 

````
promise.then(success => console.log(success))
       .catch(error => console.log(error));
````

## More Sources:

[Some other good stuff about Promises](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/promises.md)









