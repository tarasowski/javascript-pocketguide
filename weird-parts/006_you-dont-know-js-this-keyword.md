* `this` keyword is a special identifier keyword that's automatically defined in the scope of every function 

```js
function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify.call(this);
    console.log(greeting);
}

var me = {
    name: "Kyle"
};

var you = {
    name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER
```

* Instead of relying on `this`, you could have explicitly passed in a conext object to both `identitfy()`and `speak()`

```js
function identify(context) {
    return context.name.toUpperCase();
}

function speak(context) {
    var greeting = "Hello, I'm " + identify(context);
    console.log(greeting);
}

identify(you); // READER
speak(me); // Hello, I'm KYLE
```

* This doesn't refer to a function's lexical scope.

*  `this`is not an author-time binding but a runtime buinding. It is contextual based on the conditions of the function's invocation. 
*  `this`has nothing to do with binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called.

*  to understand `this` binding, we have to understand the call-site: the location in code where a function is called (not where its declared)
// we must inspect the call-site to answer the question: what's `this`is reference to?

## DEFAULT BINDING

```js
function foo() {
    console.log(this)
}

foo() // it returns the global object in case if `use strict` it returns undefined
```

## IMPLICIT BINDING

* If the call-site has a context object, also referrred to as an owning or containing object.

```js
const obj = {
    a: 2,
    foo: foo
};


function foo() {
    console.log(this.a);
}


obj.foo(); // 2
```

## IMPLICITLY LOST

* A function can loose that binding and fallback to default binding either global or `undefinded` depending ont `strict mode`

```js
const obj = {
    a: 2,
    foo: foo
};

function foo() {
    console.log(this.a);
}

const bar = obj.foo; // function reference/alias!

bar(); // "global object"
```

* here the call site matters, which is plain, un-decorated call and thus the default binding applies either global or undefined

```js
const obj = {
    a: 2,
    foo: foo
};

function foo() {
    console.log(this.a);
}


function doFoo(fn) {
    // `fn` is just another reference to `foo`

    fn(); // <-- call-site!
}

doFoo(obj.foo) // global object
```

* Parameter passing as here obj.foo is just an implicit assignment and since we're passing a function, it's an impicit reference assignment. The cal site matters and that a function and not a method call

## EXPLICIT BINDING

* If you want to force a function call to use an object for the `this` binding, without putting a property function reference on the objet. 
*  we can use .call() and .apply() method calls that are on the [[Prototype]] of a function

```js
const obj = {
    a: 2
};


function foo() {
    console.log(this.a);
}


foo.call(obj); // 2
```

* Invoking `foo` with explicit binding by `foo.call(...)`allows us to force its `this` to be `obj`

## HARD BINDING

*  Explicit binding still doesn't offer any solution to the issue of a function 'loosing' its intended `this` binding.

```js
const obj = {
    a: 2
}

function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

const bar = foo.bind(obj);

const b = bar(3); // 2 3
console.log(b); // 5
```

* `bind()` returns a new function that is hard-coded to call the original function with the `this`context set as you specified

* many new built-in functions in the JavaScript language and host environment, provide an optional parameter, ausually called `context`which is designed as a work-around for you not having to use `bind()`to ensure your callback function uses a praticular `this``

```js
const obj = {
    id: "awesome"
};

function foo(el) {
    console.log(el, this.id);
}


// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach(foo, obj); // 1 awesome  2 awesome  3 awesome
```

## `new`BINDING

* constructor are special methods attached to classes that when the class is instantiated with a `new` operator, the constructor of that class is called

* In JS constructors are just functions that happen to be called with the `new`operatior in front of them. They are not attached to classes nor are they instantiating a class. They are not even special types of functions. They're just regular functions that are, in esense, hijacked by the use of `new`in their invocation.

* For example, the `Number(...)`function acting as a constructor. When Number is called as part of new expression it is a constructor: it initialises the newly created object.

* The built-in object function like `Number()` can be called with `new`in front of it, and that makes that function call a consturctor call. 

```js
function foo(a) {
    this.a = a;
}

const bar = new foo(2)
console.log(bar.a) // 2
```

* By calling `foo(..)`with `new` in front of it, we've constructed a new object an set that new object as the `this`for the call of `foo(...)`. So `new`is the final way that a function calls's `this`can be bound.

### Determining `this`

Now, we can summarize the rules for determining `this` from a function call's call-site, in their order of precedence. Ask these questions in this order, and stop when the first rule applies.

1. Is the function called with `new` (**new binding**)? If so, `this` is the newly constructed object.

    `const bar = new foo()`

2. Is the function called with `call` or `apply` (**explicit binding**), even hidden inside a `bind` *hard binding*? If so, `this` is the explicitly specified object.

    `const bar = foo.call( obj2 )`

3. Is the function called with a context (**implicit binding**), otherwise known as an owning or containing object? If so, `this` is *that* context object.

    `const bar = obj1.foo()`

4. Otherwise, default the `this` (**default binding**). If in `strict mode`, pick `undefined`, otherwise pick the `global` object.

    `const bar = foo()`

That's it. That's *all it takes* to understand the rules of `this` binding for normal function calls. Well... almost.

