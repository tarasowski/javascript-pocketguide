# Learning FP with Ramda

[Source](https://www.udemy.com/learning-functional-javascript-with-ramda/)

* `console.dir(func)` show the function as an object e.g. with closure values etc.. It displays an interactive list of properties of the specified JS object.


* Closures are inner functions with outer varaibles that are accessible inside them. Closures are used for single purpose just to store variables after calling the function

```js
function addTo(passed) {
    function add(inner) {
        return inner + passed
    }
    return add
}

const addThree = addTo(3)
console.log(addThree(1)) // 4
```

* The first benefit of currying is that we can split functions into sequence of single argument functions that are easy to reuse. 

```js
const obj = [{ id: 1 }, { id: 2 }, { id: 3 }]

const ids = obj.map(element => element.id)
console.log(ids) // [ 1, 2, 3 ]

const get = property => object => object[property]
const curryIds = obj.map(get('id'))
console.log(curryIds) // [ 1, 2, 3 ]
```


* With currying we can get elegant and reusable code highly abstracted and in purely declarative style

```js
const getIds = object => object.map(get('id'))
console.log(getIds(obj)) // [ 1, 2, 3 ]


const map = fn => values => values.map(fn)

const getid = map(get('id'))
console.log(getIds(obj)) // [ 1, 2, 3 ]
```

* You can see if we build code from small curried functions we cann additionally add code or reuse them

```js
function fetchFromServer() {
    return Promise.resolve({
        user: 'Dimitri',
        posts: [
            {
                title: 'why curry?'
            },
            {
                title: 'functional programming'
            }
        ]
    })
}
```
* This is the normal JavaScript way to ge the titles
fetchFromServer()
    .then(data => data.posts)
    .then(posts => posts.map(element => element.title))
    /

    // * This a functional way where you reuse already defined functions
    fetchFromServer()
        .then(get('posts'))
        .then(map(get('title')))
```
* Creating your own curry functions that translates the basic functions into curried

```js
function curry(fn) {
    return function f1(...args) {
        return args.length >= fn.length
            ? fn(...args)
            : (...moreArgs) => f1(...[...args, ...moreArgs])
    }
}
```
* Another implementation of curry function more verbose? Or easier to reason about

```js
function curry2(fn) {
    const arity = fn.length
    return function f1(...args) {
        if (args.length >= arity) {
            return fn(...args)
        } else {
            return function f2(...moreArgs) {
                const newArgs = args.concat(moreArgs)
                return f1(...newArgs)
            }
        }
    }
}
```
* function f1(...args) -> ... here is a spread operator in our case it spreads the arguments into an array. It's a spread because it comes after = equal sign e.g. const func1 = function (...args)

```js
const addNew = (a, b, c) => {
    return a + b + c
}

const curriedAdd = curry(addNew)
console.log(curriedAdd(1)(2)(3))
```
* Rest operators collect all the remaining elements into an array. 

```js
function add(first, second, ...args) {
    //.....
    return { first, second, third: args }
}

console.log(add(1, 2, 3, 4, 5)) // { first: 1, second: 2, third: [ 3, 4, 5 ] }
```
* Spread operators let us unpack elements in an array to single/individual arguments.

```js
function addSpread(...args) {
    return [1, 2, 3, 4, ...args]
}

console.log(addSpread(1, 3, 4, 5, 6)) // [ 1, 2, 3, 4, 1, 3, 4, 5, 6 ]

function addFour(a, b, c, d) {
    return a + b + c + d
}

const curriedFour = curry(addFour)
console.log(curriedFour(1)(2)(3)(4)) // 10

const curried2Four = curry2(addFour)
console.log(curried2Four(1)(2)(3)(4)) // 10
```
