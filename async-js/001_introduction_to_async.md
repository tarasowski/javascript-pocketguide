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






