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