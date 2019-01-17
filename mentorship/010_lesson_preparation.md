# Mocking is Code Smell

[Source](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)

* TDD should lead to better design. The process of learning effective TDD is the process of learning how to build more modular applications.

* More complex code is often accompanied by more cluttered code. 

* "A code smell is a surface indication that usually corresponds to a deeper problem in the system" ~Martin Fowler

* Some code exists primarily to facilitate I/O, in which case ther eis little to do other than test I/O, and reducing mocks might mean your unit test coverage would be close to 0.

* If there is no logic in your code (just pipes and pure composition), 0% unit test coverage might be acceptable, assuming your integration or functional test coverage is close to 100%.

* However, if there is logic (conditinal expressions, assignment to variables, explicit function calls to units, you probably do need unit test coverage.

* A mock is a test double that stands in for real implementation code runding the unit testing process.

* All test doubles stands in for real code that the test subject is tightly coupled to, therefore, all test doubles are indication of coupling.

* Unit tests test individual units (modules, function, classes) in isolation from the rest of the program.

* Integration tests, which test integrations between two or more units.

* Functional tests, which test the application fromt he point of view of the user, including complete user interaction workflows.

* In general, units are tested using only the public interface of the unit. This is referred to as black box testing.

* Black box testing leads to less brittle tests, because the implementation details of a unit tend to change more over time than the public API of the unit.

* If you use white box testing, where tests are aware of implementation details, any change to the implementation details could break the test.

* Coupling is the degree to which a unit of code (module, function, class etc...) depends upon other units of code. The the coupling, the harder it is to maintain or extend the application.

* **What causes tight coupling?**
  * Mutation vs. immutability
    - Immutability: pure function don't mutate exisiting values. They return new ones, instead:
  * Side-Effects vs. purity/isolated side-effects
    - No side effects: The only observable effect of a pure function is its return value, so there's no chance fo rit to interfere with the opreation of other functions that may be observing external state such as the screen, the DOM, the console, the network, or the disk.
  * Responsibility overload vs. Do one thing
    - Do one thing: pure function do one thing: map some input to some corresponding output, avoiding the responsiblity overload that tends to plague object and class-based code.
  * Procedural instructions vs. describing structure
    - Structure, not instructions: Pure functions describe structural relationships between data, not instructions for the computer to follow, so two different sets of conflicting instructions running the at the same time can't step on each other's toes and cause problems.
  * Imperative composition vs. declarative composition

* Mocking is required if our decomposition strategy has failed.

* Decomposition: The essense of all software development is the process of breaking a lrage problem down into smaller, independet pieces (decomposition) and composing the solutions together to form an application that solves the large problem (composition).

> Mocking is required when the units used to break the large problem down into smaller parts depend on each other. Mocking is required when our supposed atomic units of composition are not really atomic, and our decomposition strategy has failed to decompose the larger problem into smaller, independent problems. 

* When decomposition succeeds, it's possible to use a generic composition utility to compose the pieces back together.
  * Function composition (compose)
  * Component composition (composing higher order components with function composition)
  * State store/model composition (combineReducers Redux)
  * Object of factory composition (mixins or functional mixins)
  * Process composition (transducers)
  * Promise or monaidc composition (asyncPipe(), Kleisli composition)
  
### When you use generic composition utilities, each element of the composition can be unit tested in isolation without mocking the other.

```js
console.clear()

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)


const g = n => n + 1
const f = n => n * 2

//Imperative composition
const doStuffBadly = x => {
	   const afterG = g(x)
    const afterF = f(afterG)
    return afterF
}

//Declarative composition
const doStuffBetter = compose(f, g)

console.log(
	doStuffBadly(20), // 42
  	doStuffBetter(20) // 42
)
```

* Function composition is the process of applying a function to the return value of another function. You create a pipeline of functions, then pass a value to the pipeline, and the value will go through each function like a stage in an assembly line.

* Imperative style means that we're commanding the computer to do something step-by-step.

* Declarative style means we're telling the computer the relationship between things. It's a description of structure using equational reasoning. `doStuffBetter` is the piped composition of `g` and `f`. 

**Note:** Assuming `f`and `g` have their own unit tests, and `compose()`hast its own unit tests, there is not new logic here to unit test. In order for this style to work correctly, the units we compose need to be decoupled.

### How do we remove coupling?

* To remove it we need to understand where the coupling comes from:
 * Class inheritance (coupling is multiplied by each layer of inheritance)
 * Global variables
 * Other mutable global state (DOM, shared storage, network)
 * Module imports with side-effects
 * Implicit dependencies from composition e.g. `const widgetFactory = compose(eventEmitter, widgetFactory)` where 
