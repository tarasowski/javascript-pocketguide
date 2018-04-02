# What are design patterns?

Design patterns are reusable solutions to commonly occurring problems in software design. 

## Proto-patterns

A proto-pattern is a pattern-to-be if it passes a certain period of testing by various developers and scenarios where the pattern proves to be useful and gives correct results.

## Anti-patterns

As a design pattern represents good practice, an anti-pattern represents bad practice. 

An example of an anti-pattern would be modifying the Object class prototype. Almost all objects in JavaScript inherit from Object (remember that JavaScript uses prototype-based inheritance) so imagine a scenario where you altered this prototype.

Another example, similar to one mentioned above, is modifying objects that you don’t own. An example of this would be overriding a function from an object used in many scenarios throughout the application. If you are working with a large team, imagine the confusion this would cause; you’d quickly run into naming collisions, incompatible implementations, and maintenance nightmares.

**Note:** You simple extend the class or add something to the `.prototype`so you don't alter the original Object.

## Design Pattern Categorization

Design patterns can be categorized in multiple ways, but the most popular one is the following:

* Creational design patterns: These patterns deal with object creation mechanisms which optimize object creation compared to a basic approach. 
    + Factory method
    + Abstract factory
    + Builder
    + Prototype
    + Singleton

* Structural design patterns: These patterns deal with object relationships. They ensure that if one part of a system changes, the entire system doesn’t need to change along with it.
    + Adapter
    + Bridge
    + Composite
    + Decorator
    + Facade
    + Flyweight
    + Proxy

* Behavioral design patterns: These types of patterns recognize, implement, and improve communication between disparate objects in a system. They help ensure that disparate parts of a system have synchronized information. 
    + Chain of responsibility
    + Command
    + Iterator
    + Mediator
    + Memento
    + Observer
    + State
    + Strategy
    + Visitor

* Concurrency design patterns: These types of design patterns deal with multi-threaded programming paradigms.
    + Active object
    + Nuclear reaction
    + Scheduler

* Architectural design patterns: Design patterns which are used for architectural purposes.
    + MVC (Model-View-Controller)
    + MVP (Model-View-Presenter)
    + MVVM (Model-View-ViewModel)

[Source](https://www.toptal.com/javascript/comprehensive-guide-javascript-design-patterns)