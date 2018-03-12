# Event Emitters in NodeJS

If you want to avoid a callback hell, there is a solution for that in NodeJS. The solution is called Events.

## Events Emitters

Events are part of core and supported by most of the core modules while more advanced patterns such as promises, generators, async/await are not. **They all are present in all core modules**. Promises/Generators/Async/Wait are not solving exactly the same problems as events do. With promises/async/await you still use callbacks but callbacks in the different manner. 

## Events == Node Observer Pattern

Events are NodeJS Observer Pattern. 

* Subject: is typically a class or an object.
* Observers (event listeners on a subject)
* Event triggers: we can have multiple event listeners and multiple event triggers.

**Note:** Event Emitters is just another patters how you can work with async code. There are some advantages and disadvantages. But the biggest advanatege is that it's working on all NodeJS version including 6, which is right now running on Lambda. Maybe not so relevant in the future!!!

Here is an example how we can create a subject.
```js
const events = require('events'); // part of the platform
const emitters = new events.EventEmitter();
```
`events` here would be our subject. `emitter` is the instance of the object that we will create from that class. And once we do that this `emitter` will magically start having properties like `.on()`. `.on()` is one of the ways to define an event listner or an Observer. 

```js
emitter.on('done', (results) => console.log('Done:', results))
``` 

The first argument will be the name of the event `done` in this case and the second argumen twill be the function. It's still a callback but now we can have more functionality to it, because we are using the callback inside the event emitter. 

## Using Event Emitters

```js
const events = require('events');
const emitter = new events.EventEmitter(); // our subject that has two methods .on .emit
emitter.on('knock', (result) => console.log(`Who's there?`));
emitter.on('knock', (result) => console.log('Go away'));

emitter.emit('knock');
``` 
**Note:** The order in which event listeners will be executed in order in which those event listeners are defined. First we'll se `who's there?` and then `Go away`. We can execute the code where we want and it can be executed multiple times. 

There are also couple of other methods on the subject. If you want to trigger something only `.once()`
```js
emitter.once()
``` 

## Inheriting for Event Emitter

```js
// job.js
const util = require('util');

const Job = function() {
    //...
    this.process = function () {
        job.emit('done', {completedOn: new Date()});
    }
}

util.inherits(Job, require('events').EventEmitter);

module.exports = Job;
``` 

```js
// weekly.js
const Job = require('.jobs.js');
const job = new Job();

job.on('done', function(details) {
    console.log('Job was completed at:', details.completedOn);
    job.removeAllListeners();
});

job.process();
``` 

There are couple of properties on the subject:

```
emitter.listners(eventName);
emitter.on(eventName, listener);
emitter.ence(eventName, listener);
emitter.removeListener(eventName, listener);
```