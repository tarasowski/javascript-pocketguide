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
