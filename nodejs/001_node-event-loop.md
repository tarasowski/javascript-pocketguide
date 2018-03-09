# Node Event Loop & Async Programming

An event loop is something like a for/while loop that is always spinning for something to execute. In any type of an application there are two categories of tasks:

* CPU-bound: they consume more of the CPU, the main job 
    + Encryption
    + Password solving
    + Encoding
    + Compression 
    + Calculaiton (3D/VR)

* I/O-bound: they dealing with Input and Output operations
    + Disk writing/reading
    + Networking: request, response
    + Database: read, write

Most of the time the CPU-bound tasks are not the bottleneck in networking apps. The I/O tasks are the bottleneck they take up more time typically. 

## Dealing with slow I/O

* Synchronous: very bad because you'll be blocking process, 
* Forking: you can fork your process (there is module for that) and offloading the work to multiple processes. (forking a process means creating a copy of that process!)
* Threading: more computers, more servers, VMs, container what most of other languages do. No threading in Node.js
* Event Loop: this is how Node.js deals with the non-blocking I/O, without blocking the process

## Call Stack

Uses push/pop functions on the FILO/LIFO/LCFS basis i.e., function removed from top (opposite of queue). Call stack is where your functions are stored, this is how JS engine can unwrap the execution. 

```js
const f3 = () => {
    console.log('executing f3');
    undefinedVariableError // Error
};

const f2 = () => {
    console.log('executing f2');
    f3();
};

const f1 = () => {
    console.log('executing f1');
    f2();
};

f1();

``` 

# Call stack as a Bucket

Think of a call stack as a bucket, first in last out!

```js
f3() // last in the bucket but first to go
f2()
f1()
anonymous() // first in the bucket but last out
```

`Ananymous()` is the wrapper function for that module you are using.

