# Mostly Adequate Guide - Book

[Source](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch03.md)

* If we want to make an object immutable in JavaScript we can use `const immutableState = Object.freeze({minimum: 21})`

* Once `Object.freeze()` was applied there is no possibility to change the object that was applied to that function.

* Pure functions should be self-documenting. Everything the function needs is handed to it on a silver platter. A function's dependecnies are explicit and therefore easier to see and understands.

```js
//impure
const signUp = attrs => {
  const user = saveUser(attrs)
  welcomeUser(user)
}

// pure
const singUp = (Db, Email, attrs) => {
  const user = saveUser(Db, attrs)
  welcomeUser(Email, user)
}

// pure & composition
const saveUser = db => attrs => /..../
const welcomeUser = email => user => /..../

const signUp = compose(welcomeUser, saveUser)
signUp(attrs)

```

* In the case above the pure function is honest about it's dependencies and as such tell us exactly what it's up to. Just from its signature, we know that it will use a `Db`, `Email`, and `attrs`. 

* Something else i simportant that we are forced to "inject" dependencies, or pass them in as arguments, which makes our app much more flexible because we've parameterized our database or mail client.

* One of the biggest advantages of pure functions is that they can be run in parallel, since they does not need access to shared memory and it cannot, by defintion, have a race condition due to some side effect.

> We need to separate the impure functions from the rest of the pure code!

* When we spoke about pure functions, we said they take 1 input to 1 output. Currying does exactly this: each single argument returns a new function expecting the remaining arguments. No matter if the output is another function - it qualifies as pure.

#### Point free composition & Composition

```js
const toUpperCase = x => x.toUpperCase()
const exclaim = x => `${x}!`
const shout = compose(exclaim, toUpperCase)
shout('send in the clows') // SEND IN THE CLOWNS
```

* Here is an example how you can get the head and the tail of a list!

``js
const head = x => x[0]
const reverse = reduce((acc, x) => [x].concat(acc), [])
const last = compose(
    head,
    reverse,
)
console.log(last(['jumpkick', 'roundhouse', 'uppercut'])) // uppercut
```

* We use `compose()` and not `pipe()` because we want to mirror th emathematical version much more closely as it stands.

* Composition is associative, meaning it doesn't matter how you group two of them. So, should we choose to uppercase the string, we can write:

```js
compose(toUpperCase, compose(head, reverse)) // UPPERCUT
compose(exclaim, compose(toUpperCase, head), reverse) // UPPERCUT!
```
* Since we are using here pure functions, we are always returing an output and that is expected as an input for the next funtion in the composition

> The associative property states that you can add or multiply regardless of how the numbers are grouped. By 'grouped' we mean 'how you use parenthesis'. In other words, if you are adding or multiplying it does not matter where you put the parenthesis. Add some parenthesis any where you like!.

```js

const loudLastUpper = compose(exclaim, toUpperCase, last)
console.log(loudLastUpper(args)) // UPPERCUT!

const angry = compose(exclaim, toUpperCase)
const loudLastUpperNew = compose(angry, last)
console.log(loudLastUpperNew(args)) // UPPERCUT!
```

**Note:** Pointfree style means never having to say your data. It means functions that never mention the data upon which they operate. 

```js
//no point free
const snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_')

// point free
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase)
```

* What we are doing is pipping our data through each function of 1 argument. Currying allows us to prepare each function to just take its data, operate on it, and pass it along. 

```js
const initials = name = > name.split(' ').map(compose(toUpperCase, head).join('. ')
initials('hunter stockton thompson')
```
1. You create a function that is a curried. The data should always come last!
```js
const replace = curry((re, rpl, str) => str.replace(re, rpl));

const toLowerCase = s => s.toLowerCase();
```
2. You preload the functions with the arguments to make it specialize and compose them together
```js
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```
3. Now you apply the data to every function in the composition.
```js
snakeCase('hunter stockton thompson') // 'H. S. T'
```

* Pointfree code can again, help us remove needless names and keep us concise and generic. Pointfree is a good litmus test for functional code as it lets us know we've got small functions that take input to output. 

> Not all function code is pointfree and that is O.K. We'll shoot for it where we can and stick with normal functions otherwise.

### Composition connects our functions together like a series of pipes. Data will flow through our application as it must - pure functions are input to output after all. We hold composition as a design principle above all others. This is because it keeps our app simple and reasonable. 

```js
const { compose, reduce, prop } = require('ramda-x')

const cars = [
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true,
    },
    {
        name: 'Mercedes Benz C',
        horsepower: 150,
        dollar_value: 50000,
        in_stock: true,
    },
]

