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

### 4. Constructor Invocation

* Constructor invocation is performed when `new` keyword is followed by an expression that evaluates to a function object. 

```js
function Country(name, traveled) {
	this.name = name ? name : 'United Kingdom'
  	this.traveled = Boolean(traveled)
}

Country.prototype.travel = function () {
	this.traveled = true
}

const france = new Country('France', false)
const uk = new Country

```

* `new Country('France', false)` is a constructor invocation of the `Country` function. The result of execution is a new object, which name property is `France`. 

```js
class City {
constructor(name, traveled) {
this.name = name
this.traveled = false
}
travel() {
  this.traveled = true
}
}

const paris = new City('Paris', false)
paris.travel()
```
* `new City('Paris', false) is a constructor invocation. The object initialization is handled by a special method in the class: `constructor`, which has `this` as the newly created object.

* A constructor call reates an empty new object, which inherits propertis from constructor's prototype. The role of constructor function is to initialize the object. The context in this type of call is the created instance.

* When a property accessor myObject.myFunction is preceded by `new` keyword, JavaScript will execute a constructor invocation, but not a method invocation. For example: `new Object.myFunction()`first the function is extracting using a property accessor `extractedFunction = myObject.myFunction`, then invoked as a constructor to create a new object: `new extractedFunction()`

### 4.1 `this`in constructor invocation

* `this`is the newly created object in a constructor invocation

![Constructor](https://dmitripavlutin.com/content/images/2017/01/5-1.png)

```js
function Foo() {
	console.log(this instanceof Foo) // true
  	this.property = 'Default Value'
}

const fooInstance = new Foo()

console.log(
  fooInstance.property // Default Value
)
```

* `new Foo() is making a constructor call where the context is `fooInstance`. Inside `Foo` the object is initialized: `this.property`is assigned with a default value.

```js
class Bar {  
  constructor() {
    console.log(this instanceof Bar); // => true
    this.property = 'Default Value';
  }
}
// Constructor invocation
var barInstance = new Bar();  
barInstance.property; // => 'Default Value'  
```
**Important:** At the time when `new Bar()` is executed, JavaScript creates an empty object and makes it the context of the constructor method. Now you can add propertis to object using `this`keyword: `this.property = 'Default Value'` 


* Just some another examples
```js
const test = {
	name: 'test',
  	f() {return this.name}
}

test.hello = function() {return this}
const x = test.hello

console.log(
	test.f(), // test
  	test.hello(), // test object
  	x() // undefied
  	x.call(test) // test object
)
```
## 5. Indirect Invocation

* Indirect invocation is performed when a function called using `myFunn.call()` or `myfun.apply()`methods. 

* Functions in JavaScript are first-calls objects which means that a function is an object! The type of this object is `Function`

* From the list of methods that a function object has, `.call()` and `.apply()`are used to invoke the function with a configurable context.

* The method `.call(thisArg[, arg1, [, arg2[,...]]])` accepts the first argument `thisArgs` as the context of the invocation and a list of arguments `arg1, arg2`that are passed as arguments to the called function

```js

const obj = {
    numberA: 10,
    numberB: 15
}


const add = function (a, b) {
    return this.numberA + this.numberB + a + b
}

console.log(
    add.call(obj, 5, 6) // 36
)
```

* The method `.appyl(thisArg, [arg1, arg2, ...])` accepts the first argument `thisArg` as the context of the invocation and an **array-like object** of values `[arg1, arg2, ...]` that are passed as arguments to the called function.

```js

const obj = {
    numberA: 10,
    numberB: 15
}


const add = function (a, b) {
    return this.numberA + this.numberB + a + b
}

console.log(
    add.call(obj, 5, 6), // 36 -> expects arguments after the thisArg, arg1, arg2 etc.
    add.apply(obj, [5, 6]) // 36 -> expects as the second argument array with arguments
)
```

* The main difference between the two is that `.call()` accepts a list of arguments, for example `myFun.call(thisValue, 'val1', 'val2')`. But `.apply()` accepts a list of values in an array-like object e.g. `myFunc.apply(thisValue, ['val1', 'val2'])`