![Error](https://github.com/mittyo/javascript-pocketguide/blob/master/nodejs/images/nodejs-call-stack-error.png)

## Event Queue

In the event queue a principle FIFO (first in first out) is applicable to push to call stack. 

```js
const f3 = () => {
    console.log('executing f3');
    setTimeout(() => {
        undefinedVariableError // Error but asynchronious
    }, 1000)
};

const f2 = () => {
    console.log('executing f2');
    f3();
};

const f1 = () => {
    console.log('executing f1');
    f2();
};

f1();

```
 ![Error](https://github.com/mittyo/javascript-pocketguide/blob/master/nodejs/images/nodejs-call-stack-async-error.png)

 Now the call stack is empty/clear, because the way it works event loop schedules this callback in the future, We don't see f1, f2, f3 in our call stack.

 ## Event Loop Operating Order:

 1. Timers: it first starts with the timer functions (setTimeout)
    + setTimeout(), setInterval()
 2. I/O callbacks: such as networking, database writes/reads, disk writing/reading
    + executes almost all callbacks with exception of close callbacks, the one scheduled by setInterval()
 3. Idle, prepare: something node.js doing internally we cannot put any code
    + only use internally
 4. Poll: incoming connection, data (if we are building a server, we are listening for connections)
    + retrieve new I/O events: node will block here when appropriate
 5. Check
 6. Closing callbacks
    + e.g. socket.on('close',...)

### Who process.nextTick() works in Node.js

It helps us to make a function asynchronous if need, by doing so we can offload heavy operations that can block the main thread. The process object is a one of the few global objects provided by the Node.js core API. It can be access from anywhere, thus its methods can also be accessed. Such is a method called process.nextTick() which is used by developers in realtime applications everyday to defer the execution of a function until the next Event Loop Iteration.[Source](https://medium.com/@amanhimself/how-process-nexttick-works-in-node-js-cb327812e083)

In Node.js, each iteration of an Event Loop is called a tick. To schedule a callback function to be invoked in the next iteration of the Event Loop, we use process.nextTick().

```js
function cb(){
  console.log('Processed in next iteration');
}
process.nextTick(cb);
console.log('Processed in the first iteration');
```
**Output**
```js
Processed in the first iteration
Processed in next iteration
``` 

## Async Code Syntax

* Just callbacks: code and data are arguments callback(data, data, data, callback)
* Promises: the code is separated from the data
* Generators/Async-Await: look like sync but are async

### Error first callback pattern

One of the most used patterns and you'll see it a lot in the node core function. If there is no error you need to provide the first argument as a `null`
```js
const fn = (cb) => {
    //Define error and data
    // Do something...
    cb(error, data)
}

fn(myFn(error, data) => {
    console.log(error);
    console.log(data)
});
``` 
Argument names don't matter but the order does matter, put errors first and callbacks last.

```js
const fn = (cb) => {
  const data = 'this is my data';
  const error = 'this is my error';
  cb(error, data)
}

fn((err, data) => {
  console.log(err); // output this is my data
  console.log(data); // output this is my error
})

```
**Note:** A function signature is the order of the arguments provided during the function invokation. 

### Callbacks not Always Async

Sync code which has a function as an argument. If we talk about callbacks we can mean function that is passed as an argument. But it's up to the main function such as `.map()` to either call the argument function later if async or right away if it sync. `.map()` is the sync function and the process will be stoped until the function is resolved. Not all callbacks are async!!!

```js
cost arr = [1, 2, 3, 4];
arr.map((element, index, array) => item * index)
``` 

### What's about promises?

They make the callback code external and separate code from the data arguments. 

Promiseses for developers often you will consume a promise form a lib (axios) or less often implement your own promise. 

Clear separation of data and flow control arguments:

```js
promise1(data1)
    .then(promise2)
    .then(promise3)
    .then(promise4)
    .then(data4 => console.log(data4))
    .catch(err => console.error(err));
``` 

**Note:** Here is another example how to use both Promises and Callbacks

```js
const fs = require('fs');

const readFileIntoArray = (file, cb = null) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (error, data) => {
            if (cb) {
                return cb(error)
                return reject(error)
                }
            
            const lines = data.toString().trim().split('\n')
            if (cb) return cb(lines)
            else return resolve(lines)
            
        });
    });
};

const printLines = (lines) => {
    console.log(`there are ${lines.length} line(s)`);
    console.log(lines);
};

const FILE_NAME = __filename

readFileIntoArray(FILE_NAME)
    .then(data => printLines(data)) // he was just writing .then(printLines) and it has worked
    .catch(console.error);
``` 

## Node Events (Event Emitters)

It's not about async it's more about modularization of the code and creating of good patterns and architecture of the code for your application. **Event Emitters or Observer Patter**

1. Import require('events'): the first step is to import events. Events is a core module 
2. Extend class Name extends...: now you need to extend it. Now you can extend the class, especially in node version 8 and higher. 
3. Instantiate new Name(): then you would instantiate your class
4. Add listeners .on(): you can add listeners
5. Emit .emit(): you can emit events (aussenden)

Why Event emitters? They allow you to put code in different places and to customize the behavior of particular class of particular module or make other components of your application interact with those particular modules/classes. 

### Emitting Outside Event Emitter Class

```js
const events = require('events');
class Encrypt extends events {
    constructor(ops) {
        super(ops)
        this.on('start', () => {
            console.log('Beginning A')
        })
        this.on('start', () => {
            console.log('Beginning B')
        })
    }
}

const encrypt = new Encrypt();
encrypt.emit('start');
``` 

Another example with Event listeners in Node

```js
const events = require('events');
class Encrypt extends events {
    constructor(ops) {
        super(ops)
        this.on('start', () => {
            console.log('Beginning A')
        })
        this.on('start', () => {
            console.log('Beginning B')
            setTimeout(() => {
                this.emit('finish', {msg: 'ok'}
            
            }, 0)
        })
    }
}

const encrypt = new Encrypt();
encrypt.on('finish', (data) => {
    console.log(`Finished with message: ${data.msg}`)
})
encrypt.emit('start');
```
In the example above the logic is flipped, now the event listener for finish is outside the class, it somewhere it could be even in different file or different program/project. Now we are emitting in a module and listening in a main program, but it can be also the reverse. That's how flexible and powerful event emitters are. 

### Working with Events
Events are about building extensible functionality and making modular code flexible. A lot of npm modules use events and events are everwhere. 

* `.emit()` can be in the module and `.on()` in the main program which consumes the module 
* `on()` can be in the module and `.emit()` in the main program, and in constructor or in instance
* pass the data with `.emit()` and that data will end up for the callback for the function `.on()` 
* error is a special event (if listen to it then no crashes): if you setup `.on(error)` the program the node code would not crush the entire app, it will just execute the code and then you want to exit the code by yourself (process.exit())* `on()` execution happen in the order in which they are defined (prependListener (put the event in the beginning) or removeListener (will remove an existing listnere))  

### Default Max Event Listener

Default maximum listeneres is 10 (to find memory leaks), use `setMaxListeners` 

```js
const defaultMaxListeneres = 10;
EventEmitter.prototype.setMaxListeneres = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n))
    const errors = lazyErrors();
    throw new errors.RangeError('ERR_OUT_OF_RANGE', 'n', 'a negative number', n)
}
    this._maxListeners = n;
    return this;
};
``` 
You shouldn't neet more than 10 on a object. If you have to many of them, if you are creating event listeners, that could lead to a memory leak. 

**Note:** A memory leak is when you have those type of situations you are running out of memory becauce garbage collection cannot pick them up. Garbage collection pick them up only, pick object or references when nothing refers to them.

### Promises vs. Events

* Events are synchronous while Promises are typically asynchronous. Promises allow you to execute multiple function with `Promise.all([])`. They allow us to have one or multiple `.catch()`

* Events is about moudlarizing and having loosly coupled architecture. The looser your architecture the better. 

* Events react to same event from multiple places, Promise just from one call. 

### .nextTick() in class

It helps to emit events later such as in a class constructor

```js
class Encrypt extends events {
    constructor() {
        process.nextTick(() => { // otherwise, emit will happen before .on()
            this.emit('ready', {})
        })
    }
}
const encrypt = new Encrypt();
encrypt.on('ready', data => {});
``` 
In the example above if we would remove `process.nextTick()` while the class is going to instantiated the constructor will run the `this.emit('ready')`but the main thread will be still on the line `const encrypt` there will be no listner registered, therefore nothing will happen. By adding `process.nextTick()` we are pushing the listener into the queue (or making it async), by doing to it goes futher in the code and when the call stack is empty it fires the `emit('ready')` but we have already registered the event lister `ecnrypt.on()`

### Async/Await

* Most of the times you will consume async/await function from libraries with support. 
* Very rare you have to create your own callback or promises - not often (Node's util.promisify - it's a node.js utility which you can use to create async/await and also promises)

You need Node v8+ for both

```js
const axios = requre('axios');
const getAzatsWebsite = async () => {
    const response = await axios.get('http://....');
    return response.data
}

getAzatsWebsite().then(console.log);
``` 
**Remember:** Async/await always returns a promise that can be accessed with the `then()` method.

### util.promisify

```js
const fs = require('fs');
const util = require('util');
const f = async () => {
    try {
        const data = await util.promisify(fs.readFile)('os.js', 'utf-8')
        console.log(data);
    } catch (e) {
        console.log('oops');
        console.error(e);
        process.exit(1);
    }
}

fn()
console.log('could be doing something else');
```
(Can be use just for Promises as well). Inside of async/await we can use try/catch > `util.promisify()` can be used to create a promise out of the function. 


