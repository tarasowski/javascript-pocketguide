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

![promise return undefined](./images/promise-then-return.png)

![promise chains](./images/promise-example.png)


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

---

# Promises

> Promises are an easily repeatable mechanism for encapsulating and composing future values. Moreover, once a Promise is resolved, it stays that way forever -- it becomes an immutable value at that point -- and can then be observed as many times as necessary.

**Note:** The Promise resolution "events" we listen for aren't strictly events (though they certainly behave like events for these purposes), and they're not typically called "completion" or "error". Instead, we use `then(..)` to register a "then" event. Or perhaps more precisely, `then(..)` registers "fulfillment" and/or "rejection" event(s), though we don't see those terms used explicitly in the code.

Consider.

````
function foo(x) {
	// start doing something that could take a while

	// construct and return a promise
	return new Promise( function(resolve,reject){
		// eventually, call `resolve(..)` or `reject(..)`,
		// which are the resolution callbacks for
		// the promise.
	} );
}

var p = foo( 42 );

bar( p );

baz( p );
````
**Note:** The pattern shown with `new Promise( function(..){ .. } )` is generally called the "revealing constructor". **The function passed in is executed immediately** (not async deferred, as callbacks to then(..) are), and it's provided two parameters, which in this case we've named resolve and reject. These are the resolution functions for the promise. `resolve(..)` generally signals fulfillment, and reject(..) signals rejection.

> We see here that the Promise constructor takes a single function as its sole parameter (called the “executor function”). It then immediately calls that function with two arguments, resolve and reject. These arguments have the capability to manipulate the internal state of the newly-constructed Promise instance p. I call this the revealing constructor pattern because the Promise constructor is revealing its internal capabilities, but only to the code that constructs the promise in question. The ability to resolve or reject the promise is only revealed to the constructing code, and is crucially not revealed to anyone using the promise. [Source: The Revealing Constructor Pattern](https://blog.domenic.me/the-revealing-constructor-pattern/)

If you pass an immediate, non-Promise, non-thenable value to `Promise.resolve(..)`, you get a promise that's fulfilled with that value. In other words, these two promises p1 and p2 will behave basically identically:

````
var p1 = new Promise( function(resolve,reject){
	resolve( 42 );
} );

var p2 = Promise.resolve( 42 );
````
But if you pass a genuine Promise to `Promise.resolve(..)`, you just get the same promise back:

````
var p1 = Promise.resolve( 42 );

var p2 = Promise.resolve( p1 );

p1 === p2; // true
````

## What is a thenable?

````
var p = {
	then: function(cb) {
		cb( 42 );
	}
};

// this works OK, but only by good fortune
p
.then(
	function fulfilled(val){
		console.log( val ); // 42
	},
	function rejected(err){
		// never gets here
	}
);
````
This `p` is a thenable, but it's not a genuine Promise.

## Wrapping values 


**Note:** Another beneficial side effect of wrapping `Promise.resolve(..)` around any function's return value (thenable or not) is that it's an easy way to normalize that function call into a well-behaving async task. If foo(42) returns an immediate value sometimes, or a Promise other times, `Promise.resolve( foo(42) )` makes sure it's always a Promise result.

````
// don't just do this:
foo( 42 )
.then( function(v){
	console.log( v );
} );

// instead, do this:
Promise.resolve( foo( 42 ) )
.then( function(v){
	console.log( v );
} );
````
PS: Only if you want to get a `Promise` back from a function and you are not sure if it's a `Promise`. Generally you don't need to do this. You can get more information see source.

# Chain Flow

We've hinted at this a couple of times already, but Promises are not just a mechanism for a single-step this-then-that sort of operation. That's the building block, of course, but it turns out we can string multiple Promises together to represent a sequence of async steps.

The key to making this work is built on two behaviors intrinsic to Promises:

* Every time you call `then(...)` on a Promise, it creates and returns a new Promise, which we can chain with.
* Whatever value you return from the `then(..)` call's fulfillment callback (the first parameter) is automatically set as the fulfillment of the chained Promise (from the first point).

Let's first illustrate what that means, and then we'll derive how that helps us create async sequences of flow control. Consider the following:

````
var p = Promise.resolve( 21 );

var p2 = p.then( function(v){
	console.log( v );	// 21

	// fulfill `p2` with value `42`
	return v * 2;
} );

// chain off `p2`
p2.then( function(v){
	console.log( v );	// 42
} );
````
By returning `v * 2` (i.e., `42`), we fulfill the `p2` promise that the first `then(..)` call created and returned. When p2's `then(..)` call runs, it's receiving the fulfillment from the return `v * 2` statement. Of course, `p2.then(..)` creates yet another promise, which we could have stored in a p3 variable.


````
var p = Promise.resolve( 21 );

p
.then( function(v){
	console.log( v );	// 21

	// fulfill the chained promise with value `42`
	return v * 2;
} )
// here's the chained promise
.then( function(v){
	console.log( v );	// 42
} );
````
So now the first `then(..)` is the first step in an async sequence, and the second `then(..)` is the second step. This could keep going for as long as you needed it to extend. Just keep chaining off a previous `then(..)` with each automatically created Promise.

`Promise.resolve(..)` directly returns a received genuine Promise, or it unwraps the value of a received thenable.

The same sort of unwrapping happens if you `return` a thenable or Promise from the fulfillment (or rejection) handler. Consider:

````
var p = Promise.resolve( 21 );

p.then( function(v){
	console.log( v );	// 21

	// create a promise and return it
	return new Promise( function(resolve,reject){
		// fulfill with value `42`
		resolve( v * 2 );
	} );
} )
.then( function(v){
	console.log( v );	// 42
} );
````

Even though we wrapped 42 up in a promise that we returned, it still got unwrapped and ended up as the resolution of the chained promise, such that the second `then(..)` still received 42. If we introduce asynchrony to that wrapping promise, everything still nicely works the same:

````
var p = Promise.resolve( 21 );

p.then( function(v){
	console.log( v );	// 21

	// create a promise to return
	return new Promise( function(resolve,reject){
		// introduce asynchrony!
		setTimeout( function(){
			// fulfill with value `42`
			resolve( v * 2 );
		}, 100 );
	} );
} )
.then( function(v){
	// runs after the 100ms delay in the previous step
	console.log( v );	// 42
} );
````

Of course, the value passing from step to step in these examples is optional. If you don't return an explicit value, an implicit `undefined` is assumed, and the promises still chain together the same way. Each Promise resolution is thus just a signal to proceed to the next step.

![Promise anatomy](https://www.sencha.com/wp-content/uploads/2016/03/asynch-javascript-promises-img3.png)


[Source: You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md)

---

## Promises vs. Observables

> Promises are eager, Observables are lazy. 

[Source: Promises vs. Observables](https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13)









