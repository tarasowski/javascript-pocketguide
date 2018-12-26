# Understanding null, undefined and NaN.

[Source](https://codeburst.io/understanding-null-undefined-and-nan-b603cb74b44c)

* A `null` value represents a reference that points, genreally intentionally, to a nonexistent or invalid object or address.

* The global `undefined` proprety represents the primiitve value `undefined`. It basically tells us that something isn't defined.

```js
let a
console.log(
  a // undefined
)
```

* `undfined` has its own data type `undefined`, null is only an object

```js
const a = { a: 'a'}
a.a // 'a'
a.b// undefined
a.b.map() // TypeError: Cannot read property 'map' of undefined
a.b.c // TypeError: Cannot read property 'c' of undefined
null.map() // TypeError: Cannot read property 'map' of null
```
* If a property on an object is not there it will return undefined

```js
const a = { a: 'a'}
a.a // 'a'
a.b// undefined
```

```js
const { Either } = require('ramda-x')

const findColor = name => ({ green: 'green' }[name])

const user = {
    address: {
        city: 'Berlin'
    }

}

console.log(
    findColor('green'), // green
    findColor('blue'), // undefined
    Either.fromNullable(findColor('blue')).map(x => x * 2).fold(err => err, x => x), // 'null'
    Either.fromNullable(user).chain(user => Either.fromNullable(user.name)).chain(name => Either.fromNullable(name.street)).fold(err => err, x => x) // 'null'
)

```
