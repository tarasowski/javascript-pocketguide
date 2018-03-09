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
