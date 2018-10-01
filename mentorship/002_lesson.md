# What is a Closure

[Source](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36)

* A closure gives you access to an outer function’s scope from an inner function. 

* Closures are created every time a function is created, at function creation time.

* To use a closure, simply define a function inside another function and expose it. To expose a function, return it or pass it to another function.

* In JavaScript, closures are the primary mechanism used to enable data privacy.

```js
const getSecret = (secret) => {
  return {
    get: () => secret
  };
};
const obj = getSecret(1);
obj.get() // 1
``` 

Note: In the example above, the `.get()` method is defined inside the scope of `getSecret()`, which gives it access to any variables from `getSecret()`, and makes it a privileged method. In this case, the parameter, `secret`.

* Closures can also be used to create stateful functions whose return values may be influenced by their internal state, e.g.:


```js
const secret = msg => () => msg
```

* In functional programming, closures are frequently used for partial application & currying:
	a) Application: The process of applying a function to its arguments in order to produce a return value.
	b) Partial Application: The process of applying a function to some of its arguments. The partially applied function gets returned for later use.


# Notes from the Live Session
```js
console.clear();

const rotate = ([first, ...rest]) => [...rest, first];

console.log(
  rotate([1,2,3]) // [2,3,1]
);

const obj = {
  name: 'Dimitri',
  permissions: 'level1, level2',
  setAvatar (avatar) {
    this.avatar = avatar;
  	return this;
  }
};

class Foo  {
  constructor () {
    this.avatar = 'default.png';
    this.setAvatar = avatar => {
      this.avatar = avatar;
      return this;
    };
  }
}

const myFoo = new Foo();
myFoo.setAvatar('myfoo.png');

console.log(myFoo.avatar);

console.log(obj.setAvatar.call({ name: 'eric' }, 'superman.png'));

// name = 'Anonymous', avatar = 'anonymous.png'
const { name = 'Anonymous', avatar = 'anonymous.png' } = obj

console.log(avatar);


/*
What is functional programming?

Functional programming is a pragramming paradigm using pure functions as the atomic unit of composition, avoiding shared mutable state and side-effects.

* Pure functions
* Composition
* Avoid shared mutable state
* Isolate side-effects
*/

const add = a => b => a + b;

const inc = add(1);

/*
Pure functions:
* Given same input, always return the same output. (determinism)
* No side-effects.

Referrential transparency: You can replace a function call with its return value without changing the meaning of the program.

// algebra, not JS
f(x) = 2x

f(2) // same as below
4    // same as above

All functions with referrential transparency are safe to memoize.
*/

