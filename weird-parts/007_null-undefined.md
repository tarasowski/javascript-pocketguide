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
* [Source](https://dmitripavlutin.com/7-tips-to-handle-undefined-in-javascript/)

* Common scenarios to get `undefined`
  1) A delcared variable that is not yet assigned with a value (uninitialized) is by default undefined `let a`
  2) When accessign a non-existing object property, JavaScript returns `undefined` `const obj = {a: 'a'}; obj.b // undefined`
  3) The function parameters implicitly default to `undefined` `const f = (x, y, z) => x + y + z; f(10) // y = undefined, z = undefined`
  4) Functions without `return` statement return `undefined`
  5) You get `undefined` when accessign an array element with an out of bounds index `cons arr = [1, 2,3]; arr[5] // undefined`
  
### Difference between `undefined` and `null`

* The main difference is that `undefined` represents a value of a varaible that wasn't yet initialized, while `null` represents an intentional absence of an object. 

### Other Examples

```js
const a = document.getElementById('a')
console.log(
  a // null
)
```
  
