# Treehouse - JavaScript Unit Testing

[Source](https://teamtreehouse.com/library/javascript-unit-testing/introducing-unit-testing/introduction)


## Behaviour Driven Development (BDD)

We write special functions called tests for our application before we write any code. In order words TESTS describe the expected behavior of our applicaiton. 

We will build our test to cover a small unit at the time. This is called unit testing. Since unit tests focus on small chunk of functionality. 

We write a code and see if it's breaks! JavaScript programmers often add `console.log()` to their functions to see what `this` refers too etc.

## Console.log() = Manual Testing / Problems with Manual Testing

* Difficult to write effectively
* Impacts the actual code (create a lot of code to test the functions)
* Very hard to read (you need to remove everything that you have added just for testing)
* only a temporary fixes if we use `console.log()` etc.

# Automated Testing with Mocha

A suite is a of tests functions. Mocha is a test runner and let's run our tests whenever we want to. 

Developers use test suite in different ways sometimes:

* Some use it to refere to whole collection of our tests. 
* Sometimes it means a particular selection of tests that are related e.g. for login to the website might compose the test suite

**The team that created mocha uses test suite to describe a specific group of related tests.**

**Note:** If you get an error e.g. `at Context.<anonymous> (test/unitities_spec.js:23:25)` It simply means there is a problem on LINE 23 COLUMN 25 in the `unilities_spec.js` file. VS Code provides the possibility to go to the line:column. Simply use `^G` as a shortcut. And BTW `^` means control on mac!

```js
1) gatherNamesOf should give me the name of the object passed in:                                            
     AssertionError: expected undefined to equal 'Günter'                                                      
      at Context.<anonymous> (test/utilities_spec.js:23:25)
``` 

* Our test suite can cover all important functions and the results are displayed in an informative way
* Test files are completely separate from real code, so we don't have to make any changes or clean up our live code later
* Output is easy to read and to understand, it's much easier to interpreate what we are seeing here instead of `console.log()`
* And we can be sure that our code runs over and over again. It guarantees that the code works as expected. Anytime we make a change anywhere.
* Instantly see if anything has broken when making changes. 

## Different types of testing

* Unit testing: writing tests that confirm an individual function or piece of code works the way we want it to. We write unit tests for a code that has a clear and specific purpose:
      + Unit tests for individual functions in our program. The unit test will call the function without running our entire application to make sure that the function behave as we expect. 
      + We need to run unit tests constantly during our development process to make sure everything is working everytime we make a change. 
* Integration testing: you use integration testing when you add new code to pre-existing code. To make sure that not only all pieces work alone as expected, but also that they work together correctly without breaking.
* End-to-end testing: we fire up the application and run it from start to finish for other user stories we can think of. This ensures that our program can go live and special details of deployment don't screw up the stuff we have tested on our local machine and dev environment. (only a few times during a product lifecycle > very time-consuming and expensive)

## Behavior Driven Development (BDD)

BDD is an approach to building software (it's not a type of testing). If we start to write our software it helps to start to write it with a brainstorm or an outline so you always have an idea where you head. 

> Behavior Driven Development is like creating a plan before you write a program. Instead of writing a bunch of code and see if it works, with BDD you write tests frist, and code second. BDD starts with the description of the behavior of parts of the program. How should this function behave when something happens, what should we expect back from the function if we give an number instead of a string. 

At first our expectations won't be met, because our functions don't even exists yet. So the output of the tests will be red. So step by step we code our functions until the tests pass. That is when red errors are replaced with green cheking marks. As we fix the errors we get new errors that five us guidence to write next piece of our function.

### Red > Green > Refactor Development Cycle
**At first you don't look at the code or write an efficient code, you just want to see the test pass. If our tests pass, we can be confident that our functions really do what they suppose to. At this point we can go to our function and change things, like making it nicer to read or faster to run - Refactoring** 

1. Write the tests, even though they'll fail (they don't even compile at first, because they refer to things that don't exist yet)
2. Write the easiest code we can that passes the test
3. Go back and refactor the function and improve the passing code
4. Repeat until you are ready to move on

```js
const expect = require('chai').expect


expect(true).to.be.true

const titleCase = (title) => {
    return title
}

// starting to write the first expectation for the title function
// we are starting with a failing test since we are working acc. to red>green>refactor
expect(titleCase('the great mouse detective')).to.be.a('string')
``` 
We started first to write a test and expectations for the function above. We added the function. We added `return title` to meet our expectations and we passed a test. Our expectations aren't really accurate yet and this is an important lesson about testing, we can pass all our test even if it doesn't works correctly. [Writing Great Unit Tests: Best and Worst Practices](http://blog.stevensanderson.com/2009/08/24/writing-great-unit-tests-best-and-worst-practises/)

<<<<<<< HEAD
BBD (Behavior Driven Development) we write our tests before we start writing our application. What separates unit testing from logging to the console is that tests describe expected behaviors, unit tests focus on concrete output of functions without worrying about how the function does it. 

## New Test Project Setup

1. You need to initialise the project `npm init -y`
2. You need to install dependencies `npm install mocha --save-dev`, `npm install chai --save-dev` etc.
3. You need to adjust your `package.json` file in order to run all tests from a folder automatically
4. Add a `test` folder and add following to the `package.json` file `"test": "mocha"` 
      + It makes it easy to import code from other files in our project
      + Easy to organise the tests
      + Easy to find a test file after seeing its output in the console
5. Now can run `npm test` in the console and we'll get the same output as running mocha

**Note:** If we want to customize which files from which directory should run, we can simply add additional information to the `package.json` file. For example we can add `"test": "mocha \"./test/**/*.spec.js\""` it will run all files in the `directory` and all other subdiretories files that have `.spec.js`as their naming.

## Starting my first test

Test suite is a block of unit tests. We need first to start with the **Test suite** a test suite consists of related tests because they test a the same function or they test similar parts of our code base. Expectation is either passes or throwing an error. 

```js
const expect = require('chai').expect

// Test suite
describe('test chai', () => {
     // Test spec (unit test)
   it('should return true', () => {
    expect(true).to.be.ok
    })
    
 })
```  

**What is a sanity check?**: A trivial function or test that proves we set things up correctly
Which Mocha function groups similar tests together? `describe()`
Which Mocha function groups similar expectations together, representing a single unit test? `it()`


This is how a sanity check could look like

```js
const expect = require('chai').expect

// Test suite
describe('test chai', () => {
     // Test spec (unit test)
   it('should return true', () => {
    expect(true).to.be.ok
    })
    
 })

// output ✓ should return true 
``` 

Note: `undefined` means there is no value, you can check it by using if/else statement or only if conditions

```js
let ship;

const f = () => {
  if (!ship) {
    console.log('ship is undefined')
    return
  }
  console.log('ship is defined')
  return
}

// output ship is undefined
``` 


**Note:** Normally a single unit test shouldn't have more than 1 expectation, since it might be confusing for someone who reads the test. 
=======
**Note:** If you write a test you need to break it into smaller `asserts` or `expectations`. Usually the most comprehensive expectation should we written last. The simple expectations will be written first. We need to think about the smallest piece of the problem.

```js
const expect = require('chai').expect

function titleCase (title) {
  return title 
}

expect(titleCase('the great mouse detective')).to.be.a('string')
expect(titleCase('a')).to.equal('A') // the smallest expectation we can test

expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective')
``` 

Now we are adding another expectaton

```js
const expect = require('chai').expect

function titleCase (title) {
  return title.toUpperCase()
}

expect(titleCase('the great mouse detective')).to.be.a('string')
expect(titleCase('a')).to.equal('A')
expect(titleCase('vertigo')).to.equal('Vertigo') // added another small expectation

expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective')
``` 

Runnint the test gives us the same problem as before, but it helps to keep the problem small and comprehensible by defining our expectation to only one word. 

```
const expect = require('chai').expect

function titleCase (title) {
  return title.toUpperCase()
}

expect(titleCase('the great mouse detective')).to.be.a('string')
expect(titleCase('a')).to.equal('A')
expect(titleCase('vertigo')).to.equal('Vertigo)

expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective')
``` 
Here are the steps that we were doing from small to comperehensive expectation and the function `titleCase()` was always transformed in order to meet the expecations of each step

```js
const expect = require('chai').expect

function titleCase (title) {
  const words = title.split(' ')
  const titleCasedWords = words.map(element => {
    return element[0].toUpperCase() + element.substring(1)
  })
  return titleCasedWords.join(' ' )
  
}

expect(titleCase('the great mouse detective')).to.be.a('string')
expect(titleCase('a')).to.equal('A') // Step 1: one letter
expect(titleCase('vertigo')).to.equal('Vertigo') // Step: 2 one word
expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective') // Step 3: full title 
``` 

This is a very simple example now we need to extend the function `titleCase()` and cover all the edge cases with it! What if people will add some strange characters etc.? 
<<<<<<< HEAD

## Making Tests Easier with Fixtures

For example if we need to simulate an object within each test we can use fixtures not to DRY. So we need to fake or mock the player object in order to test the function. Mocha comes up with several functions to setup conditions for our tests. Like creating test object or simulating conditions within our test. This is called the setup phase the part of our test where we set our conditions in our tests. In Mocha we have:

* before()
* beforeEach()

### before()
In order to use these both functions we need first to initialise the variable inside the `describe()` - test suite and then add the `before()` block with e.g. an object we need to have. The `before(function(){})` needs a function to setup any state the tests need. By adding the state needed into the `before()` all tests will have access to this state. So there is no need to pass e.g. an object with the state into each test you are creating that are within a single test suite. 


```js
describe('PLAYER METHODS', function () {
  describe('validateLocation', function () {
    var validateLocation = require('../game_logic/player_methods.js').validateLocation;
    var player;

    beforeEach(function () {
      player = {
        ships: [
          {
            locations: [[9, 9]]
          }
        ]
      };
    });

    it('shoud confirm valid for unoccupied locations in range', function () {
      var location = [0, 0];
      var actual = validateLocation(player, location);

      expect(actual).to.be.ok;
    })
``` 

### beforeEach()
If a function that we want to set is doing side-effects such as changing the state or pushing something into an object. We need to reset it and use the `beforeEach()

### Teardown

In addition if the tests change the environment like creating and writing to database or startup a local server. We can use the teardown block to setup the system back to the starting point. You'll need teardowns more often if your test pretend to need a database or interact with the DOM somehow. For example you can test a function that setups up a remote database or create a local file or starts a server instance. If these functions starts their job, they are going to pulute the environment with the bunch of testing tables or files. 

**Note:** We should avoid passing state between our test suites. That adds unnecessary complexity and room for error. Remember our tests should be clever, they don't need to do anything fancy, they should prove our basic expectations. 

In order to destroy objects we can use `after()` and `afterEach()` hooks.  `after()` takes one function that will run at the end of the test suite when every spec has finished. Just like `after()` the `afterEach()` block has a function that will run at the very end of each test in our test suite. 

## Writing tests first as an outline

* Write tests retroactively (if we need to cover code that was written but not covered by any tests)
* Only focus on what a function does and focus only on that part
* Write simple expectations first and get them to pass before writing more involved ones

### Edge Case

An edge case is a radical situation when your function might end up in but it's not how your function normally work. For example an email validator might work when users type properly formatted emails but if they type non-sense by accident? 

**Note:** If you are starting with a new project that has a good test coverage. The first thing you can do in order to understand the logic, you can run the tests and see what you'll get as the output and which steps are covered by the test. 

One of the best things of BDD is that our code is always testable. It has to be because we write our tests first, but if you end up with code before tests it can be hard to have unit tests for existing functions. That's because some code is not testable

### Testable Code

In programming we call tight-coupling, when to distinct functions are bundled up so they can only be used together. Now the hallmark of tightly-coupled code is that it makes our job in writing unit tests harder. So the refactor the 
=======
>>>>>>> 1f5b0dbba6d00cc1f59652f41d28ca7f9162ad64

### Testable Code

```js
function computerFire(player) {
  const x = Math.floor(Math.random() * 9)
  const y = Math.floor(Math.random() * 9)
  const coordinates = [x, y]

  fire(player, coordinates)
}

function computerPlaceShip(player, ship) {
  const direction = Math.random() > 0.5 
    ? 'horizontal'
    : 'vertical'

    const x = Math.floor(Math.random() * 9)
    const y = Math.floor(Math.random() * 9)
    const coordinates = [x, y]
    placeShip(player, ship, coordinates, direction)
}
``` 
The problem with the functions above they produce random results. The problem with the functions above is that they have random outcomes built-in. Each of these functions really does different things:

1. They build a random location
2. Then they do something with that location `fire(player, coordinates)` || `placeShip(player, ship, coordinates, direction)` -> In programming we call this tight coupling, when to distinct functions are bundled up so they can only really be used toghther. The problem with tightly-coupled code is that is does our unit tests write harder. 

To refactor this code we can just abstract two ideas apart. We see that the same code appears in both functions `computerFire()`&& `computerPlaceShipt()` it's the array that generates the coordinates. So we can pull it out in it's own function that generates the results. 

```js
function getRandomCoordinates() {
  const x = Math.floor(Math.random() * 9)
  const y = Math.floor(Math.random() * 9)
  return [x, y]
}

function getRandomDirection() {
  return Math.random() > 0.5 
    ? 'horizontal'
    : 'vertical'
}

fire(player, getRandomCoordinates())
placeShip(computerPlayer, computerPlayer.ship[0], getRandomCoordinates(), getRandomDirection())

``` 

**Note:** We also can reuse the `getRandomCoordinates()`and `getRandomDirection()` in other parts of our program as well if we need to. That's a big plus. More reusable code will save us time later. In this way we don't have to add any tests at all in fact this is another thing that writing tests helps us with. When it's hard to write tests for something you might wonder whether you really need that function in the first place in this way writing tests can guide us towards simpler code, we still can do super meaningful tests for the randomizer functions, because randomizer functions have random nature. But we pulled the random pieces apart from our application code so that other parts remain testable. **Thinking about unit test have improved our code making it more reusable and modular. 

## Reporter

If you have many tests running and want only to see the failing tests you can use `mocha --reporter min`and will only display the failing tests. The same functionality should exist in tape as well. 

**Note:** You can also print your reports in a markdown format, so you can upload them e.g. on github and other reports can read your tests. You can do that by using the following command `mocha --reporter markdown`. You can find more reports in the [Mocha Documentation](https://mochajs.org/#reporters). If you want to use another reporter you can add it in the `package.json` file in the test command like this `"test": "mocha --reporter nyan"`

If you want to run your tests in a `nodemon` style you can simply add a command to the package.json file. If you save one of the files in the `test` folder your tests are going to run automatically. 

```json
"scripts":  {
  "test": "mocha",
  "test:watch": "mocha --watch ./test ./"
 }
``` 

## Mocks && Stubs

Mocks and stubs are two kind of fake helpers for our test suites. We were also using some fake helpers like the objects that has some random data already in the tests above. Mocks and stubs are fake functions that are filling the gaps for our test unit dependencies. Developers sometimes don't agree about the difference between mocks and stubs:

* Sinon Stubs: Stubs are more hands-on than spies (though they sound more useless, don’t they). With a stub, you will actually change how functions are called in your test. You don’t want to change the subject under test, thus changing the accuracy of your test. But you may want to test several ways that dependencies of your unit could be expected to act.

* Sinon Spies: Spies sound like what they do – they watch your functions and report back on how they are called. They generally avoid the violence and mayhem of a Hollywood spy, but depending on your application, this could vary.

*  Sinon Mocks: Mocks take the attributes of spies and stubs, smashes them together and changes the style a bit. A mock will both observe the calling of functions and verify that they were called in some specific way. And all this setup happens previous to calling your subject under test. After the call, mocks are simply asked if all went to plan.

[Why Use Fakes?](https://jaketrent.com/post/sinon-spies-vs-stubs/)

### Testing Asynchronous Code

Testing asynchronous code with Mocha could not be simpler! Simply invoke the callback when your test is complete. By adding a callback (usually named done) to it(), Mocha will know that it should wait for this function to be called to complete the test. This callback accepts both an Error instance (or subclass thereof) or a falsy value; anything else will cause a failed test.

[Mocha Documentation](https://mochajs.org/#asynchronous-code)

>>>>>>> f984ddb5f648336e360ea1849aa8530801f12fa7
