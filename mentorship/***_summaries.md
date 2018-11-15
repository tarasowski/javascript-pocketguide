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

