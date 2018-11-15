# Abstraction & Composition

* [Source](https://medium.com/javascript-scene/abstraction-composition-cb2849d5bdd6)

* Abstraction is about removing things. Abstration in Yiddish means `absentminded`a person is running on autopilot, not actively thinking about what they are doing.

> Abstration lets us run on autopilot. All software is automation. Anything you do on a computer, you could do with paper, ink and carrier pigeons. All software is abstration.

* We remove duplication by writing a component (function, module, class, etc..) giving it a name (identity), and reusing it as many times as we like.

**Note:** The process of decomposition is the process of abstraction. 

> Software solutions should be decomposable into their component parts, and recomposable into new solutions, whichout changing the internal component implementation details.

* Abstraction in software: algorithms, data structures, modules, classes, frameworks.

> Sometimes, the elegant implementationis just a function. Not a method. Not a class. Not a framework. Just a function.

* Functions are great for abstrations because they have:

- Identity: The ability to assign a name to it and reuse it in different contexts.
- Composition: The ability to compose simple functions to form more complex functions.


**Function composition**
```js
const add = a => b => a + b
const inc = add(1)
inc(3) // 4
```

* In the case above `inc` is just the specialized version of `add`. All curried functions are abstractions.

* `map()` is a higher order function that abstract the idea of appyling a function to each element of an array.

```js
const map = f => arr => arr.map(f)
```

* This verison of `map` takes the specializing function and then returns a specialized version of itself that takes the array to be processed.

```js
const f = n => n * 2
const doubleAll = map(f)
const doubled = doubleAll([1, 2, 3])
```

* Characteristics of good abstraction:

1. Simple
2. Concise
3. Reusable
4. Independent
5. Decomposable
6. Recomposable

# JavaScript Factory Functions vs Constructor Functions vs Classes

* [Source](https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e)

* In JavaScript, any function can return a new object. When it's not a constructur function or class, it's called a factory function.


**Factory function**
```js
const proto = {
drive() {
  console.log('Vroom!')
}
}

function factoryCar() {
  return Object.create(proto)
}
const car3 = factoryCar()
```

**Constructor (new Keyword)**
```js
function ConstructorCar() {
  ConstructorCar.prototype.drive = function () { console.log('Vroom!')}
}

const car2 = new ConstructorCar()
```

**Class (new Keyword)**
```js
class ClassCar {
  drive() {
  console.log('Vroom!')
  }
}

const car1 = new ClassCar()
```

* In Constructors & Class the `this` keyword refers to the new object. You need to use `new` to instantiate a class & constructor.

> The cool thing about factories is that they’re not just more powerful and more flexible, they’re also the easiest way to encourage entire teams, and entire API user bases to use patterns that are simple, flexible, and safe.

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
```
# JavaScript Factory Functions with ES6+

[Source](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1)

* A factory function is any function which is not a c lass or constructor that returns a object. In JavaScript, any function can return an object. When it does so without the new keyword, it's a factory function.

```js
const user = {
userName: 'echo',
avatar: 'echo.png'
}

const key = 'avatar'
console.log(user[key]) // echo.png
```
* You can access computed property names using square bracket notation.

```js
const userName = 'echo'
const avatar = 'echo.png'

cost user = {
  userName,
  avatar,
  setUserName (userName {
  this.userName = userName
  return this
  }
}

console.log(user.setUserName('Foo').userName) // 'Foo'
```

> `this` refers to the object which the method is called on.

* If you need to create many objects, you'll want to combine the power of object literals and factory functions. With a factory function, you can create as many user objects as you want.

```js
const createUser ({userName, avatar}) => ({}
  userName,
  avatar,
  setUserName (UserName) {
  this.userName = userName
  return this
  }
)

console.log(createuser({userName: 'echo', avatar: 'echo.png'})

/*
{
  "avatar": "echo.png",
  "userName": "echo",
  "setUserName": [Function setUserName]
}
*/
```

**Note:** Arrow functions `=>` have an implicit return feature, if the function body consists of a single expression, you can omit the return keyword: `() => 'foo'`. If you want to return object literals you need to use `() => ({name: 'Dimitri'})`. The parentheses force the braces to be interpreted as an expression to be evaluated, rather than a function body block.

* We can use computed property keys. In this example `arrToObj` takes an array consisting of a key7value pair (aka a tuple) and converts it into an object.

```js
const arrToObj = ([key, value]) => ({[key]: value})
console.log(arrToObj(['name', 'Dimitri']) // {'name': 'Dimitri'}
```
* Using default parameters, for documentation of expected interface for `createUser` factory.

```js
const createUser = ({
  userName = 'Anonymous',
  avatar = 'anon.png'
} = {}) => ({
userName,
avatar
})
```

> Factories are great at cranking out objects using a nice calling API.

**Note:** A mixin is a class that contains methods for use by other classes without having to be the parent class of those other classes.

```js
const withConstructor = constructor => o => ({
  __proto__: {},
  ...o
})

const withFlying = o => {
  let isFlying = false
  return {
  ...o,
  fly() {
    isFlying = true
    return this
  },
  land() {
    isFlying = false
    return this
  },
  isFyling: () => isFlying
  }
}

const withBattery = ({capacity}) => o => {
  let percentCharged = 100
  return {
    ...o,
    draw (percent) {
      const remaining = percentCharged - percent
      percentCharged = remaining > 0 ? remaining : 0
      return this
    },
    getCharge: () => percentCharged,
    getCapacity () {
      return capacity
    }
  }
}

const createDrone = ({capacity = '3000mAh'}) => pipe(
  withFyling,
  withBaterry({capacity}),
  withConstructor(createDrone)
)({})

const myDrone = createDrone({capacity: '5500mAh'})

console.log(`
  can fly:  ${ myDrone.fly().isFlying() === true }
  can land: ${ myDrone.land().isFlying() === false }
  battery capacity: ${ myDrone.getCapacity() }
  battery status: ${ myDrone.draw(50).getCharge() }%
  battery drained: ${ myDrone.draw(75).getCharge() }%
`);
console.log(`
  constructor linked: ${ myDrone.constructor === createDrone }
`);

```

* Composition is more of a way of thinking than a particular technique in code. You can accomplish it in many ways. Function composition is the easiest way to build it up from scratch, and factory functions are a simple way to wrap a friendly API around the implementation details.

> Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function. Start with the simplest implementation, and move to more complex implementations only as required.
