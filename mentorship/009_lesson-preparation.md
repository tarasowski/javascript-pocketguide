# Functional Mixins

[Source](https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c)

* Functional mixins are composable factory functions which connect together in a pipeline, each function adding some properties or behaviros like workers on an assembly line.

* Functional mixins don't depend on or require a base factory or constructor: Simply pass any arbitrary object into a mixin, and an enhanced versio nof that object will be returned

* Functional mixins features:
  * Data privacy/encapsulation
  * Inheriting private state
  * Inheriting from multiple sources
  * No diamand problem (property collision ambiguity) - last in wins
  * NO base-class requirements
  
* All modern software development is really composition. We break a large, complex problem down into smaller, simpler problems, and then compose solutions to form an application.

* The atomic units of composition are one of two things:
  * Functions
  * Data structures
  
 > Application structure is defined by the composition of those atomic units.
 
 * Favor object composition over class inheritance - The Gang of Four
 
 * **Mixins** are a form of *object composition*, where component features get mixed into a composite object so that properties of each mixin become properties of the composite object.
 
 * The term 'mixin* in OOP comes from a mixin ice cream shops. You start with a vanilla ice cream, and a bunch of separete ingredients that could be mixed in to create custom flavors for each customer. Object mixins are similar.
 
**Note:** Because JavaScript support dynamic object extension and object without classes, using object mixins is trivially easy in Javascript.

```js
const chocolate = {
	hasChocolate: () => true
}

const caramelSwirl = {
	hasCaramelSwirl: () => true
}

const pecans = {
	hasPecans: () => true
}

const iceCream = Object.assign({}, chocolate, caramelSwirl, pecans)

console.log(
  iceCream.hasChocolate() // true
)
```

## Functional Inheritance

* Functional inheritance is the process of inheriting features by applying an augmenting function to an object instance. The function supplies a closure scope which you can use to keep some data private. The augmenting function uses dynmaic object extension to extend the object instance with new properties and methods.

```js
// Base object factory
function base(spec) {
    var that = {}; // Create an empty object
    that.name = spec.name; // Add it a "name" property
    return that; // Return the object
}
// Construct a child object, inheriting from "base"
function child(spec) {
    // Create the object through the "base" constructor
    var that = base(spec); 
    that.sayHello = function() { // Augment that object
        return 'Hello, I\'m ' + that.name;
    };
    return that; // Return it
}
// Usage
var result = child({ name: 'a functional object' });
console.log(result.sayHello()); // "Hello, I'm a functional object"
```

**Note:** Because `child()` is tightly couples to `base()`, when you add `grandchild()`, and `greatGrandChild()` you'll opt into most of the common problems from class inheritance.

## Functional Mixin

* Functional mixins are composable functions which mix new properts or behaviors with properties from a given object. Functional mixins don't depend on or require a base factory or constructor. Simply pass any arbitrary object into a mixin, and it will be extended.

```js

const flying = o => {
  let isFlying = false;
  return Object.assign({}, o, {
    fly () {
      isFlying = true;
      return this;
    },
    isFlying: () => isFlying,
    land () {
      isFlying = false;
      return this;
    }
  });
};

const bird = flying({})

console.log(
	bird.fly().isFlying(), // true
  	bird.land().isFlying() // false
)
```
**Note:** when we call `flying()`we need to pass an object in to be extended. Functional mixins are designed for function composition. 

* Functional mixins can be composed with simple function composition

```js
const quacking = quack => o => Object.assign({}, o, {
	quack: () => quack
})

const quacker = quacking('Quack!')({})

const createDuck = quack => quacking(quack)(flying({}))

const duck = createDuck('Quack!')

console.log(
	quacker.quack(), // Quack!
  	duck.fly().isFlying(), // true
  	duck.fly().quack() // Quack!!
)
```
* A working version with `compose()`

```js
const createDuck = quack => pipe(
  flying,
  quacking(quack)
)({})

const duck = createDuck('Quack!')
```
## When to use Functional Mixins
> You should always use the simplest possible abstraction to solve the problem you are working on. Start with pure function. If you need an object with persistent state, try a factory function. If you need to build more complex objects, try functional mixins.

**Remark:** React users `class`is fine for lifecycle hooks because callers aren't expected to use `new`, and documented best-practice is to avoid inheriting from any components other than the React-provided base component.

* To avoid **problems** with functional mixins, you should:
  * Use the simplest practical implementation: Start on the left and move to the right only as needed: pure functions > factories > functional mixins > classes
  * Avoid the creates of `is-a` relationships between object, mixins, or data types.
  * Avoid implicit dependencies between mixins - whenever possible, functional mixins should be self-contained, and have no knowledge of other mixins. 
  * Functional mixins doesn#t mean functional programming
  
> I rely mostly on function composition to compose behaviors and application structure, and only rerely need functional mixins or stamps. I never use class inheritance unless I'm descending directly from a third-party base class such as `React.Class`. I never build my own inheritance hierarchies. - Eric Elliot.

**Note:** Class inheritance is very rarely (perhaps never) the best approach in JavaScript.

* Functional mixins are composable factory functions which add properties and behaviors to objects like stations in an assembly line. They are a great way to compose behaviors from multiple source features (has-a, uses-a, can-do), as opposed to inheriting all the features of a given class (is-a). 

* Be aware, 'functional mixins' doesn#t imply 'functional programming' - it simply means, 'mixins using functions'. 

> Start with the simplest implementation and move to more complex implementeations only as required: Functions > objects > factory functions > functional mixins > classes
