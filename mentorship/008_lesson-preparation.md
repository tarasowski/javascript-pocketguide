# Cost of Skipping TDD 

[Source](https://medium.com/javascript-scene/the-outrageous-cost-of-skipping-tdd-code-reviews-57887064c412)

* It takes 30% longer to build-out projetc with TDD
* TDD reduces production bug density 40%-80%
* Fixing a production bug costs 100x more than fixing a bug at design time
* Each context switch can cost up to 20 minutes of developer productivity
* An interrruped task takes about twice as long to complete and contains twice as many errors as an uninterrupted task. (see [Maker's Schedule, Manager's Schedule](http://www.paulgraham.com/makersschedule.html))

# 5 Questions Every Unit Test Must Answer

[Source](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)

* Your tests are your first and best line of defense agains software defects
* Your tests are more important than linting & static analysis (cannot find the problems with your logic)
* **Tests are important as implementation itself**
* Writing test first gives you a clearer perspective on the ideal API design
* Test descriptions enshrine in code every implemented feature requirement
* When a test fails, that test failure report is often your first and best clue about exactly what went wrong
* What's in a good test failure bug report?
  1) What were you testing?
  2) What should it do?
  3) What was the output (actual behavior)?
  4) What was the expected output (expected behavior)?

* Start with a string. What should the feature do? `'compose() should return a function.'`
* Now we are passing the information into a test runner `test('Compose function output type.', assert => {})`

> If the only available assertion in every test suite was `equal()`, almost every test suite in the world would be better for it. Because `equal()` by nature answers the two most important questions every unit test must answer: 1) What is the actual output?, 2) What is expected output?

* Now you need to add the actual and expected behavior for testing

```js
const actual = typeof compose() // the actual value must be produces by exercising some of the component's public API
const expected = 'function'
```

* Here is the final result

```js
import test from 'tape';
import compose from '../source/compose';

test('Compose function output type', assert => {
  const actual = typeof compose();
  const expected = 'function';

  assert.equal(actual, expected,
    'compose() should return a function.');

  assert.end();
});
```

* A Unit Test Template

```js
import test from 'tape';

// For each unit test you write, answer these questions:

test('What component aspect are you testing?', assert => {
  const actual = 'What is the actual output?';
  const expected = 'What is the expected output?';

  assert.equal(actual, expected,
    'What should the feature do?');

  assert.end();
});

```

# JavaScript Factory Function vs. Constructor Functions vs. Classes

```js
// class
class CarClass {
	drive() {
    console.log('Vroom!')
    }
}

const car1 = new CarClass()
car1.drive() // Vroom!

// constructor
function ConstructorCar() {
}

ConstructorCar.prototype.drive = function() {
	console.log('Vroom!')
}

const car2 = new ConstructorCar()
car2.drive() // Vroom!


// factory

const proto = {
	drive() {
    	console.log('Vroom!')
    }
}

function factoryCar() {
	return Object.create(proto)
}

const car3 = factoryCar()
car3.drive() // Vroom!
```

* **Note:** The Object.create() method creates a new object, using an existing object as the prototype of the newly created object. [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

> In JavaScript, any function can return a new object. When it's not a constructor function or class, it's called a factory function.

* The main drawback of constructors and class is the caller is tightly couples to the constructor implementation. If you ever need the additional flexibility of the factory, the refactor is a breaking change.

> In JavaScript switching from a constructor or class to a factory is a breaking change.

* The main drawback of using class  is that it leads user to create problematic class hierarchies using the `extend` keyword. Calss hierarchies lead to a bunch of well-known problems in object oriented design, including the fragile base calss problem, the gorilla banana problem, the duplication by necesseity problem. 

* Factories are much more flexible than either consturctor functions or classes. You can return any arbitrary object and use any arbitrary prototype. 
  * No refactories worries, you would never have a need to convert from a factory to a constructor.
  * No `new`keyword. No ambiguity about using `new`.
  * Standard `this`behavior, `this`behaves as it normally would, so you can use it to access the parent object. Be aware that `this`doesn't refer to a the new object inside the factory.
