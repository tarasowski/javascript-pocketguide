# Async Await Function

>  In fact every async function you write will return a promise, and every single thing you await will ordinarily be a promise. [Source](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8)

The Async Await Function is simply a combination of Generator and a Promise. The code below shows an example:

```js
const axios = require('axios');

const url = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];


// Manual async function with Generators
const myGen = function* () {
    const urls = yield Promise.all(url.map(url => axios.get(url)));
    const clean = urls.map(e => e.data);
    const [a, b, c] = clean;
    console.log(a);
};

const it = myGen();
const p = it.next().value;
p.then(res => it.next(res));

// The same example with the async function
const myGenAsync = async function () {
    const urls = await Promise.all(url.map(url => axios.get(url)));
    const clean = urls.map(e => e.data);
    const [a, b, c] = clean;
    console.log(a);
}

myGenAsync();
```
If you want to wait for more results, you need to use `Promise.all()` method.

```js
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
```
By doing so you can run the execution in parallel (concurrent). 

> Promise.all will take an array of promises, and compose them all into a single promise, which resolves only when every child promise in the array has resolved itself. [Source](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8)


## Async returns a Promise
The async await function returns a promise. By doing so we can use the same Promise mechanism to resolve the function.

```js
const myGenAsync = async function () {
    const urls = await Promise.all(url.map(url => axios.get(url)));
    const clean = urls.map(e => e.data);
    const [a, b, c] = clean;
    return a;
}

myGenAsync().then(res => console.log(res));
```




