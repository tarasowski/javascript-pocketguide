# Generators in ES6

https://frontendmasters.com/courses/rethinking-async-js/generator-example

## Run to completion semantic
All normal functions having characteristic of them with is to have the run-to-completion semantic. It means when a function starts running it will always run to the end of that function and finish before any other function has the opportunity to come in and start running. At any given moment only one function is executing!

**Note:** Generators don't have the run to completion semantic. They are different kind of function. The thing we are trying to create with JavaScript Generators are a syntactic form of declarin a state machine.

> State machines are a way of patterned series of flow from one state to another state to another state. Decleratively listing all these states and transitions. A generator is a syntactic form of a state machine.

## Yield Keyword
The yield keyword is kind of a pause button on an old VCR. You watch a movie and click the pause button, and it pauses middle in the frame, nothing changes. You can wait as long as you want, you can come later press the button and resume.

## What is a Generator?
**Generator is a pausable function** When it's running it will run across the yield keyword and at that moment, wherever the yield keyword shows up even in the middle of an expression. The Generator enters this paused state and will wait indefinetely till someone comes in and press the play button again (resumes the function).

A Generator is a function that can pause and resume, pause and resume as many times as necessary. While the Generator is paused on the inside of the Generator everything is completely blocked nothing is happening. **But that's not blocking the overall program, it's a localized blocking (ONLY INSIDE OF THE GENERATOR)**

Generators don't block the entire program.

```js
const generate = function* () {
    console.log('Hello');
    yield
    console.log('World');
};

const it = generate();
it.next(); // 'Hello'
it.next(); // 'World'
```
On line 3 we have the yield keyword. And the yield keyword is the pause button. No one can force the Generator to pause form the outside (cooperative concurrency).

On line `const it = generate()` it looks like we are executing the function. But the Generator doesn't run here. So invoking a function of a Generator doesn't mean it will run the code, instead it produces an **Iterator** 

## What is an Iterator?

Iterators are a patterned way of stepping through a set of data for example the result from a database query. You will step through one result at the time, you would call `.next()`, `.next()` keep getting the value unless no new results will come in. That's an iterator pattern.

> An object is an iterator when it knows how to access items from a collection one at a time, while keeping track of its current position within that sequence. In JavaScript an iterator is an object that provides a next() method which returns the next item in the sequence. This method returns an object with two properties: done and value. [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) 

**IN THIS CASE CALLING A GENERATOR, PRODUCES AN ITERATOR** 

The purpose of the iterator in this case is not rather to step through data, but rather to step over control of the generator from the outside. So again we can't pause the Generator but we can ask the Generator to run utill it gets paused. And when we call `it.next()` it will resume and then it will pause again untill we can the `it.next()` it will resume and pause again etc.

When we call `const it = generate()` none of the code's run. But when we call `it.next()` we start running the generator. And when it gets to the `yield` keyword it's going to pause and return control back to line 8 the first `it.next()`. Line 8 can then go to the next line `it.next()`and resume it, but there could be also a break, there could be a gap, there could be a delay in time between line 8 and 9.

In that period of time the overall programm continues to run without change, but what's different is inside of this generator it's paused state, it's blocking and waiting that someone comes in and resume the program and call the `.next()` method again to resume it. 

## We can use Generators as message passing tool

```js
const myGen = function* () {
    yield 1;
    yield 2;
    yield 3;
};

const it = myGen();
it.next() // Line 9 {value: 1, done: false}
it.next() // {value: 2, done: false}
it.next() // {value: 3, done: false}
it.next() // {value: undefined, done: true}
```
In this example we are calling yield with a value. In the previous case there was no value in the yield expression. It was assumed that I'm yielding undefined. 

When we call `yield 1` we return control back to line 9 by returning a value, `.next()` returns us an object it has two properties on it, it has the `value` and it has a `done` property that tells us is the Generator complete.

## Loops over Iterators?

