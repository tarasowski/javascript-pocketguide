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

But it's a little annoying to have to create an intermediate variable p2 (or p3, etc.). Thankfully, we can easily just chain these together:

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

[Source: You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md)

---

## Promises vs. Observables

> Promises are eager, Observables are lazy. 

[Source: Promises vs. Observables](https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13)