## 5.1 `this` in indirect invocation

* `this` is the first argument of `.call()` or `.apply()`in an indirect invoation.

![This](https://dmitripavlutin.com/content/images/2017/01/6-1.png)

```js
const lion = { name: 'Jimbo' }

function concatName(string) {
    console.log(this === lion)
    return string + this.name
}

console.log(
    concatName.call(lion, 'Hello '), // Hello Jimbo
    concatName.apply(lion, ['Hello ']) // Hello Jimbo
)

```

```js
const inc = function (number) {
    return ++number
}

console.log(
    inc.call(undefined, 10), // 11
    inc.apply(undefined, [10]) // 11
)
```
* The indirect invocation is useful when a functions should be executed with a specific context. For example to solve the context problems with function invocation, where `this` is always `window` or `undefined` in stric mode. **It can be used to simulate a method call on an object**

* But it doesn't work with arrow functions

```js
const lion = { name: 'Jimbo' }

const concatName = (string) =>
    string + this.name


console.log(
    concatName.call(lion, 'Hello '), // Hello undefined
    concatName.apply(lion, ['Hello ']), // Hello undefined
)

```

* Another practical example is creating hierarchies of classes in ES5 to call the parent constructor. `runner.call(this, name)` inside `Rabbit` makes an indirect call of the parent function to initialize the object.

```js
function Runner(name) {
    console.log(this instanceof Rabbit) // true
    this.name
}

function Rabbit(name, countLegs) {
    console.log(this instanceof Rabbit) // true
    Runner.call(this, name)
    this.countLegs = countLegs
}

const myRabbit = new Rabbit('White Rabbit', 4)

console.log(
    myRabbit // Rabbit { countLegs: 4}
)

```

## 6. Bound function

* A bound function is a function connected with an object. Usually it is created from the original function using `bind()` method. 

* The method `.bind(thisArg[, arg1[, arg2[, ...]]])` accepts the first argument `thisArg` as the context

```js
function multiply(number) {
    'use strict'
    return this * number
}


const double = multiply.bind(2)

console.log(
    double(5) // 10
)
```
* **Note:** `multiply.bind()2`returns a new function object `double`, which is bound with number `2`. `multiply`and `double` have the same code and scope. Whereas `.apply()` and `.call()`methods invoke the function right away, the `bind()` method only returns a new function that is supposed to be invoked later with a pre-configured `this`

## 6.1 `this` in bound function

* `this` is the first argument of `.bind()` when invoking a bound function

> The role of `.bind()`is to create a new function, which invocation will have the same context as the first argument passed to `bind()`. 

![bind](https://dmitripavlutin.com/content/images/2017/01/7-1.png)

```js
const numbers = {
    array: [3, 5, 10],
    getNumbers: function () {
        return this.array
    }
}

const boundGetNumbers = numbers.getNumbers.bind(numbers)
const simpleGetNumbers = numbers.getNumbers


console.log(
    boundGetNumbers(), // [3, 5, 10]
    simpleGetNumbers() // undefined or throws an error in strict mode
)

```

* `numbers.getNumbers.bind(numbers` returns a function `boundGetNumbers` that is bound with `numbers`object. Then `boundGetNumbers()` is invoked with `this` as `numbers` and returns the correct array object.

* The function `numbers.getNumbers` can be extracted into a variable `simpleGetNumbers` without binding. On later function invocation `simpleGetnumbers()`has `this` as `window`or `undefined` in strict mode, but not `numbers` object.

## 6.2 Tight context, binding

> `bind()` makes a premanent context link and will always keep it. A bound function cannot change its linked ocntext when using `.call()` or `.apply()` with a different context, or even a rebound doesn't have any effect.

```js
function getThis() {
    'use strict'
    return this
}

const one = getThis.bind(1)

console.log(
    one(), // 1
    one.call(2), // 1
    one.apply(2), // 1
    one.bind(2)(), // 1
    new one() // -> Object {}
)
```
* Only `new one()` changes the context of the bound function, other types of invocation always have `this` equal to 1.