There is a new looping style added to ES6 specifically for consuming iterators and it's the `for...of` loop. And if you give an Iterator it will run the iterator to completion. 

```js
const myGen = function* () {
    console.log('Hello');
    yield 1;
    console.log('World');
    yield 2;
    console.log('Final');
    yield 3;
};

const it = myGen();

for (let first of it);
```

It automatically looks for `done/false` 

**Important!!!** this is a very synchronous syntax / sequential syntax, so maybe not the best choice with the Generator. 

## Messaging with Generators

We can pass messages out by providing a value next to the yield method. But we can also pass a message in and that message goes into the Generator. 

**In German** 
yield = ergeben, liefern

```js
const myGen = function* () {
    let x = 1 + (yield);
    console.log(x);
    let y = 1 + (yield);
    console.log(y);
    yield (x + y);
};
const it = myGen();
it.next(); // {value: undefined, done:false}
it.next(10);

```
On the line 2 the `yield` keyword is asking a question: I need some value here, it's like a placeholder that says I need some value and I don't have it yet. 

By placing a value `it.next(10)` we are going to give the value and resume the function. So thank you for answering my question, the value is value 10. 

Here we are yielding a simple value, but it could be e.g. an Ajax call or something else. 


```js
const myGen = function* () {
    let x = 1 + (yield);
    let y = 1 + (yield);
    yield (x + y);
};

const it = myGen();
it.next(); // {value: undefined, done:false}
it.next(10);
console.log(`The total value is ${it.next(50).value}`);

```

Since `it.next()` always returns an object we can can access the property by `.value`. 

**Note:** Generators don't have to finish. It's entirely ok to partially consume a generator and then when you have no more reference to it, it's just get garbage collected like any other value. Even sometimes you will design a Generator that will never finish. 

Generators are producing the values for us (from the outside world).

**Note:** If you pass a value into the initial `.next()` call there is no `yield` keyword waiting for it. That value just goes garbage collected. Don't send the value for the initial `.next()` call. 


```js
const myGen = function* (params) {
    const x = yield;
    const y = yield;
    yield (x + y);
}

const it = myGen();

it.next();
it.next(20);
const result = it.next(30).value
const final = it.next()
console.log(result); // 50

```
It looks like the `.next()` method return the value from the next `yield` keyword. The initial `it.next()` call returns a value `undefined` because there is no yield keyword waiting for it. The second `it.next(20)` passes 20 into the first `yield` and return the value from the second `yield` and so on!!!

# Async Generators

```js
function getData(d) {
    setTimeout(() => it.next(d), 1000);
}

const corouting = function* (params) {
    const x = 1 + (yield getData(10));
    const y = 1 + (yield getData(30));
    const answer = (yield getData('Final: ' + (x + y)));
    console.log(answer);
}

const it = corouting();
it.next();
```

We have now a logic built-in that gets paused and resumed by receiving a value. Our programming logic our flow control is inside the `courouting()` function. The special part of this flow control is that it looks synchronous. Why is that so important is because this is how our brain works. 

**Note:** Promise chain are a sequence of flow control

We are writing synchrous blocking code. But the rest of the program is not blocked, only the Generator function itself. 

**Note:** In order to do synchronous error handling, we can use `try/catch`. 

# Promises + Generators

Instead of yielding an `undefined` value we are going to yield a promise and promise resume the generator. 

```js
function foo(x,y) {
	return request(
		"http://some.url.1/?x=" + x + "&y=" + y
	);
}

function *main() {
	try {
		var text = yield foo( 11, 31 );
		console.log( text );
	}
	catch (err) {
		console.error( err );
	}
}
```

But how are we going to run *main() now? We still have some of the implementation plumbing work to do, to receive and wire up the yielded promise so that it resumes the generator upon resolution. We'll start by trying that manually:

```js
var it = main();

var p = it.next().value;

// wait for the `p` promise to resolve
p.then(
	function(text){
		it.next( text );
	},
	function(err){
		it.throw( err );
	}
);
```

[Source: You don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch4.md)