// not fp way
const isLastInStock = (cars) => {  
  const lastCar = last(cars);  
  return prop('in_stock', lastCar);  
};  

// fp way
const head = x => x[0]
const reverse = reduce((acc, x) => [x].concat(acc), [])
const last = compose(head, reverse)
const istLastInStock = compose(prop('in_stock'), last)
istLastInStock(cars)
```
* In the example above we use composition instead of assignments of values inside the function.

```js
const { map, compose, reduce, prop } = require('ramda-x')

const cars = [
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 15000,
        in_stock: true,
    },
    {
        name: 'Mercedes Benz C',
        horsepower: 150,
        dollar_value: 5000,
        in_stock: true,
    },
]

// non fp way
const averageDollarValue = (cars) => {  
  const dollarValues = map(c => c.dollar_value, cars);  
  return average(dollarValues);  
};  

// fp way
const add = (acc, val) => acc + val
const average = xs => reduce(add, 0, xs) / xs.length
const averageDollarValue = compose(average, map(prop('dollar_value')))
console.log(averageDollarValue(cars)) // 10000
```

```js
const { map, compose, reduce, prop, filter } = require('ramda-x')

const cars = [
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 15000,
        in_stock: true,
    },
    {
        name: 'Mercedes Benz C',
        horsepower: 150,
        dollar_value: 5000,
        in_stock: true,
    },
    {
        name: 'Couper Mini',
        horsepower: 250,
        dollar_value: 2500,
        in_stock: false,
    },
]


// not fp way - Important here the sortBy(), last() and concat() functions are hidden
const fastestCar = (cars) => {  
  const sorted = sortBy(car => car.horsepower);  
  const fastest = last(sorted);  
  return concat(fastest.name, ' is the fastest');  
};  

// fp way
const sort = (arr, val) => {
    return [
        ...arr.filter(n => prop('horsepower', n) <= prop('horsepower', val)),
        val,
        ...arr.filter(n => prop('horsepower', n) > prop('horsepower', val))
    ]
}
const sortBy = xs = reduce(sort, [])

const head = x => x[0]
const reverse = reduce((acc, x) => [x].concat(acc), [])
const name = x => x.name
const concat = label => data => data + label

const sortComp = compose(concat(' is the fastest car'), name, head, reverse, sortBy)

console.log(sortComp(cars)) // Aston Martin One-77 is the fastest car

// another possibility for higher abstraction

const getValueOfProperty = prop('horsepower')
const smaller = val => arr => arr.filter(n => getValueOfProperty(n) <= getValueOfProperty(val))
const bigger = val => arr => arr.filter(n => getValueOfProperty(n) > getValueOfProperty(val))

const sort = (arr, val) => {
    return [
        ...smaller(val)(arr),
        val,
        ...bigger(val)(arr)
    ]
}
const sortBy = xs = reduce(sort, [])

const head = x => x[0]
const reverse = reduce((acc, x) => [x].concat(acc), [])
const name = x => x.name
const concat = label => data => data + label

const sortComp = compose(concat(' is the fastest car'), name, head, reverse, sortBy)

console.log(sortComp(cars)) // Aston Martin One-77 is the fastest car
```

## 07 - Types

* Types are the meta language that enables people from all different background to communicate. For the most part, they are written with a system called "Hidely-Milner".

* Types can be inferred so there's no need for explicit compile time checks, but also turn out to be the best possible documentation available.

* JavaScript is a dynamic language, but that does not mean we avoid types all together. We're still working with strings, numbers, booleans etc. **It's just that there isn't any language level inegration so we hold this information out our heads.**

* Since we're using signatures for documentation, we can use commments to serve our purpose.

```js
// capitalize :: String -> String
const capitalize = s => toUpperCase(head(s)) + toLowerCase(tail(s))
capitalize('smurf') // Smurf
```
* Here `capitalize` takes a `String` and returns a `String`. No we can neglect the implementation only by looking at the string

* In Hidely-Milner (HM), functions are written as `a -> b`are variables for any type.

* So the signature for `capitalize` can be read as 'a function from `String` to `String`'. It takes a `String`as its input and returns a `String`as its output.

```js
// strLenght :: String -> Number
const strLenght = s => s.length

// join :: String -> [String] -> String
const join = curry((what, xs)) => xs.join(what)

