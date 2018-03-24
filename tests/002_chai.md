# Introduction to Chai (BDD Style Assertions)

* Assert is clunky
* Chai for better assertions
* Chai has two options (not important which one you use)
    * expect
    * should
* Verifying objects (check values and object)

## Asset is clunky

`assert.eques(false, Auth)`

BDD is descriptive here our example form the functions

```js
describe('isAuthorized', () => {
    it('should return false if not authorized', (done) => {

    })
})
``` 

Assertion framework that is a little bit better and we are going with `expect` it looks like `expect(something).to`.. something else, we can change `assert` to `expect``

```js
expect(something).to.be
expect(something).to.equal
expect(something).to.have
```
We have these phrases these chains that we can use. Instead of `assert.equal(true, Auth)` we'll have `expect(auth).to.be.true`. It's cleaner and nicer way to do that.

## Should - Clear, Natural Language

`something.should` gives much more clear natural language style. It works in a way that `should()` add itself to the Object.prototype, it apends itself to the end of everything. Every object has now access to this method `should()`

```js
something.should.be..
something.should.equal..
something.should.have...
auth.should.be.true...
``` 

There are couple of problems connected to the `should()` so therefore it's better to use `expect()` in order to avoid this things.

**Note:** The author said an important point. When he is creating the tests, he likes first to fail the tests!!!

## What About Objects?

There are some thing on `should` or `expect` that let us test our objects. 

```js
describe('Basic Mocha Test', function () {
    it('should deal with objects', function () {
        let obj = {name: 'John', gender: 'male'}

        obj.should.have.property('roles')
    })
})
``` 

Should is not included anywhere but it runs. So should appends itself to `object.prototyp` and is globally available for all objects. It doesn't append itself just only for the file where we are loading `const should = require('chai').should()` it appends to `object.prototype` to the entire execution of this application. Should is now available everywhere!!!!

**Note:** Be aware of the `deep` flag if you want to compare two different object with the same properties. Since objects are stored by reference, objects with similar properties will not be true to each other. In order not to check the reference but the object properties you need to use the `deep` flag.

```js
let obj = {name: 'John', gender: 'male'}
let objB = {name: 'John', gender: 'male'}

    obj.should.deep.equal(objB)
``` 

Read the documentation if you want to learn more about these 3 different styles:

* Assert
* Expect
* Should

Full documentation on [Chai's Website](http://www.chaijs.com/guide/styles/)

The BDD (i.e., should and expect) interfaces facilitate writing tests that are expressive and readable by non-programmers. The natural language approach to expressing behaviors and expected outcomes may aid some teams in terms of communication, collaboration, and structure throughout the development process. On the other hand, the TDD (i.e., assert) interface is a bit more programmer-centric.

With that said, you can certainly adhere to either a BDD or TDD driven approach using any interface. The names merely categorize the interfaces based on their most common application.

[Difference between BDD and TDD](https://github.com/chaijs/chai/issues/935)

## Should has a problem

`null` is not an Object. 

That test should pass, but since null is not an object there is no should property on the prototype.
```js
const iAmNull = null
iAmNull.should.not.exit
``` 

If you want to test primites, they don't have a `should()` property on them, you will run into an error `TypeError: Cannot read property 'should' of null` 

Since we also have a should variable initialised (loaded the module), we can use this variable to check values that are not objects. This is a fallback!!!

```js
const assert = require('assert')
const should = require('chai').should()

describe('Basic Mocha Test', function () {
    it('should deal with objects', function () {
        let obj = {name: 'John', gender: 'male'}
        let objB = {name: 'John', gender: 'male'}

        obj.should.deep.equal(objB)
    })
    it('should allow testing nulls', () => {
        const iAmNull = null;
        should.not.exist(iAmNull)
    })
})
``` 

## Async with Promises

If we want to have promises in chai we need to install this library [chai as promised](https://github.com/domenic/chai-as-promised)

