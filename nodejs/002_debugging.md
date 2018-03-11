# Debugging Strategies

[Source](https://node.university/courses/201267/lectures/4467106)

* Don't guess and don't too much (why you should do that if you can put console.log() / debugger statement). Just use the console.log() to see how the program works, don't try to guess the 15 steps that the program does.

* Isolate (use binary search) - isolate the problem are, use binary search: is when you start from the middle than split into two halfs and you know where the problem lies, again split that half into two another problems, you reduce number of iteration to comparing to just starting from the beginning. For instance if you have 5 functions put the console.log() in the middle. If that console.log() outputting your result that means the first half is working, proceed to the second half (function number 4 and 5).

* Check for values / watch for values. Most of the time when the value is null the application crushes you will see that undefined error. Why the value is empty it could be an async issue or your are trying to get the property of an object but that property doesn't exists. Maybe you are getting bad input because of there is no validation. Just iterate, iterate and itereate use binary search. **You should analysing your program in 3 to 5 steps (function call at a time), not the whole program, you are not a computer**

* Trial and error

* Use the stackoverflow development approach - Google it (skip questions read answers). **Note:** If you are spending more than 5 minutes of your time, that's not worth anymore. Probably there is a person that already had that problem and already found a solution.

* Read source code, docs can be outdated or subpar

## console.log() is one of the best debuggers

Why console.log()

* Because it's not breaking the execution flow. It's not stopping or unpause the execution (debugger)
* Nothing extra needed (unline Node Inspector/DevTools or VS Code)
* Robust: clearly shows if the line is executed
* Clearly shows the data

**Note:** After the debugging please don't forget to remove the console.log(). Keep your code clean!!!

## Streaming Logs to File

This is what you should do in production, you are not going to watch 5 servers, you are going to analyse the log files. 

```js
const fs = require(fs);

const out = fs.createWriteStream('/.out.log'); // standard output
const err = fs.createWriteStream('/.err.log'); // error output

const console2 = new console.Console(out, err); // new instance

setInterval(() => {
    console2.log(new Date());
    console2.error(new Error('Whoops'))
}, 5000)
``` 

## Console Paramers

Often times during a debugging process, the suggestion process is to use something similar such as step 1, step 2, step 3, etc. You are doing that to isolate your problem area and also add some object to that some variables e.g. you can add name and city. You can use parameters as well you can output them and they will be concatinated

```js
console.log('Step', 2) // Step2 there will be concatinated if we write it in the way
const name = 'Azat';
const city = 'San Francisco';
console.log('Hello %s from %s', name, city); // %s acts like a placeholder - output: Hello Azat from San Francisco
``` 

**Note:** %s you can put any letter after % sign. It's like string interprolation, but it existed way before ES6 string literals. 

## util.format and util.inspect

Util is a util core module of nodejs. They will not output by themselves, but you need to put them into console.log, but they will give you a better representation. If the city is an object and you put it into the console.log it will only show [Object, object]. You can use JSON.stringify() is will create a string and you can console.log it OR output that object by itself OR you can use `util.inspect` the result will be the same as just outputing that parameter

```js
const util = require('util');
console.log(util.format('Hello %s from %s', name, city))
//Hello Azat from San Francisco
console.log('Hello %s from %s', 'Azat', {city: 'San Francisco'})
//Hello Azat from [Object object]
console.log({city: 'San Francisco'});
// {city: 'San Francisco'}
console.log(util.inspect({city: 'San Francisco'}))
// {city: 'San Francisco}
``` 

Here is another example how to use `util.inspect`

```js
console.log(util.inspect({city: 'San Francisco'})) // { city: 'San Francisco' }
console.log('Hello %s from %s', 'Azat', {city: 'San Francisco'}) // Hello Azat from [object Object]
console.log('Hello %s from %s', 'Azat', util.inspect({city: 'San Francisco'})) // Hello Azat from { city: 'San Francisco' }
console.log('Hello %s from %s', 'Azat', JSON.stringify({city: 'San Francisco'})) // Hello Azat from {"city":"San Francisco"}
```
**Note:** We can also use `.toString()` method to explore the content of the [Function], [object Object] etc.

## console.dir()

`console.dir` takes a depth it will print only the higher order the first level properties. Because we have here `global` object and `global` object has lot of properties, we don't want to list of them. If we work with mangoose it has the schema and if we don't want to look at all the schema or you are working with express and has incoming request and has a lot of data, you just need the first level. It's very similar to using `object.key()` will also give the the keys of the first level. 

```js
const str = util.inspect(global, {depth: 0});
console.log(str) // gives the first level of the object global
console.dir(global, {depth: 0}) // gives the first level of the object global
console.dir(global,{ showHidden: true, depth: 2, showProxy: true })
``` 
info = log // console.info is exactyle the same as console.log
warn = error // the same as console.error
trace // prints call stack -> it will print the call stack
assert // require('assert) -> requires assert method but he is don't using it

## Console Timers

Very useful methods or features. You can basically provide a string and `console.time` will provide a timer, the timer starts ticking and then you would say `.timeEnd` with **the same string**, you are capturing how long the transaction took. 

```js
console.log('Ethereum transaction started');
console.time('Ethereum transaction');
web3.send(txHash, (error, results) => {
    console.timeEnd('Ethereum transaction')
    // Ethereum transaction: 4545.921ms
})
``` 
**Note:** You can have unlimited number of these timers just use another strings. But you need to use for `.time` and `.timeEnd` the same string!!!

## Node Debugger

You can start it by typing `node inspect <filename>` If you want to debug it in Node V8 Inspector in Chrome dev tools you can simply type `node node --inspect-brk <filename>` and in the browser type `chrome://inspect/` and click on node.js enable you will be redirected to a window where you can use the debugger. The command `--inspect-brk` will enable the breaking on the first line.

[More information about the inspect command you can find here](https://nodejs.org/en/docs/inspector/)

**Note:** In order to set the breakpoint just add to your code `debugger` and it will automatically create a break point. Or set the breakpoint into the debugger itself.

### Debugger in the CLI

```js
console.log('step', 1)
debugger
console.log('step', 2)
setTimeout(() => {
    console.log('run after the stack is empty')
}, 1000)
console.log('step', 3)
```

In order to launch the CLI debugger you need to type `node inspect <filename>`and the CLI debugger starts and stops and the breakpoint you set earlier `debugger`. This command works from v8+ because in older versions the syntax was different. You can type `help` to see all the commands.

### Debugger in Chrome 

If you want to use the debugger in Chrome you can simply type `node --inspect-brk <filename>`and it will give you a websocket url. You can't connect it directly. 

```
Debugger listening on ws://127.0.0.1:9229/fe056385-6261-4d4b-b269-e4b52c0e6c83
``` 

By pasting it into the browser nothing will happen. You need to open chrome developer tools and you'll see a gree node logo in the navigation bar of the developer tool. You can click on that and a new window will be opened. So you can use the internal Chrome debugger to debug your application. 

**Note:** If you want to step in into an async function you need to set the breaking point or debugger inside the async function, by doing so after the call stack is empty it will go inside the async function.

```js
console.log('step', 1);
console.log('step', 2);
const a = 10;
const b = 'Dima';
let c = 'Hello';
setTimeout(() => {
    debugger;
    console.log('run after the stack is empty')
    c = 'New Value set';
}, 1000)
console.log('step', 3);

// step 1
// step 2
// step 3
// run after the stack is empty
``` 

**Note:** We can use the console like a REPL to overwrite variables on the fly. From the console we could redefine c or any other variable we would like.

**Note:** The lecturer said that he is using only `console.log()` for debugging. He is not using the debuggers built-in in Chrome or VS Code. 

## DevTools Network Debugging Demo

In the Network section you can analyse different requests and information about the network. 

## V8 Memory Scheme

V8 is the JS engine that powers the Node.js

* Resident Set: is where all the things related to that particular Node.js process is placed
    + Code: Node/JS Code
    + Stack: Primitives (no strings), local variables, pointers to objects in the heap and control flow
    + Heap: has more complicated objects. Referenced types such as Objects, strings, closures

If you want to get the memory you just need to type in any app `process.memoryUsage()`. If you consol.log this, you'll get something like that:

```js
Object {
    rss: 27488256, // is the resident set
    heapTotal: 10330112, // heapTotal needs to be lower than rss
    heapUsed: 5087416, // heapUsed needs to be lower than heapTotal
    external: 8224
    }

```
When resident set cannot increase anymore that's when you have a memory leak.

#### Two type of the Heap in NodeJS

* New Space&Young Generation: New allocations, size 1-8Mb, fast collectoin (Scavenge - Garbage Collection), tilde20% goes into Old Space
* Old Space&Old Generator: Allocation is fast but collection is expensive (Mark-Sweep)

## Garbage Collection in NodeJS

* The mechanism that allocates and frees up heap memory is called garbage collector. 

It works automatically in Node, thanks to V8. In other languages like C++ we have to allocate our memory and clean up by ourselves. But as mentioned the Mark-Sweep could be very expensive and is bad for performance. In some cases developers are trying not to trigger garbage collection because it drops the perfromance. 

* Objects that are still referenced are not collected (memory leaks). That object cannot not be collected and if you have a big number of objects that cannot be collected you'll have a crash. JavaScript heap out of memory, typically this happens after few days when the application is running on a server. A common hack you can restart your server every two or three days to clean up the memory.

**Note:** shared state is when the variable is declared a global one. 

## Memory Leak Mitigaion

If you don't know to look at:

* Reproduce the error/task
* Check for variables and fn arguments, pure fn are better (doesn't work with outside state)
* Take heap dumps and compare (with debug and DevTools or heapdump modules) - do it overtime and see what is increasing over time and compare it
* Update Node (could be a problem with some modules or Nodejs itself)
* Get rid of extra nmp modules and see if there is newer version that doesn't have memory leaks
* Trial and error: remove code you think is leaky
* Modularize&refactor your code (that will help you to isolate the problems)

**Note:** You can use this tool to loadtest your http requests [loadtest npm](https://www.npmjs.com/package/loadtest)

**Note:** You can install [heapdump npm](https://www.npmjs.com/package/heapdump) it will create heap snapshots and you can load the snapshots into the DevTool and analyse them inside Google DevTools. 




