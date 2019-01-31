# JavaScript Monads Made Simple

[Source](https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8)

* Remember, the essence of software development is composition, and monads make composition easier. Another look at Monads are:
    - Function map: `a => b`which lets you compose functions of type `a => b`
    - Functor map with context: `Functor(a) => Functor(b)`, which lets you compose functions `F(a) => F(b)`
    - Monads flatten and map with context: `Monad(Monad(a)) => Monad(b)`, which lets you compose lifting functions `a => F(b)`

* Functions help you reak down complex problems into simple problems that are easier to solve in isolation, so that you can compose them in various ways to form your application. 

* Function composition creates function pipelines that your data flows through. You put some input in the first stage of the pipeline, and some data pops out of the last stage of the pipeline, transformed. **But for that to work, each of the pipeline must be expecting the data type that the previous stage returns.

* Simple function composition
```
g: a => b
f: b => c
h = f(g(a)): a => c
```

* Functor function composition
```
g: F(a) => F(b)
f: F(b) => F(c)
h = f(g(a)): F(a) => F(c)
```

* Function composition of `a => F(b)`, `b => F(c)` with monads. If you lift a value into different type.
```
// Let's swap the F() for M() to make it clear
g: a => M(b)
f: b => M(c)
h = composeM(f, g): a => M(c)
```
* In the example above, the component function types don't line up. For `f`'s input, we wanted type `b`, but what we got was type `M(b)`(a monad of `b`). Because of that misalignment, `composeM()`needs to unwrap the `M(b)`that `g` returns so we can pass it to `f`, because `f` is expecting type `b`, not type `M(b)`. The process (often called `.bind()` or `.chain()`) is where flatten and map happen.

* It wraps the `b` from `M(b)` before passing it to the next function, which leads to this:

```
g: a => M(b) flattens to => b
f: b maps to => M(c)
h = composeM(f, g): a => M(c)
```

* Monads make the types line up lifting functions `a => M(b)`, so that you can compose them

* In the above example, the `flatten` from `M(b) => b`and the map from `b => M(c)`happens inside the `chain`form `a => M(c)`. The `chain`invocation is handled inside `composeM()`. At a higher level, you don't have to worry about it. You can just compose monad-returning functions using the same kind of API.

> Monads are needed because lots of function aren't simple mappings from `a => b`. Some functions need to deal with side effects (promises, streams), handle branching (Maybe), deal with exceptions (Either)

* Remember the essence of monads:
    * Function map: `a => b`
    * Functors map with context: `Functor(a) => Functor(b)`
    * Monads flatten and map with context: `Monad(Monad(a)) => Monad(b)`

> A monad is based on simple symmetry - A way to wrap a value into a context, and a way to unwrap the value from the context. 

* **Lift/Unit**: A type lift from some type into the moand context: `a => M(a)``
* **Flatten/Join**: Unwrappint the type from the context: `M(a) => a`
* **Map**: Map with context preserved: `M(a) => M(b)``

* Combine flatten with map, and you get chain - function composition for monad-lifting functions, aka Kleisli composition, named after Heinrich Kleisli.

* **FlatMap/Chain**: Flatten + map: `M(M(a)) => M(b)`

* The lift is the factory/constructor and / or `constructor.of()`method. In category theory, it's called "unit". All it does is lift the type into the context of the moand. It turns an `a`into a `Monad` of `a`

* The unwrapping part is also where the weird stuff like side effects, error branching, or waiting for async I/O typicall hides. In all software develpment, composition is where all the real interesting stuff happens.

* For example, with promises `.chain()`called `.then()`. Calling `promise.then(f)`won't invoke `f()` right away. Instead, it will wait for the promise to resolve, and then call `f()`. 

> You may have heard that a promise is not strictly a monad. That's because it will only unwrap the outer promise if the value is a promise to begin with. Otherwise, `.then()` behaves like `.map()`

* **Note:** But because it behaves differently for pomise values and other values, `.then()`does not strictly obey all the mathematical laws that all functors and /or monads must satisfy for all given values.

> Whenever you have a function that takes some data, hits an API, and returns a corresponsind value, and other function that takes that data, hits another API, and returns the result of a computation on that data, you'll want to compose functions of type `a => Monad(b)`. Because the API calls are asynchronous, you'll need to wrap values in something like a promise or obeservalbe. In other words, the signatures for those functions are `a -> Monad(b)`, and `b -> Monad(c)`, respectively.

```js
{
    const composePromises = (...ms) =>
        ms.reduce((f, g) => x => g(x).then(f))

    const g = n => Promise.resolve(n + 1)
    const f = n => Promise.resolve(n * 2)
    const h = composePromises(f, g)
    h(20).then(console.log) // 42
}
```
* When you hit the second function `f`, (remember `f`after `g`), the input value is a promise. It's not type `b`, it's type `Promise(b)`, but f takes type `b`, unwrapped. So what's going on? Inside `.then()`there's an unwrapping process that goes from `Promise(b) -> b`. That operation is called `join` or `flatten()`. 
