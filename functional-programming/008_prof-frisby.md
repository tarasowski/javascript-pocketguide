# Professor Frisby on Egghead.io

[Source](https://egghead.io/lessons/javascript-linear-data-flow-with-container-style-types-box)

```js
// const nextCharForNumberString = str => {
//     const trimmed = str.trim()
//     const number = parseInt(trimmed)
//     const nextNumber = number + 1
//     return String.fromCharCode(nextNumber)
// }

// const nextCharForNumberString = str =>
//     String.fromCharCode(parseInt(str.trim()) + 1)


const Box = x =>
    ({
        map: f => Box(f(x)),
        fold: f => f(x), // by using fold we remove it from the Box(), as it has only this function, so it doesn't return Box(x) back as map() does.
        inspect: () => `Box(${x})`
    })
// map() is composition within a context and in this case Box() it's the context. Box() is a containary type.

const nextCharForNumberString = str =>
    Box(str)
        .map(s => s.trim())
        .map(s => parseInt(s))
        .map(i => i + 1)
        .map(i => String.fromCharCode(i))
        .fold(c => c.toLowerCase())



// We captured each assignment in a minimal context. map() is composition it takes one input and maps it to the output. 


const result = nextCharForNumberString(' 64 ')

console.log(
    result
)

// Inspect gets called automatically. That's because console.log is using under the hood util.inspect which apparently will call inspect method on given object if finds one.

```

[Source](https://egghead.io/lessons/javascript-refactoring-imperative-code-to-a-single-composed-expression-using-box)

```js
const Box = x =>
    ({
        map: f => Box(f(x)),
        fold: f => f(x), // by using fold we remove it from the Box(), as it has only this function, so it doesn't return Box(x) back as map() does.
        inspect: () => `Box(${x})`
    })

const moneyToFloat = str =>
    Box(str)
        .map(s => s.replace(/\$/g, ''))
        .fold(r => parseFloat(r))


// Box here has unnested the expression, it's like composition because map() is a type of composition.


const percentToFloat = str =>
    Box(str.replace(/\%/g, ''))
        .map(replaced => parseFloat(replaced))
        .map(number => number * 0.01)


const applyDiscount = (price, discount) =>
    Box(moneyToFloat(price))
        .fold(cost => // cost is captured in the closure
            percentToFloat(discount)
                .fold(savings =>
                    cost - cost * savings))

const result = applyDiscount('$5.00', '20%')
const test = moneyToFloat('$5.00')
const test2 = percentToFloat('20%')

console.log(
    result,
)

// 4
```
**Note:** Box captures something in a context, you can keep mapping and folding and composing it in different ways. 

[Source](https://egghead.io/lessons/javascript-composable-code-branching-with-either)

```js
// const Either = Right || Left

const Right = x =>
    ({
        map: f => Right(f(x)),
        fold: (f, g) => g(x), // removes the value from the type Right
        inspect: () => `Right(${x})`
    })

const Left = x =>
    ({
        map: f => Left(x),
        fold: (f, g) => f(x), // removes the value from the type Left
        inspect: () => `Left(${x})`
    })

const resultRight = Right(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x)
const resultLeft = Left(3).map(x => x + 1).map(x => x * 5).fold(x => 'error', x => x)

const fromNullable = x =>
    x !== null ? Right(x) : Left(x)

const findColor = name =>
    fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fffG8F' }[name])


const result = findColor('yellow').map(c => c.slice(1)).fold(err => 'nothing found', c => c.toUpperCase())

console.log(
    //resultRight,
    //resultLeft,
    result
)

// Right(20)
// Left(3)
// FFFG8F
```

[Source](https://egghead.io/lessons/javascript-composable-error-handling-with-either)

```js
const Right = x =>
    ({
        chain: f => f(x),
        map: f => Right(f(x)),
        fold: f => (f, g) => g(x),
        inspect: () => 'Right(${x})'
    })

const Left = x =>
    ({
        chain: f => Left(x),
        map: f => Left(x),
        fold: (f, g) => f(x),
        inspect: () => 'Left(${x})'
    })



const tryCatch = f => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
}
const fs = require('fs')

const getPort = () =>
    tryCatch(() => fs.readFileSync('confg.json'))
        .chain(c => tryCatch(() => JSON.parse(c)))
        .fold(e => 3000,
            c => c.port)

const result = getPort()

console.log(
    result
)

``` 

## Some examples how to use chain, map, fromNullable

```js
const fromNullable = x =>
    x !== null ? Right(x) : Left(x)

const tryCatch = f => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
}


// imperative code
const openSite = () => {
    if (current_user) {
        return renderPage(current_user)
    } else {
        return showLogin()
    }
}


// declarative code
const openSite = () => {
    fromNullable(current_user)
        .fold(showLogin, renderPage)
}

// imperative code
const getPrefs = user => {
    if (user.premium) {
        return loadPrefs(user.preferences)
    } else {
        return defaultPrefs
    }
}

// declarative code
const getPrefs = user =>
    (user.premium ? Right(user) : Left('not premium'))
        .map(u => u.preferences)
        .fold(() => defaultPrefs, prefs => loadPrefs(prefs))

// imperative code
const streetName = user => {
    const address = user.address
    if (address) {
        const street = address.street
        if (street) {
            return street.name
        }
    }
    return 'no street!'
}

// declarative code
const streetName = user =>
    fromNullable(user.address)
        .chain(a => fromNullable(a.street))
        .map(s => s.name)
        .fold(e => 'no street', n => n)

// imperative code
const concatUniq = (x, ys) => {
    const found = ys.filter(y => y === x)[0]
    return found ? ys : ys.concat(x)
}

// declarative code
const concatUniq = (x, ys) =>
    fromNullable(ys.filter(y => y === x)[0])
        .fold(() => ys.concat(x), y => ys)

// imperative code
const wrapExamples = example => {
    if (example.previewPath) {
        try {
            example.preview = fs.readFileSync(example.previewPath)
        } catch (e) { }
    }
    return example
}

const readFile = x => tryCatch(() => fs.readFileSync(x))

// declarative code
const wrapExamples = example => {
    fromNullable(example.previewPath)
        .chain(readFile)
        .fold(() => example, ex => Object.assign({ preview: p }, ex))
}

// imperative code
const parseDbUrl = cfg => {
    try {
        const c = JSON.parse(cfg)
        if(c.url) {
            return c.url.match(/*....*/)
        }
    } catch(e) {
        return null
    }
}

// declarative code
const parseDbUrl = cfg => {
    tryCatch(() => JSON.parse(cfg))
    .chain(c => fromNullable(c.url))
    .fold(e => null,
        u => u.match(/*...*/))
}

```

[Source](https://egghead.io/lessons/javascript-combining-things-with-semigroups)

```js
// Semigroup is a type with concat method. String "a" is a semigroup here because it has a concat method. Each concat returns a new string
const res = "a".concat("b").concat("c")

// Here the array is the semi-group because we have a concat method on the array. 
const res2 = [1, 2].concat([3, 4]).concat([5])

// Why is it called semigroup and not a concatgroup or something else? 
// Because semi group come from abstract algebra and so we are encoding this in our code so we can keep the name the same and understand the law and properties that come with this math structure rather than making something up on our own. 
// append / preped with semigroup doesn't really matter.
// It's called associativity (1 + 1) +1  === 1 + (1 + 1), it does not matter how we group the operations, it always yield the same result. 


const Sum = x =>
    ({
        x,
        concat: ({ x: y }) => // in destructuring we assign x to y
            Sum(x + y),
        inspect: () => `Sum(${x})`
    })


const resS = Sum(1).concat(Sum(2))

// What are other semi-groups? It's like concatination, it combines two things into one thing.
true && false // false
true && true // true

const All = x =>
    ({
        x,
        concat: ({ x: y }) => // in destructuring we assign x to y
            All(x && y),
        inspect: () => `All(${x})`
    })

const resA = All(true).concat(All(false)) // All(false)


const First = x =>
    ({
        x,
        concat: _ => // in destructuring we assign x to y
            First(x),
        inspect: () => `First(${x})`
    })


const resF = First('blah').concat(First('ice cream'))

// Semi groups is a type with a concat method that is associative

console.log(
    res, // abs
    res2, // [1, 2, 3, 4, 5]
    resS, // Sum(3)
    resA, // All(false)
    resF // First(blah)
)
```

```js
const { List, Map } = require('immutable-ext')

const Sum = x =>
    ({
        x,
        concat: ({ x: y }) => // in destructuring we assign x to y
            Sum(x + y),
        inspect: () => `Sum(${x})`
    })


const All = x =>
    ({
        x,
        concat: ({ x: y }) => // in destructuring we assign x to y
            All(x && y),
        inspect: () => `All(${x})`
    })



const First = x =>
    ({
        x,
        concat: _ => // in destructuring we assign x to y
            First(x),
        inspect: () => `First(${x})`
    })


// When we want to combine two things we should always think in semi groups. 
// If a data structure is entirely made of a semi-grups it will be semi group itself.

const acc1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] })
const acc2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] })

const res = acc1.concat(acc2)

console.log(
    res
)
``` 

[Source](https://egghead.io/lessons/javascript-failsafe-combination-using-monoids)

```js
// A semi group is a type with a concat method. And if `+` is our concatination we have a neutral element here `0` that accesses the identity of so its, it gives us back the element we are trying to concat with. 
// If we have a special element like the `0` here in addition we have what's called a monoid. A semi group with a special element that acts like a neutral identity
// `0` is the neutral element
const x = 5
1 + 0 // 1
2 + 0 // 2
x + 0 // x


const Sum = x =>
    ({
        x,
        concat: ({ x: y }) => // in destructuring we assign x to y
            Sum(x + y),
        inspect: () => `Sum(${x})`
    })

// this is called an interface. We are programming the interace Sum.empty() and not Sum() with pluses and zeroes...
Sum.empty = () => Sum(0)
const res = Sum.empty().concat(Sum(1).concat(Sum(2))) // 3

const All = x =>
    ({
        x,
        concat: ({ x: y }) => // in destructuring we assign x to y
            All(x && y),
        inspect: () => `All(${x})`
    })

// Our neutral element is true here
true && true // true
false && true // false

All.empty = () => All(true)

const resA = All(true).concat(All(true).concat(All.empty()))


// First cannot be promoted to a Monoid, because we have no way to define the neutral element here

const First = x =>
    ({
        x,
        concat: _ => // in destructuring we assign x to y
            First(x),
        inspect: () => `First(${x})`
    })

const sum = xs =>
    xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
    xs.reduce((acc, x) => acc && x, true)

// not going to work here!   
const first = xs =>
    xs.reduce((acc, x) => acc)

// A semi group that does not have an element to return it's not a safe operation. Whereas with the Monoids we can as many as we possibly want, even NaN and still return back something. It's perfectly safe operation that we can reduce as many of them as we like.
```
[Source](https://egghead.io/lessons/javascript-delaying-evaluation-with-lazybox)
```js
const Box = x =>
    ({
        fold: f => f(x),
        map: f => Box(f(x)),
        inspect: () => `Box(${x})`
    })

// it works like a function composition here

const res = Box(' 64 ')
    .map(abb => abb.trim())
    .map(trimmed => new Number(trimmed))
    .map(number => number + 1)
    .map(x => String.fromCharCode(x))
    .fold(x => x.toLowerCase())

// g = means function; x = means a value
const LazyBox = g =>
    ({
        fold: f => f(g()),
        map: f => LazyBox(() => f(g()))
    })

// it gives us purity by lazyness, nothing happens, so we don't have impure side effects
const lazyRes = LazyBox(() => ' 64 ')
    .map(abb => abb.trim())
    .map(trimmed => new Number(trimmed))
    .map(number => number + 1)
    .map(x => String.fromCharCode(x))
    .fold(x => x.toLowerCase())


console.log(
    res,
    lazyRes
)
```
[Source](https://egghead.io/lessons/javascript-capturing-side-effects-in-a-task)

```js
const Task = require('data.task')

const launchMissiles = () =>
    new Task((rej, res) => {
        console.log('launched missiles')
        res("missle")
    })

// If we don't fork it, it will just not run and that is very good because if our application would be only this then we need to fork it 
const app = launchMissiles().map(x => x + '!')


// This is how we keep our application pure e.g. by isolating side effectcs and calling them somewhere else.
// this code will be in charge of the side effects and the problems with it. 
app.map(x => x + '!').fork(e => console.log('error', e),
    x => console.log('success', x))

```
[Source](https://egghead.io/lessons/javascript-using-task-for-asynchronous-actions)
```js
const Task = require('data.task')
const fs = require('fs')

// we can do the same for http, logging and all sorts of side effects that don't really compose well
// we have now atomic pieces of our read and write file in Task form
const readFile = (filename, enc) =>
    new Task((reject, resolve) => {
        fs.readFile(filename, enc, (err, content) =>
            err ? reject(err) : resolve(content))
    })

const writeFile = (filename, contents) =>
    new Task((reject, resolve) => {
        fs.writeFile(filename, contents, (err, success) =>
            err ? reject(err) : resolve(success))
    })

const app = readFile('config.json', 'utf-8')
    .map(contents => contents.replace(/8/g, '6'))
    .chain(contents => writeFile('config1.json', contents))


app.fork(e => console.log('error', e),
    x => console.log('success'))

// const app = () =>
//     fs.readFile('config.json', 'utf-8', (err, content) => {
//         if (err) throw err
//         const newContents = content.replace(/8/g, '6')
//         fs.writeFile('config1.json', newContents, (err, _) => {
//             if (err) throw err
//             console.log('success!')
//         })
//     })

//app()

```
## Functor

[Source](https://egghead.io/lessons/javascript-you-ve-been-using-functors)

```js
// The definition of a functor is: any type with a map method must obey a few laws it must:
// 1.Law any type fx.map(f).map(g) === fx.map(x => g(f(x))) - this law is the law that preserves function composition while mapping


const Box = x =>
    ({
        map: f => Box(f(x)),
        fold: f => f(x),
        inspect: () => `Box(${x})`
    })

const res1 = Box('squarrels')
    .map(s => s.substr(5))
    .map(s => s.toUpperCase())

const res2 = Box('squarrels')
    .map(s => s.substr(5).toUpperCase())

console.log(
    res1,
    res2
)

// Box(RELS) Box(RELS)
// The results are equal and we see that preserves function composition
//'squarrels'.substr(5).toUpperCase() this is also function composition

// 2. Law when we map id over our functor that holds x fx and call id(fx) that should be the same
// fx.map(id) === id(fx)
const id = x => x

const res3 = Box('crayons').map(id)
const res4 = id(Box('crayons'))

console.log(
    res3,
    res4
)

// Box(crayons) Box(crayons) - we have go the same result and can do it with any type such as Either, Task etc.
```

## Lifting a Value

```js
// Function `of` is a generic interface to be able to place a value into a type. We call it lifting a value into a type. We are just putting those values inside our type.

// Task.of('hello') -> we'll end up with a Task('hello')
// Either.of('hello) -> we'll end up of Right('hello')
// Box.of(100) -> we'll end up of Box(100)

// The main goal of is to create a generic interface without worrying about a factory functions such as Task((rej, res) => /*...*/)


const f = x => x.concat('!!!')

const res = Task.of('hello').map(f)
res.fork(e => 'error', d => console.log(d)) // hello!!!

Either.of('hello').map(f).fold(_ => _, d => console.log(d)) // hello!!!
```
## Monad

```js
// Modands Either, Task all these types are modands
// Because we have an F.of() that lifts a value into a type and a F.chain (also flatMap, bind, >>=) method. These two together create a monadic interface


// httpGet('user')
//     .map(user =>
//         hettpGet(`/comments/${user.id}`)) // Task(Task([Comment]))

// // The key point of chain it's going to flatten into one Task([Comment]). That's why it's called faltMap()

// httpGet('user')
//     .chain(user =>
//         httpGet(`/comments/${user.id}`))

// // Monads allow us to nest computation

// httpGet('user')
//     .chain(user =>
//         httpGet(`/comments/${user.id}`))
//     .chain(comments =>
//         updateDOM(user, comments))
```

## Currying
```js
// Preloading a function with some arguments to create a new function is called currying
// When you use currying you end up with a point that the data comes last

const add = x => (y => x + y)

const inc = add(1)
const res1 = inc(2)

const replace = regex => repl => str =>
    str.replace(regex, repl)

const censor = replace(/[aeiou]/ig)('*')
const res2 = censor('hello world')

console.log(res2) // h*ll* w*rld

```
## Applicative Functors

```js
// Applicative Functors for multiple arguments. If a type has an F.ap() method it calls applicative functors 

const Box = x =>
    ({
        ap: b2 => b2.map(x),
        chain: f => f(x),
        map: f => Box(f(x)),
        fold: f => f(x),
        inspect: () => `Box(${x})`

    })

const add = x => y => x + y

const res = Box(add).ap(Box(2)).ap(Box(3))
console.log(
    res
)

const { Task, Either } = require('./ramda-x')

// Applicative Functors for multiple arguments. If a type has an F.ap() method it calls applicative functors 

const Box = x =>
    ({
        ap: b2 => b2.map(x),
        chain: f => f(x),
        map: f => Box(f(x)),
        fold: f => f(x),
        inspect: () => `Box(${x})`

    })


const $ = selector =>
    Either.of({ selector, height: 10 })

const getScreenSize = screen => head => foot =>
    screen - (head.height + foot.height)

// $('header').chain(head =>
//     $('footer').map(footer =>
//         getScreenSize(800, head, footer)))

const res = Either.of(getScreenSize(800))
    .ap($('header'))
    .ap($('footer'))

console.log(
    res // 780
)

```
## Applicatives for Concurrent Actions

```js
const { Task, Either } = require('./ramda-x')

const Db = ({
    find: id =>
        Task((reject, resolve) =>
            setTimeout(() =>
                resolve({ id: id, title: `Project ${id}` }), 100))
})

const reportHeader = (p1, p2) =>
    `Report: ${p1.title} compared to ${p2.title}`

// this is sequntial approach where you first get the first data, then the next data and so on
const res = Db.find(20).chain(p1 =>
    Db.find(8).map(p2 =>
        reportHeader(p1, p2)))

res.fork(_ => _, d => console.log('runs sequential', d))

// In order to run concurrently you can use applicatives
// Those both tasks are kicked of at the same time Db.find(20) and Db.find(8), they don't wait to be resolved

const res2 = Task.of(p1 => p2 => reportHeader(p1, p2)).ap(Db.find(20)).ap(Db.find(8))

res2.fork(console.error, d => console.log('runs concurrent', d))


// runs concurrent Report: Project 20 compared to Project 8
// runs sequential Report: Project 20 compared to Project 8
```
```js
const readFile = path => enc =>
    Task((reject, resolve) => {
        fs.readFile(path, enc, (err, content) =>
            err
                ? reject(err)
                : resolve(content))
    })

const files = ['config.json', 'config2.json']

const res = files.map(fn => readFile(fn)('utf-8'))
res.map(e => e.fork(console.error, console.log))
```
## Natural Transformations

```js
const { Task, Either } = require('./ramda-x')
const { Right, Left, fromNullable } = Either
const fs = require('fs')

// Natural transformation is a type conversion. It's taking one functor to another.

const Box = x =>
    ({
        map: f => Box(f(x)),
        fold: f => f(x),
        inspect: () => `Box(${x})`
    })


const boxToEither = b =>
    b.fold(Right)

boxToEither(Box(100)).map(x => x * 2).fold(_ => _, console.log) // 200

const eitherToTask = e =>
    e.fold(Task.rejected, Task.of)

eitherToTask(Right('works')).fork(_ => _, console.log) // works

// Here we transforming a list into an Either

const first = xs =>
    fromNullable(xs[0])

first([1, 2, 3, 4]).map(x => x * 2).fold(console.error, console.log)

const largeNumbers = xs =>
    xs.filter(x => x > 100)

const larger = x =>
    x * 2

const app = xs =>
    first(largeNumbers(xs).map(larger))

console.log(app([2, 400, 5, 1000])) // 800


const fake = id =>
    ({ id: id, name: 'user1', best_friend_id: id + 1 })

const Db = {
    find: id =>
        Task((rej, res) =>
            res(id > 2 ? Right(fake(id)) : Left('not found')))
}

Db.find(3)
    .chain(eitherToTask)
    .chain(user =>
        Db.find(user.best_friend_id))
    .chain(eitherToTask)
    .fork(console.error, console.log)

// { id: 4, name: 'user1', best_friend_id: 5 }

```
## Isomorphism

```js
const { Task, Either } = require('./ramda-x')
const { Right, Left, fromNullable } = Either


// What is isomorphism? Is a pair of functions to and from
// from(to(x)) == x
// to(from(y)) == y
// These functions prove that this data type holds the same information as that data type
// String ~ [Char] = String is isomorphic to an array of characters. These data types should hold the same information being able to convert froth and back without loosing anything

// we are packing into a type to and from here by creating a factory function
const Iso = (to, from) =>
    ({
        to,
        from
    })


const chars = Iso(s => s.split(''), c => c.join(''))

const res = chars.from(chars.to('hello world'))
const truncate = str =>
    chars.from(chars.to(str).slice(0, 3)).concat('...')

const res2 = truncate('hello world')

// Singleton array that holds only 1 value of a is isomorphic to 
//['a'] ~ Either null a

const singleton = Iso(e => e.fold(() => [], x => [x]),
    ([x]) => x ? Right(x) : Left()
)

const filterEither = (e, pred) =>
    singleton.from(singleton.to(e).filter(pred))

const res3 = filterEither(Right('hello'), x => x.match(/h/ig))
    .map(x => x.toUpperCase()).fold(console.error, x => x)

console.log(
    res, // hello world
    res2, // hel...
    res3 // HELLO
)

```
## HttpGet + Other SideEffects

```js
const { Task, Either } = require('./ramda-x')
const { Right, Left, fromNullable } = Either
const request = require('request')

// isolation of side effects -> we are wrapping a side effect into a Task
const argv = Task((rej, res) => res(process.argv))
const id = argv.map(args => args.slice(2))

const url = id =>
    `https://jsonplaceholder.typicode.com/todos/${id}`


// isolation of side effects -> pure function
const httpGet = url =>
    Task((rej, res) =>
        request(url, (error, response, body) =>
            error ? rej(error) : res(body)))

const title = o => {
    return fromNullable(o.title)
}

// isolation of side effects -> pure function
const parse = Either.try(JSON.parse)

// type conversion from eitherToTask
const eitherToTask = e =>
    e.fold(Task.rejected, Task.of)


// pure function
const findPost = id =>
    httpGet(url(id))
        .map(parse)
        .chain(eitherToTask)

// pure function
const main = ([id]) =>
    Task.of(title => [title]).ap(findPost(id))

// impure function
id.chain(main).fork(console.error, x => console.log('success', x))
// success [ '{\n  "userId": 1,\n  "id": 1,\n  "title": "delectus aut autem",\n  "completed": false\n}' ]

```
