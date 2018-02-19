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

Iterators are a patterned way of stepping through typically stepping through a set of data for exampel the result from a database query. You will step through one result at the time, you would call `.next()`, `.next()` keep getting the value unless no new results will come in. That's an iterator pattern. 

**IN THIS CASE CALLING A GENERATOR, PRODUCES AN ITERATOR** 

The purpose of the iterator in this case is not rather to step through data, but rather to step over control of the generator from the outside. So again we can't pause the Generator but we can ask the Generator to run utill it gets paused. And when we call `it.next()` it will resume and then it will pause again untill we can the `it.next()` it will resume and pause again etc.

When we call `const it = generate()` none of the code's run. But when we call `it.next()` we start running the generator. And when it gets to the `yield` keyword it's going to pause and return control back to line 8 the first `it.next()`. Line 8 can then go to the next line `it.next()`and resume it, but there could be also a break, there could be a gap, there could be a delay in time between line 8 and 9.

In that period of time the overall programm continues to run without change, but what's different is inside of this generator it's paused state, it's blocking and waiting that someone comes in and resume the program and call the `.next()` method again to resume it. 










