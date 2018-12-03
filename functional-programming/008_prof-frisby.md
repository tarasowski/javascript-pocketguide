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
``´