// match :: Regex -> String -> [String]
const match = curry((reg, s) => s.match(reg)
// replace :: Regex -> String -> String -> String
const replace = curry((reg, sub, s) => s.replace(reg, sub))
```
* Without fully understanding the details, you could always just view the last type as the return value.

**Note:** `xs` means a list in functional programming and comes from Haskell. `x:xs` where `x` is the head and `xs` is the rest. 

```js
// match :: Regex -> (String -> [String])
const match = curry((reg, s) => s.match(reg))
```
* Grouping the last part in the parenthesis reveals more information. Now it is seen as a function that takes `Regex`and returns us a function from `String` to `String`. Because of currying, this is indeed the case: give it a `Regex`and we get a function back waiting for its `String` argument. 

```js
// match :: Regex -> (String -> [String])
// onHoliday :: String -> [String]
const onHoliday = match(/holiday/ig)
```
* Each argument pops one type off the front of the signature. `onHoliday` is `match`that already has a `Regex`.

```js
// replace :: Regex -> (String -> (String -> String))
const replace = curry((reg, sub, s) => s.replace(reg, sub))
```
```js
// id :: a -> a
const id = x => x
```
* The `id`function takes any old type `a` and returns something of the same type `a`. We're able to use variables in types just like in code. Variable names like `a` and `b` are convention, but they are arbitrary and can be replaced with whatever name you'd like. **Important:** `a -> b` can be any type `a` to any type `b`, but `a -> a`means it has the same type. For example `id`may be `String -> String`or `Number -> Number`, but not `String -> Bool`.

```js
// map :: (a -> b) -> [a] -> [b]
const map = curry(f, xs) => xs.map(f)
``` 
* `map` here `b` which may or may not be the same type as `a`. We can read it as: `map` takes a function from any type `a`to the same type or different type `b`, then takes an array of `a`'s and results in an array of `b`s. It literally tells us what the function does almost word for word. It's given a function from `a`to `b`, an array of `a`, and it delivers us an array of `b`. 

```js
// head :: [a] -> a
const head = xs => xs[0]

//filter :: (a -> Bool) -> [a] -> [a]
const filter = curry((f, xs) => xs.filter(f))

// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = curry((f, x, xs) => xs.reduce(f, x))
```
* `reduce` we see the first argument is a function that expects a `b`, and `a` and produces a `b`. Where might it ge these `a`s and `b`s? Well, the following arguments in the signature are a `b`and an array of `a`s, so we can only assume that the `b` and each of those `a`s will be fed in. The result of the function is a `b`so the thinking here is our final incantation of the passed in function will be our output value. 

```js
//head :: [a] -> a
```
* Looking at `head`, we see that it takes `[a]`to `a`. Besides the concrete type `array`, it has no other information available and, therefore, its functionality is limited to working on the array alone. Also `a` says it cannot be a specific type, which means it can be any type, which leaves us with a function that must work uniformly for every conceivable type. **This is what parametricity is all about.** Guessing at the implementation, the only reasonable assumptions are that it takes the first, last, or a random element from that array. The name `head` should tip us off.

```js
// reverse :: [a] -> [a]
```
* In the example above we see that `reverse` cannot do anything specific to `a`. It cannot change `a` to a different type or we would introduce a `b`. Can it sort? Well, no it wouldn't have enough information to sort every possible type. Can it re-arrange? Yes, I suppose it can do that, but it has to do so in exactly predictable way. 

**Note:** This narrowing of possibility allows us to use type signature search engine like [Hoogle](https://www.haskell.org/hoogle/) to find a function we're after. 

### Free as in Theorem
```js
// head :: [a] -> a
compose(f, head) === compose (head, map(f))

// filter :: (a -> Bool) -> [a] -> [a]
compose(map(f), filter(compose(p, f))) === compose(filter(p), map(f))
```

* The first theorem says that if we get the `head`of our array, then run somve function `f` on it, that is equivalent to, and incidentally, much faster than, if the first `map(f)` over every element then take the head of the result. 

* The `filter`theorem is similar. It says that if we compose `f`and `p` to check which should be filtered, then actually apply the `f`via `map`. 

#### Constraints

```js
//sort :: ord a => [a] -> [a]
```
* What we see on the left side of our fat awwor here is the satement of a fact: `a` must be an `Ord`. Or in other words, `a`must implement the `Org` interface. In a typed language it would be a defined interface that says we can order the values. This not only tells us more about the `a` and what our `sort`function is up to, but also restrics the domain. We call tehse interface declarations type constraints.

```js
// assertEqual :: (Eq a, Show a) => a -> a -> Assertion

```
* Here we have two constraints: `Eq` and `Show`. Those will ensure that we can check equality of our `a`s and print the differentce if they are not equal.

```js
// then :: Promise p => (a -> b) -> p a -> p b
const then = curry((f, anyPromise) => anyPromise.then(f))
```
* Finally for `then`, the `Promise p =>` tells us that `p` must be a Promise, which means that `p a`and `p b`will be promises holding `a` and `b`respectively. The same goes for other standard built-in objecgs such as Array.
