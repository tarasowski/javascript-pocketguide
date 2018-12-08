# The mystery of `this`

[Source](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)

* `this` is a current execution context of a function. WHERE THE FUNCTION IS EXECUTED, AND NOT WHERE THE KEYWORD `this` KEYWORD IS PLACED...

* There are 4 function invocation types:
  - function invocation: fn(arg1)
  - method invocation: console.log(arg1)
  - constructor invocation: new AWS(arg1)
  - indirect invocation: fn.call(undefined, arg1)
  
> Each invocation type defines the context in its own way, so `this` behaves slight different.

**Note:** The key to understanding `this` keyword is having a clear view over function invocation and how it impacts the context.

* Terms:
  - Invocation of a function is is calling the function. Executing the code that makes the body of a function.
  - Context of an invocation is the value of `this`within function body. E.g. the invocation of map.set('key', 'value') hast the context `map`
  - Scope of a function is the set of variables, objects, functions accessible within a function body
  
 ### 2 Function invocation
 
 * For example [1, 5].join(',') is not a function invocation, but a method call.
 
 ```js
 function hello(name) {
  return 'Hello ' + name * '!'
 }
 
 // function invocation
 const message = hello('World')
 ```

### 2.1 `this`in function invocation

**Note:** `this`is the global object in a function invocation. The global object is determined by the execution environment. In browser it is the `window` object.

