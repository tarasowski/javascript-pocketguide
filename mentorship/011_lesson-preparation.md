Notes $vi functor.txt 


Press ENTER or type command to continue
const f = n => n + 1
const g = n => n * 2

// Composition law

const r1 = u.map(x => f(g(x)))
const r2 = u.map(g).map(f)

r1.map(x => (console.log(x), x)) // 5
r2.map(x => (console.log(x), x)) // 5
```
* Now you can map over any data type just like you can map over an array.

```js
// Fold function to get the value out of the Functor

const Identity = value => ({
        map: fn => Identity(fn(value)),
        fold: () => value
})
```

```js
// Full version

const Identity = value => ({
map: fn => Identity(fn(value)),
valueof: () => value,
toString: () => `Identity(${value})`,
[Symbol.iterator]: function* () {yield value},
constructor: Identity
})

Object.assign(Identity, {
        toString: () => 'Identity',
        is: x => typeof x.map === 'function'
})

```
* Functors are things we can map over. More specifically, a functor is a mapping form category to category. A functor can even map from a category back to the same category (endofunctor).

* A category is collection of objects, with arrows between objects. Arrows represent morphisms (aka functions, aka compositions). Each object in a category has an identity morphism (x => x). For any chain of objects `A -> B -> C`there must exist a composition `A -> C`.

* Functors are great higher-order abstractions that allows you to create a variety of generic functions that will work for any data type.

* Abstraction hide things. Abstraction are good to create re-usable / generic solutions that can be applied to an instance of the specific problem


~                                                                                                                                                                         
