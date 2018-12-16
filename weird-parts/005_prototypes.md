[Source](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md)

* `[[Prototype]]`Objects in JS have an internal property, denoted in the specifications as `[[Prototype]]`, which is a reference to another object.

* The top-end of ervery normal `[[Prototype]]`chain is the built-in `Object.prototype`. This object includes a variety of common utitlities used all over JS, because all normal built-in object in JS descend from their top tier `[[Prototype]]` the `Object.prototype`.

  - Utilities like `.toString()` and `.valueOf()`
  
  ```js
  'use strict'

const map = function (f) {
    return this.constructor.of(f(this.flatMap(x => x)))
}

const flatMap = function (f) {
    return f(this.valueOf())
}


const box = x => ({
    __proto__: {
        constructor: box
    },
    map,
    flatMap,
    valueOf: () => x
})


box.of = box

console.log(
    box.of(2).map(x => x * 5).valueOf()
)


// All object have a constructor property
// All objects created without the explicit use of a constructor function 
//(i.e. the object and array literals) will have a `constructor` property that points to the Fundamental Object constructor type for that object

const obj = {}

console.log(obj.constructor === Object) // true 

function Tree(name) {
    this.name = name
}

const theTree = new Tree('Redwood')
console.log('theTree.constructor is: ' + theTree.constructor)

// theTree.constructor is: function Tree(name) {
//     this.name = name
// }


const box2 = x => ({
    valueOf: () => x
})

const box2Obj = box2(10)

console.log('the box2 constructor function is: ' + box2Obj.constructor)

// the box2 constructor function is: function Function() { [native code] }
// since the box2 wasn't created with a constructor function it's constructor points to the the Fundamenal Object consturor type

const box3 = x => ({
    __proto__: {
        constructor: box3
    }
})

box3.of = box3

const box3Obj = box3(20)

console.log('the constructor function of box3 is: ' + box3Obj.constructor)

// the constructor function of box3 is: x => ({
//     __proto__: {
//         constructor: box3
//     }
// })

const box4 = x => ({
    __proto__: {
        constructor: box3
    }
})

const box4Obj = box4(20)

console.log('the constructor functon of box4 ' + box4Obj.constructor)
console.log(box4Obj.valueOf()) // box3 {}

```
