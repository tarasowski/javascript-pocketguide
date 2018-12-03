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
