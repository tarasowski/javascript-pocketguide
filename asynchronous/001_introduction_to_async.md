# Introduction to Async Programming in JavaScript

[Course link](https://app.pluralsight.com/library/courses/asynchronous-javascript-reasoning/table-of-contents)

JavaScript is single-threaded and concurrency model is different as well. Most of the languages have a so-called "preemptive concurrency", JavaScript has "cooperative concurrency".

[Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

## Multi-threaded
Most languages can execute code concurrently at the same time. Just like a bank with multiple tellers, can accept deposits and provide withdrawals, most languages have mutliple threads that are executing code at the same time. 
![Multi-threaded](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/js-async-multi-threaded.png)

**Note:** Ruby is multi-threaded language!!!

## Single-threaded
Javascript enginges can only execute one piece of code at a time. That's like a bank with one teller. It can cause problems but also can be in fact a really good thing. If you worked with multi-threading before, you know you can run in a lot of problems. 

![Multi-threaded](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-single-threaded.png)

## The event loop

If there is only bank teller obviously there needs to be a queue that holds other people. In JavaScript there is a queue where work queues up and is subsequently executed. That queue is the part of the event loop, this is where the work is stored until current operation task is done executing. 

![Queue](https://developer.mozilla.org/files/4617/default.svg)

## Non-blocking

Just because we can run only one piece of code/task at the time, doesn't mean things to be slow. 

[Weather Example for Non-blocking](http://plnkr.co/edit/ZOAaSdtnfvR6WwiuVZ6s?p=info)

In the example below we are making two web requests concurrently. How is it possible, the JavaScript doesn't block the code or page. We can investigate the concurrency by clicking on the network tab in the Chrome DevTools. 

```js
var weatherRequest = new XMLHttpRequest();
  weatherRequest.onload = weatherSuccess;
  weatherRequest.onerror = failure;
  weatherRequest.open('get', weatherUrl, true);
  weatherRequest.send();
  
  console.log("2")
  
  let fiveDayRequest = new XMLHttpRequest();
  fiveDayRequest.onload = fiveDaySuccess;
  fiveDayRequest.onerror = failure;
  fiveDayRequest.open('get', fiveDayUrl, true);
  fiveDayRequest.send();
``` 

We can see here two requests at the same time are fired off. In the timeline we see that these requests are executing at the same time. The JavaScript enginge will execute only one piece of code at a time. Behind the scenes there are a pool of threads that are used for making web requests. And this pool of threads can have multiple connecitons open to multiple different servers to request data from multiple different requests at the same time. This is all hidden behind the scenes, but this is how we can still achieve "parallelism" within a JavaScript application.

We stil have behind the scenes the ability for multi-threading. It's not something that applies to our JavaScript Code itself. What we are refering to is the non-blocking nature of JavaScript. 

**Note:** This is not true parallelism, since the memory will not be shared!

![DevTools Network Request](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/concurent-requests.png)

```js
document.getElementById("city").value = "New York, NY"
load()

function load() {
  var city = document.getElementById("city").value;

  showResults("loading...");

  var appid = '5431a37d6a366b746ffd635354edcc99';
  var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=imperial`;
  var fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appid}&units=imperial`;

  console.log("1")
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.onload = weatherSuccess;
  weatherRequest.onerror = failure;
  weatherRequest.open('get', weatherUrl, true);
  weatherRequest.send();
  
  console.log("2")
  
  let fiveDayRequest = new XMLHttpRequest();
  fiveDayRequest.onload = fiveDaySuccess;
  fiveDayRequest.onerror = failure;
  fiveDayRequest.open('get', fiveDayUrl, true);
  fiveDayRequest.send();
  console.log("3")
``` 

In the example above we do the first request and the second request and we are done with the code execution. When the results come back they will fire a callback function in the first case `weatherSuccess` and in the second case `fiveDaySuccess`. To say we are done with execution of the code, nothing is blocked, but once the data comes back it will fire the callback and do something with the data. 

JavaScript supports concurrency by not blocking for I/O and various other things. The non-blocking nature allows us to still have performant programs, we don't have to wait for result till something is complete. 

```js
weatherRequest.open('get', weatherUrl, true); // true means async (non-blocking) - false means sync (blocking)
``` 

**Note:** avoid blocking your application by making I/O async. Make sure the requests are async. In NodeJS if you loading a file make sure you do it asynchronously. DON'T BLOCK THE THREAD!!! If you need to run CPU-based operations make sure to run this code in a Web worker which is backgroud separate JavaScript engine, but you don't block the frontend of your app. 

# Run to Completion

[Example of blocking the application](http://plnkr.co/edit/z29VyH5BPvC4oc40EyOu?p=info)

```js
const btn = document.getElementById("button");

btn.addEventListener("click", function() {
  
  // modify the page
  document.body.style.backgroundColor = "red";
  var p = document.createElement("p");
  p.innerText = "let's add some text to the page";
  document.body.appendChild(p);

  // simulate blocking / long running operation
  const start = Date.now()
  const delaySeconds = 10;
  while (Date.now() < start + delaySeconds * 1000) {}

})
``` 

The one case you need to look for is one long running operation. This are often the cases where you can block your application without knowing it. 

The while loop in the example above is blocking the operation. We can't interact with the browser anymore, the whole page is blocked. This is called synchronous operation. But we can interact with other tabs in the browser, because each tab has it's own process. And each process has it's own thread (JavaScript engine). 

The whole event listeren from the example above. If it fires it run till completion. It takes 10 seconds to complete, nothing else will be run during this 10 seconds. If a chunk of code run, it will run till completion, so if it's blocks nothing is able to run. 

**Note:** If you need to do something that will likely block the thread, use web workers. Web workers is just like opening another line at the bank (see example above). In other languages there could be a different behavior, you can pause or unpause the code and run it differently in JavaScript we have run to completion, once started it will run till the end. 

The handler of the request (callback function) is pushed into the queue when the request comes back. And the event loop takes the callbacks FIFO (first in, first out) order and pushes it on top of the call stack. So the call stack needs to be empty to process the callbacks from the queue.

Here is an async challenge. 

```js
console.log('1');

setTimeout(function() {

  console.log('2');

  setTimeout(function() {

    console.log('3');

  }, 0);

  console.log('4');

}, 0);

console.log('5');
// Output
// 1 
// 5
// 2 
// 4
// 3 
``` 

What happens here is that the first `setTimeout()`'s callback get's executed after 0 seconds and when the stack is empty. The callback executes another `setTimeout()` that again get's pushed into the queue and later if the stack is empty to the callstack. This is an example for run to completion phase, the code in each function gets executed from the beginning till the end. 

## Cooperative Concurrency

[Video Description](https://app.pluralsight.com/player?course=asynchronous-javascript-reasoning&author=wes-mcclure&name=asynchronous-javascript-reasoning-m2&clip=8&mode=live)

The work of the functions needs to be broken down, so we can process the data appropriately and don't block the thread or need to wait to long for the callback (answer). When we make a network request to a webiste or we trying to open up a file. Both of these requests will take a while to process we should do it in a non-blocking fashion. 

The unit of work that is running has the control over the rest of the queue, leads to another key takeaway about JavaScript and that is concurrency is cooperative each different element of the program is able to block the thread, so it needs to be architectured well, that no one nothing blocks the thread.

**Note:** Concurrent means we can execute multiple things at the same time. How is it possible with JavaScript if it's single threaded? The multi-tasking appraoch helps to do that in JavaScript. In JavaScript as long as the tasks that sits in a queue don't take a long time to process then we can run things at the same time. We can do one thing for 10ms, switch to another thing for 10ms, switch back and forth. 

## Event Loop
The JavaScript engine and the tab that we are working in our browser has a separate event loop dedicated just to our application and this event loop contains a queue. Inside of this queue work can be placed that will be eventually executed when whatever is running is complete. 

In addition to the queue thre is a call stack, the call stack contains whatever is executing at this current time. 

```js
btn.addEventListener("click", function() {};
``` 

In the case above if someone clicks on the button in the browser, if there is some code executing that button click will get put into the qeueue and if the stack is empty the button click gets into the call stack and can begin to do it's work. The click on the button will invoke the `load()` function and the load function gets pushed on top of the stack. Now the control is passed off to our `load()` event handler. In this case the `load()` function is our event handler! Now the first function that gets pushed on top of the stack is the `console.log(1)` function. If the function is done it pops off the call stack.

The next one is the `send weather` request (just summaries the whole http request to the weather api). Behind the scenes our browser makes a request to the weather api and it waits for the response. Somewhere behind the scenes outside of our JavaScript engine the `request currrent weather` is happening outside of the JavaScript engine. So that request will set there and now the work to send the weather request is done it desolves out of the stack as well. And control goes back to the `load()` function and the next thing on the load function is `console.log(2)`. Once it's done it gets popped off from the stack and `send weather` request is pushed on top of the stack. When this fires off, we fire another request to get the `5day` data from the API. The other request will be handled by the browser behin the scenes for us. 

The machanism that is behind to make requests will listen to the response (JavaScript Browser OR NodeJS). Sending the request, the work is done and sending the request pops off the stack. The load function has more to do it's log out the value `3` `console.log(3)`. 

So let's say while we are printing `3` to the console, the request for current weather completes and the response is now available. Let's also say that is successfully complete. We can't handle this response right now because we have work inside of the call stack. But we can push something to handle that response in the qeueue. 

Something that we push is the weather success function that we setup when we registered the request. We'll get to the weather success function once we have finished everything on the call stack. Everything that is on top of the stack gets popped off the stack. And imagine the second 5day request gets a response that the request is failed. It gets put into the qeueue with the `failure()`. This all happening is behind the scenes and the browser is handling all the requests. It can hae multiple threads, handling multiple requests at the same time. So while our single-threaded JavaScript engine is doing work behind the scenes other things can be happening, we just don't have this things happening inside our JavaScript engine. Now if the stack is empty means we can handle the next thing inside of our qeueu our weather success function is pushed on to the stack  so it begins to execute the weather success function. Once it's done it goes and executes the `failure()` funciton and once that is complete our program is sitting idle and waiting for something else to happen, perhaps for somebody click a button or do something else.

![Button click](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/asyn-button-click.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-button-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-load-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-log-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-weather-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-weather-off-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-weather-log2-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-weather-5day-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-weather-5day-request-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-stack-load-only.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-load3-stack-new.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-load3-stack-new.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-response-back.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-empty-stack.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-weather-success.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-current-weather.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-log-error.png)

---

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-final-step-empty-stack.png)


## Little Programs

Our program is composed of different parts. JavaScript program has a bunch of programs nested inside. It's like our programs are composed of smaller programs. But also we can call this programs, tasks/operations. Our program is broken into little parts that run at different times. 

If you can look for the scenes a synchronousity in your own programs, you'll be starting better in reasoning about the asynchronisity of your JavaScript application. You can start looking at scenes where something is defined and will be executed later on. There is an event loop that acceesses the queue and all these little programs have to line up. These little programs will be pushed in the queue when various events happen e.g. clicking a button, getting a response back from a web request, these little programs be better not blocking and quick. The little programs shouldn't take more than 500ms, if they do need to go that long you should consider something like running these programs in the background with the web worker. 

## Sources of Async

* User interactions: if the user clicks a button on the page, the button click handler is pushed on to the qeueu > the callback is the button handler that is defined. So this is a source of async, something is lined up in order to be executed later on. 
* Network I/O: request/response
* Disk I/O: writing/reading
* IPC: Inter process communication, for example if you use web workers behind the scenes you could have a separate process where your web workers is running and as you communicate with your web worker or it communicates back to you, as you communicate back and forth this is inter process communication. 
* Timers: scheduling some work later happen on. 

### Source: User Interactions

[User Interactions - Exercise](http://plnkr.co/edit/SmSpPS5ZgPvkgn8RE6y1?p=info)

Each time you start to drag the box it pushes the function to the event qeue and gets executed. So drag and drop is a source of asynchronousity in your application. 

### Source: Timers

In JavaScript we have `setTimeout()`and in NodeJS we have `setImmediate()` and `process.nextTick()` in order to defer some execution of the code. 

[Timer - Exercise](http://plnkr.co/edit/gafgKCrxnDIJ6YaG9Jpx?p=info)

**Note:** In this example we have a race condition because we are executing the file in the head and the `<body>` is not available, so we cannot manipulate the content of the `<body>`. What we could do (not in reality) to set some sort of delay and wait for until the `div` is avaiable. 

```js
onReady()

function onReady() {
  const content = document.getElementById("content");
  if (!content) {
    setTimeout(onReady, 100);
    return;
  }

  content.innerHTML = "Main content here from JS";
}
``` 

When you call `setTimeout()`, when the timer elapses `100ms`, once that time is up, the function that you provide will be pushed on the qeueu of the event loop and then once whatever is running is done and everything in front of this function in the queue is processed , then this function will kick-off. This highlights an important aspect of `setTimeout()` that is often overlooked. There is no guarantee that our function will be called at exactly 100ms from now. In `100ms` the function will be pushed into the queue, but if there is a lot of work in front of it, it won't be called until the work is done. 


[Challenge](http://plnkr.co/edit/kPOgzEuIvUmN4o6Jenem?p=info)

**Note:** You can increment or decrement inside of an if statement. The function below will run 100 times and will stop and `console.log()` finish.

```js

let tick = 0;
const total = 100;

const run = () => {
    console.log(tick);
    if (tick++ > total) {
        console.log('finish');
        return;
    } else {
        run(); // recursive function that calls itself over and over again
    }
}
``` 

**Note:** The Timer delay not guaranteed that the function you pass will be invoked at that right amount of time. There could be something else on the stack or in the queue before the function is going to be executed. And again this is becuase a timer is just the amount of time that elapses before an item has pushed on to the queue. It has still flows through the queue and compete whatever is there first, before the code will actually execute. 


## How to make execution async?

**Synchoronious execution**
```js
const numbers = [1, 2, 3];

console.log('start');

const forEach = (items, callback) => {
    for (const item of items) {
            callback(item);
    }
}

forEach(numbers, (number) => {
    console.log(number * 2);
})

console.log('end');
```

**Asynchronious Execution**
```js
const numbers = [1, 2, 3];

console.log('start');

const forEach = (items, callback) => {
    for (const item of items) {
        setTimeout(() => {
            callback(item);
        }, 0)
    }
}

forEach(numbers, (number) => {
    console.log(number * 2);
})

console.log('end');

```


## Debugging of Async Operations

You can use `debugger;` keyword to stop the execution and see what is happening with the program. In general you can put the `debugger;` inside the callback function and see when it will arrive at the point and you can watch for exceptions. 

[Debugging Asynchronous JavaScript](https://app.pluralsight.com/player?course=asynchronous-javascript-reasoning&author=wes-mcclure&name=asynchronous-javascript-reasoning-m3&clip=6&mode=live)

**Note:** If you try to validate asynchronous assumptions you should check a box for asynchronous debugging in Chrome. It will show the async function on top of the function that caused to call the async function. It shows where async calls came from

## Source: Disk I/O

```js
const fs = require('fs');

fs.readFile('./text.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
})
``` 

This is an synchronious operation in NodeJS

## Node.js nextTick and setImmediate

These two methods allow us to schedule a work for later on. 

* process.nextTick(): The process object is a one of the few global objects provided by the Node.js core API. It can be access from anywhere, thus its methods can also be accessed. Such is a method called process.nextTick() which is used by developers in realtime applications everyday to defer the execution of a function until the next Event Loop Iteration.

* setImmediate(): We recommend developers use setImmediate() in all cases because it's easier to reason about (and it leads to code that's compatible with a wider variety of environments, like browser JS.) Schedules the "immediate" execution of the callback after I/O events' callbacks. Returns an Immediate for use with clearImmediate(). When multiple calls to setImmediate() are made, the callback functions are queued for execution in the order in which they are created. The entire callback queue is processed every event loop iteration. If an immediate timer is queued from inside an executing callback, that timer will not be triggered until the next event loop iteration. callback <Function> The function to call at the end of this turn of the Node.js Event Loop. Schedules the "immediate" execution of the callback after I/O events' callbacks. Returns an Immediate for use with clearImmediate().

[The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

```js
setTimeout(() => {
    console.log('st-1');
})

process.nextTick(() => {
    console.log('nt-1');
})

// output 
// nt-1
// st-1
``` 

```js
setTimeout(() => {
    console.log('st-1');
})

process.nextTick(() => {
    console.log('nt-1');
})

setTimeout(() => {
    console.log('st-2');
})

setTimeout(() => {
    console.log('st-3');
})

//output
// nt-1
// st-1
// st-2
// st-3
``` 

**Note:** If you want to see the error stack trace just use the following command `console.log(new Error().stack)`

![Stack](https://github.com/mittyo/javascript-pocketguide/blob/master/async-js/images/async-event-loop-order-node.png)

You may have noticed that process.nextTick() was not displayed in the diagram, even though it's a part of the asynchronous API. This is because process.nextTick() is not technically part of the event loop. Instead, the nextTickQueue will be processed after the current operation completes, regardless of the current phase of the event loop.

Looking back at our diagram, any time you call process.nextTick() in a given phase, all callbacks passed to process.nextTick() will be resolved before the event loop continues. This can create some bad situations because it allows you to "starve" your I/O by making recursive process.nextTick() calls, which prevents the event loop from reaching the poll phase.

`nextTick()` all the callback that you register will be run at the end of the current event loop. That means whatever is running right now which is our script at this point to register all these things (callbacks from the code above) all that's done the things that we registered at the next tick will be called all of them. With the `nextTick()` you are putting things in the front of the line. 

**Note:**Note: The next tick queue is completely drained on each pass of the event loop before additional I/O is processed. As a result, recursively setting nextTick callbacks will block any I/O from happening, just like a while(true); loop. [nextTick() Docs](https://nodejs.org/api/process.html#process_process_nexttick_callback_args) With `setImmediate()` you can register callbacks and they will be called in the order you have registered them.

## Web Workers - IPC

[Web Workers Code - Examples](https://plnkr.co/edit/Yy7BOZU9sIa8EyrxJwGH)

The benefit of JavaScript is it's single threaded but we can spun other threads they can't work with the same state, they can't share memory, they can't work on the DOM together, but they can do they own thing and can easily pass messages back and forth and via first-class asynchronously of JavaScript we can pass message back and forth. We can have even concurrency in JavaScript with multiple engines running. 