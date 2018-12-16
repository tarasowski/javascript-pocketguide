[Source](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md)

* `[[Prototype]]`Objects in JS have an internal property, denoted in the specifications as `[[Prototype]]`, which is a reference to another object.

* The top-end of ervery normal `[[Prototype]]`chain is the built-in `Object.prototype`. This object includes a variety of common utitlities used all over JS, because all normal built-in object in JS descend from their top tier `[[Prototype]]` the `Object.prototype`.

  - Utilities like `.toString()` and `.valueOf()`
