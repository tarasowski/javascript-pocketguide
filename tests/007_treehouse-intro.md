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
>>>>>>> 1f5b0dbba6d00cc1f59652f41d28ca7f9162ad64
