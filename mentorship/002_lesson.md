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

