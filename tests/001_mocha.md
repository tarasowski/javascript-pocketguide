  # Testing JavaScript for Node.js with Mocha

  [Source of the course on Pluralsigth](https://app.pluralsight.com/player?course=mocha-javascript-testing-nodejs&author=jonathan-mills&name=mocha-javascript-testing-nodejs-m0&clip=0&mode=live)

* Mocha
* Chai for asserts
* Sinon for mocking
* Istanbul for code coverage

Node changes fast, 3 month release cycle. 

## Types of Testing

* Unit Tests: simple functions test
    + find the smallest available piece (single function)
    + Test just that (that's it not more)
    + Mock everything else with Sinon

**Testing a function**
```js
['admin', 'user'], 'admin'

function isAuthorized(neededRole) {
    return roles.indexof(neededRole) >= 0
}
```
Create a test and just pass `admin` and see if it gives me the right return. You are just testing a function if it works as it should work.

**Note:** We just want to make sure that the function works. It is easier to write a small little unit test and wrap this little function and tweak this function with a test. Then to build whole application around it and run the whole application to see if everything works.

* Integration Tests: integration between systems (other pieces of code)
    + Lets tie some things together
    + Test their interactions (Sinon spy etc.)
    + Moch the outside resources 

* Functional Tests: end to end
    + Test everything all together
    + Start on the outside, end on the outside
    + Black box testing (http to and return this thing back)
    + Make sure everything fits together

## Dealing with Node Versions

This change very rapidly. 

### Nvm to the Rescue

Nvm helps us to use different versions of code.

* [Install NVM](https://github.com/creationix/nvm)
* Install the right version of node you need for Lambda we need 6.10 by typing `nvm install 6.10`
* You need additonally install the latest lts version of node `nvm install --lts` [here more info](https://github.com/creationix/nvm#long-term-support)
* By typing `which node` it shows you the current version of node
* If you want to switch back or forth between version, just type in `nvm use --lts` or `nvm use 6.10` it should switch to the version you like. 

### What if something changes

Node version or Mocha changes?

He has created a github repo with all the code [link to the repo](https://github.com/jonathanfmills/TestingNodeWithMocha)

## Mechanincs of Mocha

Mocha is a test runner. There are several test runners there is Mocha there is Jasmine, there is Justin and others. All mocha is a mechanism by which tests are executed. The tests are written in JavaScript.

* `npm init -y` 
* `npm install mocha`
* `mocha --version` 
* install mocha locally `npm install --save mocha` 

You need to create a folder test, because mocha is going to look for this folder implicitly. 

Here we are using BDD style (Behavior Driven Development):
**Behavior Driven testing is an extension of TDD. Like in TDD in BDD also we write tests first and the add application code.**

## What is assert and how test passes/fail

Assert passes if it works and if it fails it throw an exception and test stops. 

**Important:** In order to show mocha which files to test in which directories, we need to add to package.json following configuraiton under scripts `"test": "mocha \"./test/**/*.spec.js\""`. What it does it will test all files including in all folders all files that has a following structure `name.spec.js` 

The cool thing about the BDD is style as we are writing the tests we are writing what the function should do. Here is a simple use case:

```js
const AuthController = () => {
    const isAuthorized = (roles, neededRole) => {
        return roles.indexOf(neededRole) >= 0
    }

    return {isAuthorized}
}

module.exports = AuthController()
``` 

Here is the test

```js
const assert = require('assert')
const authController = require('../../controllers/auth.controller')

describe('AuthController', () =>{
    describe('isAuthorized', () => {
        it('Should return false if not authorized', () => {
            assert.equal(false, authController.isAuthorized(['user'], 'admin'))
        })
        it('Should return true if authorized', () => {
            assert.equal(true, authController.isAuthorized(['admin'], 'admin'))
        })
    })
})
```

Here is the result of our test:

```
AuthController
    isAuthorized
      ✓ Should return false if not authorized
      ✓ Should return true if authorized
2 passing (10ms)
``` 

The cool thing about structure of this test is that is exactly describes what our function should do:

1. AuthController Function
    2. is Authorized
        + if no return false
        + if yes return true


## Async Testing

In order to do async testing we need to pass `done()` into our function in order to throw an exception if we are done with the async call. Here is an example below for async testing:

```js
const assert = require('assert')
const authController = require('../../controllers/auth.controller')

describe('AuthController', () =>{
    describe('isAuthorized', () => {
        it('Should return false if not authorized', () => {
            assert.equal(false, authController.isAuthorized(['user'], 'admin'))
        })
        it('Should return true if authorized', () => {
            assert.equal(true, authController.isAuthorized(['admin'], 'admin'))
        })
    })
    describe('isAuthorizedAsync', () => {
        it('Should return false if not authorized', (done) => {
            authController.isAuthorizedAsync(['user'], 'admin', (isAuth) => {
                assert.equal(false, isAuth) // we are looking for exception here
                done()
            })
            
        })
    })
})
``` 

## Async Functions and Timeouts

In the example above we have a waiting time of `0ms` for waiting and sending the callback back to the queue in order to be called/invoked. Now if we set `2100ms` we are going to get an error 

```js
//Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.
``` 

We can deal with this issue by modified the mocha context. You can modify the context directly by using the `this` keyword, because this function is executed inside mocha. We can change the context of each test by accessing the properties/ methods of the mocha object.

```js
describe('isAuthorizedAsync', () => {
        it('Should return false if not authorized', (done) => {
            this.timeout(2500)
            authController.isAuthorizedAsync(['user'], 'admin', (isAuth) => {
                assert.equal(false, isAuth) // we are looking for exception here
                done()
            })
```

Here with `this.timeout(2500)` we can specifically change the context of the function by increasing the timeout to `2500ms`.

Mocha suggest not to use arrow function because the `this` keyword gets bound to the lexical scope. Lexical Scoping just means that it uses `this` from the code that contains the Arrow Function. [Source](https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4)

## Hooks

We can use hooks in order to avoid posting the same data over and over again and violate the DRY principle.

```js
beforeEach(() => {
    console.log('running before each')
    authController.setRoles(['user'])
})
``` 
You need to look at nesting. Since the `beforeEach()` can be nested inside the `describe()` functions. We can do it on top of the first `describe()` or inside each one. You are using `beforeEach()` if you want to setup e.g. sandbox environment. Because you want to see your tests more autonomous and not built upon each other. 

**Note:** If we want to run something before every test. If you put `beforeEach()` above the first `describe()` and it will be applied to all the tests even if it's in a separate file. Because `beforeEach()` is outside of it's describes it's going to run it for every test that it gets run, it takes the `beforeEach()` and takes it to the global describe. Use function names and descriptions to describe your functions.

## Pending Tests in Mocha

You can simply add `it()` without a callback and only the description it will be shows as a pedning test. Instead of letting comments, we can have some pending tests

```js
it('Should not allow a get if not authorized')
it('Should allow get if authorized')
``` 

```
AuthController
    isAuthorized
      ✓ Should return false if not authorized
      ✓ Should return true if authorized
      - Should not allow a get if not authorized
      - Should allow get if authorized
    isAuthorizedAsync
      ✓ Should return false if not authorized (2103ms)

  Basic Mocha Test
    ✓ should not throw any errors


  4 passing (2s)
  2 pending
``` 

**Note:** If we want to run a specific set of tests we can simply add to the `describe.only()` and it will run only this test. So you can focus on the stuff that you are currently working on.

**Note:** If you want to skip tests and sections that are failing because of someone has checked in broken code or something else. You want to work on your stuff. You can simply add `describe.skip()` and it's going to skip the tests. The tests that are skipped are going to be shows as pending in the console. If we don't want to run a test and creating an `if` condition, we can simply use `this.skip()` it's going to be shown as pending 

A test suite in mocha is a block of unit tests that are closely related because they test the same function or they test similar parts of the code base. We introduce a test suite in mocha using `describe()`. Describe is a function that takes two arguments: a string and another function. 


In other words, a test suite is a collection of specs/testcases united by a common property, logic. For instance, you may have suites for different types of functionality of your application, homepage, search etc:

a collection of test cases that are intended to be used to test a software program to show that it has some specified set of behaviours. A test suite often contains detailed instructions or goals for each collection of test cases and information on the system configuration to be used during testing.

**Note:** The first thing we need to test is the service. The author always starts with a failing test.