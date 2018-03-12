# Node Introduction

## Why use NodeJS?

In software engineering we build two types of systems:

* Input/Output is one of the most expensive type tasks (>CPU) - tend to be more widespread systems:
    + Read/write to db
    + Read/write to hard disk
    + Request/reponse 
* CPU-bound type of systems

So either you consume a lot of CPU or you consume a lot of Input/Output. NodeJS has a non-blocking I/O = non-blocking Input and Output, which allows us to build non blocking input and output systems. 

![Non-blocking I/O](https://think360studio.com/12-benefits-of-using-node-js-for-web-application/)

We have the event loop which is single-threaded and it's constantly looking for things to execute (Google Chrome V8 engine). F.i. we are building a web server, we have request coming in and event loop will schedule them, it has a way to delegate the request to the file system, database, computation. Along with a task itself it will also send a callback, once the operation is complete the callback which is typically just a function will go back to the event loop, so the event loop kind of knows what to do next. The callback code will be triggered and executed and inside of the callback we usually send back the data to the client who requested the operation in the first place. 

```js
console.log('Step', 1);
setTimeout(() => console.log('Step', 3), 1000);
console.log('Step', 2)
``` 
The `setTimeout()` function schedules event in the future. NodeJS is not going to block the main / single thread, it just sends the request to the event loop, the event loop delegates the task to do the operation and sends the data back to the event loop, the event loop puts the callback with the data into the callback queue and once the call stack is empty it fires the callback. In the example above the callback is `() => console.log('Step', 3)`

## Blocking Web Server

A typical web server that you'll be building in Python, Ruby or Java or PHP. 

![Blocking I/O](https://webapplog.com/you-dont-know-node/threading_node/)

Here in this example each subsequent request will be blocked in the qeueu by the previous request. That's why you need multi-threading. So blocking systems need multi-threading because that's the only way to scale. 

**Note:** A good example is when in front of a shop there is a queue and only one person can take the money and prepare some beverages to drink. It means everyone will be processed after each other and you have to wait in line before you'll get your drink. If you want to scale you need to add more cash-registers and people who can dot the same stuff in parallel. Everything happens synchronously!

## Non-blocking Web Server

NodeJS using non-blocking and we can build a non-blocking web-server

![Non-Blocking](http://m03s6dh33i0jtc3uzfml36au-wpengine.netdna-ssl.com/wp-content/uploads/threading_node.png)

When requests are coming they go to the event loop. The event loop is almost never blocked. And it deleages the processes to some other actors, some other subject which actually do some other operation. When the operations are completed event loop being the intermediary sends back those requests to the clients.

**Note:** In a coffe shop analogy that would be typical starbucks store where you have two different people. One person is at the cash register is taking your orders and taking your money. The another person is making the drink or it could be more than 1 people making the drink. During the time you are waiting asynchronously, at your table you can watch some node.university lectures. You don't have to stay in line and when your order is ready they call you. That's your callback! 

This is what non-blocking I/O is, you scale it very easy. You don't need to add more cash registers, that's not where your bottleneck is, you'll be adding more workers that are making the drinks.

[Multi-threading] is the software equivalent of a nuclear device because if it used incorrectly, it can blow up in your face.

## NodeJS is single-threaded

You can still write code that is going to block the whole system.

```js
'use strict'

console.log('Step', 1);
const start = Date.now();
console.time('Loop');
for (let i = 0; i < 1000000; i++) { 
    // nothing to do here
}
console.log('Step', 2);
const end = Date.now();
console.timeEnd('Loop');
console.log('Loop', start - end);

``` 
During that time the process cannot do anything. There are couple of modules that use sync reading and blocking I/O. If you want to use blocking code, the advise of the author is to use clusters. Because with clusters you can use multiple processes

Blocking I/O Code
```js
const content = fs.readFileSync('accounts.txt', 'utf-8');
console.log(content);
``` 
Here is no callback it will just read and block the main thread here.


Non-Blocking I/O Code
```js
fs.readFile('account.txt', 'utf-8', (err, content) => console.log(content));
fs.readFile('account2.txt', 'utf-8', (err, content) => console.log(content));
fs.readFile('account3.txt', 'utf-8', (err, content) => console.log(content));
``` 
When the operation will finish it will invoke the callback which is the last function here.
**Note:** We have racing condition here, because the operation is not deterministic here (the operation and results will be delivered randomly in terms of time). We don't have the data right away, but the benefit is that we can run multiple things in parallel (but not true parallel since they are not sharing the same memory). 

We cannot do that!

```js
const content = fs.readFile('account.txt', 'utf-8')
console.log(content) // undefined
```
It will be undefined because the function will be finished somewhere in the future and the value will be available as a part of the callback that get's fired after the call stack is empty. That's why this is not parallel, the processes can happen in parallel like reading/writing to db, but they will be executed one after another (concurrent)!!! Since callback queue works according to FIFO (first in first out) and call stack LIFO (last in first out).


Node is typically much faster than other platforms. (typically because) It depends on the business case, but if you have I/O bound tasks, doing mostly I/O operations and not CPU-bound operation, than the Node will be faster. 

For many people the performance is not a bottleneck. You can through more server/more RAM at the application. The favorite benefit of the author is: JavaScript everywhere. One language to rule them all!!!
    + Think faster
    + Reuse code (mostly the libs)
    + Learn quicker

## Most of Node is JavaScript

* Array
* String
* Primitives
* Functions
* Objects

Node !== JavaScript

How do you create a global variable. There is no global window in NodeJS. In NodeJS you work with modules, get path to my script. `global == GLOBAL`, has a lot of properties `global.__filename`, `global.__dirname`. We have moudles natively in NodeJS `global.module` -> export and `global.require()` -> import. There is also another property that is called `global.process === process`, `process.pid, process.versions, process.arch`

If you want to get the command line arguments you can use `process.arg` to get options. We can also access the environmental variables that's where the passwords/db/other stuff are stored. `process.env`. Other stuff like `process.memoryUsage()` and `process.uptime()`. `process.cwd()` = working directory.

`process.exit()`or `process.kill()` we can finish or exit process or we can terminate another process. It's handy for scalability to launch new processes.





