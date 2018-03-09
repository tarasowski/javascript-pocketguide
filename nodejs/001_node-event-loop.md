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