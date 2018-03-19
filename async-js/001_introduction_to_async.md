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