![This](https://dmitripavlutin.com/content/images/2017/01/2-1.png)

**Important:** In a function invocation the execution context is the global object. Function is within the `global execution context` means the `this` keyword is the window object.

```js
function sum(a, b) {
  console.log(this === window) // true
  this.myNumber = 20
  return a + b
}

sum(15,16) // 31
window.myNumber // 20
this // window object
```
* At the time `sum(15, 16) is called, JavaScript automatically sets this as the global object, which ins a browser is `window`

* When `this`  is used outside any function scope, it also refers to the global object.

```js
const that = this
``` 
* Sometimes people use it to get the right object for this.

### 2.2 `this` in function invocation, strict mode

* `this`is **undefined** in a function invocation in strict mode.

* Strict mode provides better security and error checking.

* The strict mode effects the execution context, making `this` to be undefined in a regular function invocation.

![Strict](https://dmitripavlutin.com/content/images/2017/01/3-1.png)

```js
function multipy(a, b) {
'use strict'
console.log(this === undefined) // true
return a * b
}

multiply(2, 5) // this is where the function is executed (global context) but with strict mode this is not set to the global object
```
**Note:** If strict mode is active, it's active for all functions.

### 2.3 Pitfall: `this` in an inner function

* A common trap with the function invocation is thinking that this is the same in an inner function as in the outer function.
* The context of the inner function depends only on invocation, but not on the outer function's context.

```js
const numbers = {
  numberA: 5,
  numberB: 10,
  sum: function() {
    console.log(this === numbers) // true
    function calculate() {
      console.log(this === numbers) // false
      console.log(this) // window object
      return this.numberA + this.numberB
    }
    return calculate()
  }
    
}

numbers.sum() // NaN
```
* `numbers.sum()` is A METHOD INVOCATION ON THE OBJECT, so the context in `sum`is `numbers`object. 

* `calculate` function is defined inside `sum`, so you might expect to have `this` as `numbers`object in `calculate()` too. Nevertheless `calculate()` is a function invocation (but not method invocation) and it has `this`as the global object `window` or `undefined` in strict mode.

* To solve the `NaN` problem, `calculate` function should be executed with the same context as the `sum` method.

* One solution is to change manually the context of `calculate` to desired one, by calling `calculate.call(this)` 

```js
const numbers = {
  numberA: 5,
  numberB: 10,
  sum: function() {
    console.log(this === numbers) // true
    function calculate() {
      console.log(this === numbers) // true
      console.log(this) // numbers object
      return this.numberA + this.numberB
    }
    // use .call() method to modify the context
    return calculate.call(this)
  }
    
}
```
* `calculate.call(this)` executes `calculate` function as usual, but additionally modifies the context to a value specified as the first parameter. Now `this.numberA + this.numberB`are equivalent to `numbers.numberA + numbers.numberB` 

> The call() method is a predefined JavaScript method. It can be used to invoke (call) a method with an owner object as an argument (parameter). 

### 3 Method Invocation

* A method is a function stored in a property of an object.

```js
const myObject = {
helloFunction: function() {return 'Hello World!'}
}

const message = myObject.helloFunction()
```

* `helloFunction` is a method of `myObject`. To get the method, use a property accessor: `myObject.helloFunction`

* Method invocation is performed when an expression in a form of property accessor that evalutes to a function object is followded by an open parenthesis.

> Property accessors provide access to an object's properties by using the dot notaton or the bracket notation.

* It's important to disinguish function invocation from method invocation, because they are different types. The main difference is that method invocation requires a proeprty accessor form to call the function (`obj.myFunc()` or obj.['myFunc'](), while function does not (`fn()`)

```js
const obj = {}
obj.myFunction = function () {return new Date().toString()}

const otherFunction = obj.myFunction

console.log(
  ['Hello', 'World'].join(' , '), // method invocation
  obj.myFunction(), // method invocation
  otherFunction(), // function invocation
  parseFloat('16.60'), // function invocation
  isNaN(0) // function invocation
)
```
### 3.1 `this` in method invocation

* When invoking a method on an object, `this` becomes the object itself.

![This](https://dmitripavlutin.com/content/images/2017/01/4-1.png)

```js
const calc = {
  number: 0,
  increment: function () {
      console.log(this === calc)
      this.number += 1
      return this.number
    
  }
}


console.log(
    calc.increment(), // 1
    calc.increment(), // 2
    calc.increment(), // 3
)
```
* Calling `calc.increment()` makes the context of `increment` function to be calc object. So using `this.number`to increment property is working well.

* A JavaScript object inherits a method from its `prototype`. When the inherited method is invoked on the object the context of the invocation is still the object itself.

```js
const myDog = Object.create({
  sayName: function() {
    console.log(this === myDog) // true
    return this.name
  }
})


myDog.name = 'Milo'
myDog.sayName() // Milo
```

* `Object.create()` creates a new object `myDog` and sets the prototype `myDog` object inherits `sayName` method.
* When `myDog.sayName()` is executed, `myDog` is the context of invocation.

```js
class Planet {
  constructor(name) {
    this.name = name
  }
  getName() {
    console.log(this == earth)
    return this.name
  }
}


const earth = new Planet('Earth')

console.log(
  earth.getName()
)
```

> A method from an object can be extracted into a separated vairable `const alone = myObj.method`. when the method is called `alone()`, detached from the original object, then `this` is the global object `window`or `undefined`.

* Creating a bound function `const alone = myObj.myMethod.bidn(myObj) fixes the context, aming it the object that owns the method.

```js
function Animal(type, legs) {
  this.type = type
  this.legs = legs
  this.logInfo = function () {
    console.log(this === myCat)
    console.log('The ' + this.type + ' has ' + this.legs + ' legs')
  }
}

const myCat = new Animal('Cat', 4)

setTimeout(myCat.logInfo, 1000)
```
* The method is separated fro its object when passed as a parameter: `setTimeout(myCat.logInfo)`

```js
setTimeout(myCat.logInfo)

const extractedLogInfo = myCat.logInfo

setTimeout(extractedLogInfo)
```

* When the separated logInfo is invoked as a function, `this` is global object or undefined in strict mode

* A functin can be bound with an object using `.bind()`method. 

```js
function Animal(type, legs) {
  this.type = type
  this.legs = legs
  this.logInfo = function () {
    console.log(this === myCat)
    console.log('The ' + this.type + ' has ' + this.legs + ' legs')
  }
}

const myCat = new Animal('Cat', 4)

setTimeout(myCat.logInfo.bind(myCat), 1000)
```

* `myCat.logInfo.bind(myCat)` returns a new function that executes exactly like logInfo, but has `this` as `myCat`.
