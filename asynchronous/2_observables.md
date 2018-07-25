# Observables 

https://frontendmasters.com/courses/rethinking-async-js/events-promises/

Note: Promises can be resolved once. We cannot use it e.g. for click stream events etc. 

Observables is not a guarantee in JavaScript. Right now we can use Observables only with additional libriaries. There is a good library for Observables that is called Rxjs (Reactive Extention)

## What is an Observable

An Observable is a kind of chain of calculated fields in a spreadsheet. In a spreadsheet you can have data in a field but you can also have a field which is a calculated field, it's calculated based upon some data that's in another field. Like C1 = 10 in it and C2 does C1*2 and we get for C2 = 20, C3 does C1*3 and C3 = 30. This calculation chain is a flow of data. We are setting up a flow of data from an original source location to all this different places where we are doing something with that data.

We can think about an Observables as a model where a piece of data comes in one side, that's from the producer (the event emitter - a thing which emits (aussenden) something.) coming in one side and all the steps it takes to propagate it through a system, it's a data flow mechanism. And data flow mechanisms are built from the ground up to respond to events. 

**An Observables is an adopter hooked on to an event source that produces a promise everytime a new event comes through.** 
I have an Obervable that represents my data source and I can subscribe to my observable in one or more other location of my systems in an entirely separate way and it will take automatically all the creation of promises and briging the gap for us

```js
const obsv = Rx.Observable.fromEvent(btn, 'click'); // line 1

obsv
    .map(evt => evt.target.className)
    .filter(className => /foobar/.test(className))
    .distinctUntilChanged()
    .subscribe(data => {
        const className = data[1];
        console.log(className);
    });
```

On line 1 you can see how we can make an Observable. And entirely different part of my system, I can declare what all these steps are and all the calculations in my spreadsheet look like. Basically we make a declarative chain of a data flow. Every time an event comes in from the DOM event (every time I click a button), that's piece of data coming in and it's going to flow through this chain. 

`.map()` in a synchronous way goes over the whole array. And `.map()` in the asynchronous event is just invoked every time a new piece of data comes along. You can think about an event stream as a never ending array. 

**Note:** The Distinct operator `.distinctUntilChanged()` filters an Observable by only allowing items through that have not already been emitted. [Source](http://reactivex.io/documentation/operators/distinct.html)
[Go to this website and see more stream operations](http://rxmarbles.com/#distinctUntilChanged)

`.subscribe()` is kind of the end of the chain. It delivers the possibility to have a synchronous response to the event that come in. `.subscribe()` is a synchronous thing, it's not transforming any data, it's not going to show up my data.

You can think of an Observable as a stream of data that comes through. 