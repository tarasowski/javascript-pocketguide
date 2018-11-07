# Introduction into Haskell 

[Location / Source](https://www.meetup.com/Friendly-Functional-Programming-Meetup-Berlin/events/pwxblqyxpbkb/)

### First Talk (Intro to Haskell)

[Presentation](https://docs.google.com/presentation/d/1-KgTsbIs3c9vQtX933exrH7plP0k-hLmtJx2lfBDvyQ/edit#slide=id.p)

* Compiled to native code
* Statically typed
* Garbage collected
* Lazy evaluation
* Most popular compiler: GHC
* Created in 1990

* Haskell has its roots in academia
* Excels at compiler-related tasks
* Many compilers are written in Haskell (e.g. Elm, Idris, Agda, Purescript)
* Haskell can be augmented with language extensions
* Haskell is a large language with a small Core
* For its size and age, it evolves quickly


### Second Talk (What Haskell taught us when we were working not looking - Eric Torreborre)

* He was the OO believer and after a lot of pain he recognized that fp is inevitable
* He thought that with OO you can model the world, the objects are passing messages around and so, but it doesn't work well.

* Two main characteristics
- Lazy (the arguments of the functions will not be evaluated right away)
- Pure (to keep it pure

#### What does it mean to program with pure functions?
- Easy to test, relies on input
- Very easy to refactor
- Can be reused

* Haskell has first-class functions (very important). Functions you can define and pass around like all other values.

* Pure data = data that doesn't mutate, functions that create some data, other functions that transform it and some other functions that consume the results.

* Stream: create data, transform data, consume data

* Data types you can create as pure (immutable) data, with no functions, no methods attached to it. Data as a first class concept!

* Some computations are expensive, so you can introduce laziness. 

* The very cool thing you can do with data is destructure the data. In just one line you can extract stuff from the data and recombine it, -> **pattern matching?**

* Once you start creating data you start to destructure it.

* In OO objects talk to each other, they have internal mutable state, and you have methods that can change state. In Haskell you have a separation between data and functions. **We are moving from OO!** In OO you have many state-machines that talk to each other and it gets like spaghetti (big nets) of stuff communicating over the place.

* In functional programming you have data pipelines.

* OO is the dead end, it looks nice if you have 3 objects, if you have 100 objects, it becomes complex.

**Remember:** the data type object in JS is data type (just data) and not an object (e.g. object from Java) etc. It's just a container for other data types!

* Haskell libraries:
- Lenses (modify the data that is deeply nested) - if you work with immutable data

- Quckcheck - is a testing library

- Streaming (the library is called Streaming in Haskell) - we have tons of data to process thats why we use streams - manage resources in a better way. It's like a list but with infinite space.

- Async / STM library

- Registry : helpful if you want start building a real Haskell application [Link](http://hackage.haskell.org/package/registry)

# Summary: You have Data -> Functions that transform data -> Someone who consumes data (Consumers)


## Q&A

* When to work with OO: if you team has no time to dig deeper into fp, new languages, and need to release features they should stick to their OO Java approach. Fp changes the whole approach how people worked the last 20 years, that's why it's hard to switch to fp...

* When you start with a greenfield project you should use funtional programming. The advantage of Java VJM is gone, since you can deploy containers / kubernetes everywhere and run your haskell code everywhere. Go for fp!

