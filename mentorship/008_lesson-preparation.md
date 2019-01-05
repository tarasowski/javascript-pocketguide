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
