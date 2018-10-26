# Functional Programming with JavaScript

[Source](https://www.udemy.com/functional-programming-for-beginners-with-javascript/)

## Introduction

* What is an application:
1) You have a piece of **data** a tweet, a post an email = data
2) Then you have bunch of them in a **list** = list of data
3) The ability to interact with the data, retweet, liking a post, replying to an email 

> Most apps of their core are just lists of data, but the list of raw data isn't useful by itself. You need to transform the list of data into easily consumable information that can be interacted with.

* If you want to be good at building apps, you should be good with working with:
1) Data
2) Lists of data
3) Data Transformations: transforming data into easily consumable or digestable information

* A single most skill for a seanoned programmer is knowing how to learn

* You can learn by repetion and building a lot of small apps instead of a big one

* If you want to build something:
1) keep it simple, don't be ambitious (otherwise there is chance you won't finish it)
2) keep the scope of the app small
3) after you finish your inital version, add more features to it

* The idea to learn everything asap is the wrong approach. You should concentrate yourself on the pareto rule. In JavaScript 80% of the code is written using only 20% of the JavaScript features. Concentrate yourself on the 20% of JS that is used 80% of the time. Master it! The rest that you need just learn it to know it enough.
* How to find the 20% that you need to learn? Code if free, it's eassy to discover by reading and studying open source code. If you read code of a season develper is the best shortcuts you can take.
* The best way to learn the 20% is the technique called [spaced repetion](https://knowthen.com/spaced-repetition/), build small apps over and over again to repeat the concepts.
1) The brain considers a memory important, when it uses that memory more than once. And the more you use it, the more important the brain considers that memory
2) Each of us suffer from what's called the Forgetting Curve. When we're exposed to new information, our brains will gorget the new information over predictable periods of time.
3) The most efficient way of tricking the brain into remembering something for longer periods of time is to review the new infromation just before it falls out fo memory. That's why it makes not sense just to read as much as possible, but you need to repeat it to get to know it. By reviewing it just before it's forgotten, you're strengthening the memory, but the memory isn't permanent. The strengthened memory still has a forgetting curve, but this time it'll take longer to forget.

> Imagine I just showed you how to tie a knot called a clove hitch.  Then, after I showed you, I handed you the rope and asked you to tie a clove hitch knot.  There’s a good chance, you might not remember enough to tie the knot, even though you just saw it.  So imagine you forgot, then I showed you again, then I asked you to tie the clove hitch again, and this time you were able to tie the knot.  Around 24 hours from now, you’re going to forget how to tie the knot, that’s just how most minds work… so around 23 hours later I hand you a rope and ask you to tie the knot again.  Odd’s are, it would be a struggle for you to remember how to tie the knot, but you’ve got a good chance of remembering because it hasn’t been very long since you last tied the knot.  So let’s say you remembered, and were able to tie the knot.  By remembering it again, you’ve told your brain that this information is important, and you’ve reset the forgetting curve, except this time you won’t forget how to tie the knot in 24 hours, this time you’ll forget in 48 to 72 hours.  So at the 47 hour point, I hand you a rope and ask you to tie the knot again.  Odd’s are, it’s going to be a struggle, but you’ve got a pretty good chance of remembering.

* Every time you force yourself to remember how to tie the clove hitch knot, you’re strengthening your memory, and the amount of time it takes to forget is extended.  Eventually you’ll get to the point where you can just tie a clove hitch knot once every few years, and the memory is essentially fixed in your mind.

* So how can i test my memories, just before I forget them? Use Anki, which is basically a flashcard app that automatically asks you questions just before they would normally fall out of memory. Every morning spent 10 minutes, review the flashcards.
* When creating flashcards use following rules:
1) Associate new information with already known things
2) Write the flashcards in your own words

## JavaScript Basics

* JavaScript is everywhere!

* Understanding data is the most fundamental skill to any programmer

* There are couple of data types that are available to use:

* Primitive data types means it's a data type that cannot be broken into something simpler
1) String
2) Numbers - Whole number 42, Decimal Number 42.10

* Numbers and Strings are treated differently. Numbers can have different operations performed on them than strings. If you deal with a numeric value you should store it as a Number type. To perform mathematical operations such as `Match()`

3) Boolean can be used for dealing with states e.g. true fro show a form and false for not showing the form and instead we rather show the button.

* Values are mostly used in combination with a variable. What is a variable? `const calories = 180`
1) You see the keyword `const` is a short form for constant and means that the value doesn't change. Using `const` is consistent with using immutable data. For the most of your time as a functional programmer you don't use other variables such as `var, let`. `const` is the 20% of the JS that a programmer will use 80% of the time.
2) The way JS knows the data type of the variable calories is by evaluating what's on the right side of the equal sign. So in this case it sees 180 as a number type. 
> The key principle of functional programming is the idea of immutable data or data that doesn't change. 

```js
const calories = 180
const calories = '180'
console.log(calories + 1) // 181
console.log(calories + 1) // '1801' here JS converts the 1 into a String data type - coersion
```
* 





