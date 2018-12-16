# Understanding Scope and Context in JavaScript

[Source](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)

* Scope and context are not the same

* Every function invocation has both a scope and a context associated with it. 

* Scope is function based, while context is object-based.

* Scope: pertains to the variable access of a function when it is invoked and is unique to each invocation.

* Context: is always the value of the `this` keyword which is a reference ot the object that `own`the currently executing code.

### What is `this` Context? Context is the value of `this`

* Context is most often determined by how a function is invoked. When a function is called as a method of an object, `this`is set to the object the method is called on.

* Context: it refers to the object within which function is executed. [Source](https://stackoverflow.com/questions/14328519/different-in-scope-and-context-in-this-javascript-code)

### Execution Context -> Scope related

* EXECUTION CONTEXT IS NOT EQUAL TO CONTEXT discussed before.

```js
console.log('its working')


// Lexical this
const bob = {
    _name: 'Bob',
    _friends: ['Mike'],
    printFriends() {
        this._friends.forEach(f =>
            console.log(this._name + ' knows ' + f))
    }
}


// Enhanced Object Literals

const theProtoObj = {
    a: '!!a!! from proto object'
}


const obj = {
    __proto__: theProtoObj,
    toString() {
        return 'd ' + super.toString()
    }
}


bob.printFriends() // Bob knows Mike

console.log(
    obj.a, // !!a!! from proto object
    obj.toString()
)

// Arrow function inherits `this` from the context in which they're created

const arrowObject = {
    name: 'arrowObject',
    printName: () => {
        console.log(this) // {}
    }
}

arrowObject.printName()

// How to understand the context where the function is created?

// 1. const arrowObject = {}
// 2. arrowobject.name = 'arrowObject
// 3. arrowobject.printName = () => console.log(this) // global object OR undefined

```
