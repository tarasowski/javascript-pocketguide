# Writing Functional JavaScript Using Ramda

[Source](https://app.pluralsight.com/player?course=javascript-ramda-functional&author=thiago-temple&name=javascript-ramda-functional-m1&clip=0&mode=live)

* Immutable data means we cannot change the value in the variable we need to create a new one.

* `x -> f(x) -> y` functions are for transforming the data or computing results. If the function receives `x` it will always return `y` there is no other hidden dependencies.

* In JavaScript functions are treated as data/values. Functons are first-class citizens. It means you can store functions in variables `const f = () => /.../` like any other data. 

```js
const f = function sayHello(name) {
  return 'Hello, ' + name
}

console.log(f.name) // sayHello 
console.log(f.call(null, name)) // Hello, Dimitri
f('Dimitri')
``` 

* Higher order functions: A funciton that takes another function as an argument or returns a function as a result. 

