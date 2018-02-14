## What is parallel threading?
> It's very common to conflate the terms "async" and "parallel," but they are actually quite different. Remember, async is about the gap between now and later. But parallel is about things being able to occur simultaneously. The most common tools for parallel computing are processes and threads. Processes and threads execute independently and may execute simultaneously: on separate processors, or even separate computers, but multiple threads can share the memory of a single process. 

[Source: You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch1.md)

## What is concurrency?

> Concurrency is when two or more "processes" are executing simultaneously over the same period, regardless of whether their individual constituent operations happen in parallel (at the same instant on separate processors or cores) or not. You can think of concurrency then as "process"-level (or task-level) parallelism as opposed to operation-level parallelism (separate-processor threads).

Let's imagine a site that displays a list of status updates (like a social network news feed) that progressively loads as the user scrolls down the list. To make such a feature work correctly, (at least) two separate "processes" will need to be executing simultaneously (i.e., during the same window of time, but not necessarily at the same instant).

**Note:** We're using "process" in quotes here because they aren't true operating system–level processes in the computer science sense. They're virtual processes, or tasks, that represent a logically connected, sequential series of operations. We'll simply prefer "process" over "task" because terminology-wise, it will match the definitions of the concepts we're exploring.

The first "process" will respond to onscroll events (making Ajax requests for new content) as they fire when the user has scrolled the page further down. The second "process" will receive Ajax responses back (to render content onto the page).

"Process" 1 (`onscroll` events):

```
onscroll, request 1
onscroll, request 2
onscroll, request 3
onscroll, request 4
onscroll, request 5
onscroll, request 6
onscroll, request 7
```

"Process" 2 (Ajax response events):

```
response 1
response 2
response 3
response 4
response 5
response 6
response 7
```

It's quite possible that an `onscroll` event and an Ajax response event could be ready to be processed at exactly the same moment. For example, let's visualize these events in a timeline:

```
onscroll, request 1
onscroll, request 2          response 1
onscroll, request 3          response 2
response 3
onscroll, request 4
onscroll, request 5
onscroll, request 6          response 4
onscroll, request 7
response 6
response 5
response 7
```

But, going back to our notion of the event loop from earlier in the chapter, JS is only going to be able to handle one event at a time, so either `onscroll`, request 2 is going to happen first or response 1 is going to happen first, but they cannot happen at literally the same moment.

[Source: You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch1.md)

For reference here is what I mean by sequential, concurrent and parallel:

* Sequential: do this and then do that
* Concurrent: do this and do that without waiting between
* Parallel: do this and do that at the exact same time

Here is an another example for concurrency

```
// CONCURRENT REQUESTS
var http = require('http')

function concurrentRequests(){
  for (var i = 0; i < 5; i++) {
    var request = {
      hostname: 'httpbin.org',
      headers: {'request-id': i},
      path: '/delay/.'+  Math.floor(Math.random() * (5 - 1 + 1)) + 1
    }
    http.get(request, (res) => {
        var body = ''
        res.on('data', function (chunk) {
          body += chunk
        })
        res.on('end', function () {
          console.log(JSON.parse(body).headers['Request-Id'])
        })
    }).end()
  }
}

console.log("Running concurrent requests!")
concurrentRequests()
```

[Concurrency in JavaScript](https://gist.github.com/montanaflynn/cb349fd109b561c35d6c8500471cdb39)





