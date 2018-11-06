# Learning FP with Ramda

* [Source](https://www.udemy.com/learning-functional-javascript-with-ramda/)
* [Checkout this gist](https://gist.github.com/tarasowski/7daa6c007784933da0de1f3b45bdb37b)

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

```js
const { __, set, view, lens, assoc, unless, gt, take, when, concat, ifElse, lt, where, filter, compose, descend, identity, sort, head, props, equals, converge, pathOr, defaultTo, find, propEq, append, pipe, both, either, split, map, join, toLower, pluck, prop, merge, pick, curry, path } = require('ramda')
const trace = label => value => (console.log(`${label}: ${value}`), value)



const arr = [1, 2, 3]

const newArr = append(4, arr)
const curriedArr = append(4)
const currArr = curriedArr(arr)

console.log('appending to Array', newArr)
console.log('curried Array', currArr)

const userObj = [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Dimi' },
    { id: 3, name: 'Billy' },
]

propEq('id', 2) // returns true if we apply the data to the function

const isDimi = propEq('id', 2)
const dimi = find(isDimi, userObj)
console.log(dimi)
```
// * Ramda helps us to write point free code without arguments, because the functions are curried. Point free helps us to reuse functions in a lot of places because it's not tied to any arguments.

```js
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => person.age >= 18
const wasBornInCountry = propEq('birthCountry', 'UK')
const isCitizen = either(wasBornInCountry, wasNaturalized)

const testUser = {
    age: 20,
    birthCountry: 'UK'
}

const isEligibleToVote = both(isOver18, isCitizen)

console.log(isEligibleToVote(testUser))
```
* Composition is a process of combining two or more functions to create new function f(g(x))
* The problem with the functions below we have created 4 variables in fact for readability. But in reality we don't need them at all, we just are interested in input and output of the function

```js
const toSlug = input => {
    const words = input.split(' ')
    const lowerCasedWords = words.map(word => word.toLowerCase())
    const slug = lowerCasedWords.join('-')
    const encodedSlug = encodeURIComponent(slug)
    return encodedSlug
}

const slug = toSlug('This is composition')
console.log(slug)
```
* If we would use the normal .split(' ') method from JavaScript we'll get errors, since .split() is not curried in JavaScript. In the case below we are specifying the split(' ') and the data gets supplied as the last element to the curried functions!
```js
const makeSlug = pipe(
    split(' '),
    map(toLower),
    join('-'),
    encodeURIComponent
)

const slug3 = makeSlug('This is composition')
console.log('slug3', slug3)

const payload = require('./payload.json')

const body = pluck('body', payload)
//console.log(body)
```
* We need to write functions with 0 or 1 argument because of the composition. If you have only one argument you can compose functions into a pipeline, otherwise you need to created curried functions. If you need to specialize a function there is no way to create curried function, but then it also has a single return!!!

```js
function calculate(data) {
    return data.lat - data.lng
}

const body2 = pipe(
    prop('body'),
    JSON.parse,
    prop('content'),
    pick(['lat', 'lng']),
    calculate
)

console.log(body2(payload))
```
* Getting nested fields with Ramda

```js
const bill = {
    nickname: 'Bill',
    country: 'UK',
    personal: {
        profile: {
            name: 'Bill',
            surname: 'Williams',
            age: 20
        }
    }
}

const mike = {
    nickname: 'Mike',
    country: 'US',
    personal: {}
}
```
* Using this function we'll get a runtime error with `mike` because there is noch such a property on the object.
const getSurname = user => user.personal.profile.surname

* If we don't want to get a runtime error if e.g. the field doesn't exist we can add this checks in order to return undefined in case the field doesn't exists.

```js
const getSurnameCheck = user =>
    user &&
    user.personal &&
    user.personal.profile &&
    user.personal.profile.surname


const getSurnameRamda = path(['personal', 'profile', 'surname'])

console.log(getSurnameRamda(bill)) // Williams
console.log(getSurnameRamda(mike)) // undefined

const returnStringIfNotSet = pipe(
    getSurnameRamda,
    defaultTo('No value assigned')
)

console.log(returnStringIfNotSet(mike))

const returnStringIfNotSetOr = pathOr('There is no value yet!', getSurnameRamda)
console.log(returnStringIfNotSetOr(mike))
```
* Converge in Ramda

```js
const isValidArr = [6, 3, 4, 5, 2]
const invalidArr = [3, 4, 6, 1]

const sortByBiggestFirst = sort(descend(identity))

const isFirstElementBiggest = converge(equals, [
    head,
    compose(head, sortByBiggestFirst)
])

console.log(isFirstElementBiggest(isValidArr))
console.log(isFirstElementBiggest(invalidArr))


const products = [
    { name: 'Jacket', price: 50, category: 'clothes', count: 20 },
    { name: 'Boots', price: 120, category: 'clothes', count: 30 },
    { name: 'Iphone', price: 600, category: 'electronics', count: 5 },
    { name: 'Ipad', price: 300, category: 'electronics', count: 10 }
]

const getProductNames = items => {
    const filteredItems = items.filter(item =>
        item.category === 'clothes' && item.count < 50 && item.price < 100)
    return filteredItems.map(item => item.name)
}

const getProductNamesRamda = compose(
    pluck('name'),
    filter(where({
        category: equals('clothes'),
        count: lt(__, 50),
        price: lt(__, 100)
    }))
)

console.log(getProductNames(products)) // ['Jacket']
console.log(getProductNamesRamda(products)) // ['Jacket']
```
* If else statements in Ramda

```js
const video = {
    '720p': 'funny-video-hd.mp4',
    '480p': 'funny-video-480p.mp4',
    isHd: true
}

const getVideoFilePath = video => {
    return video.isHd ? video['720p'] : video['480p']
}

const getVideoFilePathRefactored = compose(
    concat('/api/videos'),
    getVideoFilePath
)

const getVideoFilePathRamda = compose(
    concat('/api/videos/'),
    ifElse(
        propEq('isHd', true),
        prop('720p'),
        prop('480p')
    )
)

console.log(getVideoFilePath(video))
console.log(getVideoFilePathRamda(video))
console.log(getVideoFilePathRefactored(video), 'this is the refactored version')
```
* When not to use ifElse function from Lambda example

```js
const getMessage = isWorkingTime => {
    const onlineMessage = 'We are online'
    const offlineMessage = 'We are offline'
    return isWorkingTime
        ? onlineMessage
        : offlineMessage
}

const getMessageRefactored = isWorkingTime => {
    return isWorkingTime.status
        ? isWorkingTime.onlineMessage
        : isWorkingTime.offlineMessage
}

console.log(getMessageRefactored({
    status: true,
    onlineMessage: 'We are online...',
    offlineMessage: 'We are offline...'
}))
```

* Writing with when and unless in Ramda

```js
const truncate = str => {
    let truncatedString
    if (str.length > 10) {
        truncatedStr = str.substring(0, 10)
        truncatedString = `${truncatedStr}...`

    } else {
        truncatedString = str
    }
    return truncatedString
}

function truncateRefactored(str) {
    return str.length > 10
        ? str.substring(0, 10).concat('...')
        : str
}

const truncateRamda = when(
    compose(
        gt(__, 10),
        prop('length')
    ),
    compose(
        concat(__, '...'),
        take(10)
    )
)

const truncateRamdaUnless = unless(
    compose(
        gt(__, 10),
        prop('length')
    ),
    compose(
        concat(__, '...'),
        take(10)
    )
)

console.log(truncate('This is my first string that should be truncated!')) // This is my...
console.log(truncateRefactored('1234567891011')) // 1234567891...
console.log(truncateRamda('1234567891011')) // 1234567891...
console.log(truncateRamdaUnless('What will happen here? It shouldnt cut the string'))
```

* Changing object field with Ramda lenses

```js
const user = {
    name: 'John',
    surname: 'Flint'
}

const nameLens = lens(
    prop('name'),
    assoc('name')
)

console.log(nameLens(user))

const result = view(nameLens, user)
const result2 = set(nameLens, 'Alex', user)


const updateKey = key => value => object => ({ ...object, [key]: value })


const composedNamed = compose(
    updateKey('name')('Dimitri')
)

console.log(composedNamed(user))
```
