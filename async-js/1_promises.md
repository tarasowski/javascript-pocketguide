# Promises Step by Step

Here is a step by step guide for dummies

## What is a promise? 

One way of thinking about the `Promise` is the future value. Another description is that `Promises` are giving us is the possibility to subscribe to the completion event. (Promises are eager = they execute immediately vs. Observables are lazy = execute only if we subscribe to them).

In the case of asynchronous actions you could, instead of arranging for a function to be called at some point in the future (callbacks), return an object that represents this future event (`Promise`).

This is what the standard class `Promise` is for. A promise is an asynchronous action that may complete at some point and produce a value, and is able to notify anyone who is interested when that happens.

**Note:** Promises are immutable once resolved (from the outside it cannot be changed to any port or outside of the system)

## How to create a Promise?

### The easy way

The easiest way to create a promise is by calling Promise.resolve. This function ensures that the value you give it is wrapped in a promise. If it’s already a promise it is simply returned, and otherwise you get a new promise that immediately finishes with your value as its result.

````js
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// → Got 15
````

### The hard way

In order to create a `Promise` we start with the revealing constructor function. It has a somewhat odd interface—the constructor expects a function as argument, which it immediately calls, passing it a function that it can use to resolve the promise. 

````js
new Promise((resolve, reject) {
    // do stuff
    if (success) {
        resolve(value);
    } else {
        reject(err);
    }
});
````
**Definition of revealing constructor function:** The ability to resolve or reject the promise is only revealed to the constructing code, and is crucially not revealed to anyone using the promise ([Source](https://blog.domenic.me/the-revealing-constructor-pattern/)).

Since a `Promise` is an object and objects are values we can pass it around across our program. As we can see above a `Promise` can be fullfilled or rejected. Those are the only possible outcomes of a promise. 

````js
const promise = new Promise((resolve, reject) {...});
````

## How to get the value out of the Promise?

To get the result of a promise, you can use its then method. This registers a callback function to be called when the promise resolves and produces a value. You can add multiple callbacks to a single promise, and even if you add them after the promise has already resolved (finished), they will be called.

A `Promise` have 3 possible states:

* pending (The promise will always log pending as long as its results are not resolved yet.)
* resolved (A promise is settled if it's not pending it has been resolved)
* rejected (A promise is settled if it's not pending it has been rejected)

````js
promise.then(onFullfillment, onRejection)
````
**Note:** `then()` is an event handler. Event handlers are JavaScript codes that execute JavaScript when something happens. In this case if a promise gets `resolved()` or `rejected()` the `then()` executes another function / callback / handler within `()`  `onFullfillment` is the first argument and `onRejection` is the second argument or the second function.

````js
const p1 = new Promise((resolve, reject) => {
        resolve(42);
});
p1.then(data => console.log(data)) // output 42
  .then(...);
````

## What does actually `then()` do?

`then()` is an event handler that calls other callbacks. But also a `.then()` method does return another `Promise`. 
1. The `Promise` gets `resolved()` or `rejected()`
2. It goes and looks for a `.then()` if `.then()` is existing it
3. It calls the handler `onfFullfillment` or `onRejection` and we get the value, also
4. It returns another Promise either with the resolved value or `undefined`
5. If the handler returns a promise, waits for that one and then resolves to its result.

This is how we can chain the `.then()` methods / Promises with each other. We either pass the value to the next Promise or just return the Promise with a value `undefined`.

![promise return undefined](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/promise-then-return.png)

![promise chains](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/promise-example.png)


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

````js
promise.then(success => console.log(success), error => console.log(error))
````

The left side fires the success callback function and the right side fires a rejection callback function. This is how we can handle errors while working with `Promises`. But if we want just to get all the errors w/o adding the rejection callback function we can use the `.catch()` method, if error occurs it propagate the error down the chain to the `.catch()` method. 

````js
promise.then(success => console.log(success))
       .catch(error => console.log(error));
````



## More Sources:

[Some other good stuff about Promises](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/promises.md)
[Eloquent JavaScript 3rd Edition](http://eloquentjavascript.net/3rd_edition/11_async.html)









