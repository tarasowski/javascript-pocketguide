# Functional Programming with JavaScript

[Source](https://www.udemy.com/functional-programming-for-beginners-with-javascript/)

## Introduction

* What is an application:
1) You have a piece of **data** a tweet, a post an email = data
2) Then you have bunch of them in a **list** = list of data
3) The ability to interact with the data, retweet, liking a post, replying to an email 

![App](./images/app1.png)
![List](./images/app2.png)
![Interact](./images/app3.png)

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

4) undefined is another primitive type. It's usually a result of the flaws in the logic. 

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
* Take a look at the individual rows you see here in the wireframe below. Each row contains the meal description and the calories count. A row is a combination of multiple types which is a meal record. What data type should we use to combine mean and calories into a meal record?

![Rows](./images/combination-data-types.png)

* Given the fact that meal and calories group together. We can model the data in JavaScript similarly. We should combine these two values (meal:string, calories: number) into one piece of data. The data structure that we are going to use, which is called Object Literal.

* Complex Data Types
1) Objects = Object Literal (another world we can use for it RECORD). What we call a meal is the combination of two data types: 1) description = 'Breakfast', calories = 460. To combine the data types in JavaScript we use {}. You can think of the {} as a container of other types. You use comma as a delimter properties from each other! **Object is a piece of data that groups a list of related properties to a record.**

* A basic example of creating object literals or records:
```js
const meal = {
description: 'Breakfast',
calories: 180,
}
```
2) Date is another complex data type in JavaScript.

```js
const meal = {
description: 'Breakfast',
calories: 180,
date: new Date(2008, 8, 1)
}
```

* Each row in the wireframe represents a meal record. Can be modeled in JS using Object Literal Syntax. Which data can we use that can contain a bunch of records e.g. list of meals?

3) Arrays is a data type that can contain 0 or more other data types. Arrays can be as large as needed.

```js
const meals = [
{description: 'Breakfast', calories: 460},
{description: 'Snack', calories: 220}
]
```

* An expression: a code that resolves to a value `Match.random()` or `const grade1 = 50 + Math.rendom() + 50.0`

* If statements are used to control programs flow

* Functions let you reuse code in a nice and simple way. Using the return interupts the execution of the code in the function and returning some value back to the caller (line where it was called). Functions allow you to create reusable logic or code that transforms values from one thing to another X -> Y. In the example we are transforming a percent `95%` grade to a corresponding letter `A` grade from 95% -> A. 

```js
const grade = 50 + Math.random() * 50.0
console.log(grade1)

functon letterGrade(grade) {
if (grade >= 90) {
return 'A'
{ else if (grade >= 80) {
return 'B'
} else if (grade >= 80) {
return 'C'
} else if (grade >= 60) {
return 'D'
} else {
return 'F'
}
}
``` 

## Immutable Data

* What is immutable data? It's data that never changes once it has been created!!!

* Strings are Immutable in JavaScript. When you make a string in JavaScript it will never change `Snack`. You can use this string to create another strings `'AM' + 'Snack'` but the original string never changes. 

* Avoiding mutating state is a good idea. Why? What is simpler? Immutable data or data that can be chagned? Something that never changes, such as immutable data is by defintion simpler than data that can change. 

```js
const PI = 3.14 // creates an immutable value, it can never be changed somewhere else in the codebase
````
* If a piece of data is immutable I don't worry to share that piece of the data that someone else wrote. I don't have to worry about that the code in that function will change my data. Data that doesn't change is SIMPLE. And keeping things simple when creating a software will result in less complicated code, the less complicated code have fewer bugs, easiert to test and maintain. 

> Don't confuse simple and easy. Simple isn't easy. Often it's hard, but simple software is beautiful. 

* JS doesn't support immutability. It's mostly up to you. And in JS it can be a bit misleading in particularly with the `const` keyword. With `const` you cannot mutate simple data types, but you can mutate the complex types. `const` only prevents reassignment of a value to a constant. 

* In an app we often need to make state changes. State are the things that your program often remembers. Things that happen over time where your program remembers or keeps track of. In the calorie counting app the app needs to remember:
1) When the new meals are added
2) When meals are updated
3) When meals are deleted

* Keeping track of these type of changes is refered to as a maintaining state in a program. In order to combine state and immutable data, we need to use this approach see below. It shows how to make changes to our state in a immutable way. We simply create new objects (records) and manipulate them. 

### Updating Objects in a Immutable Way

```js

// 0. INIT: Initialise state for your program
const meal = {
  description: 'Dinner',
};


// 1. ADD: In an Immutable way, add a property to the meal called calories setting it's value to 200,
const updatedMeal = {
  ...meal,
  calories: 200
}


// 2. UPDATE: In an Immutable way, increase the calories by 100 and print the result to the console
const newCalories = {
  ...updatedMeal,
  calories: 300 // has a precedence over the calories property from the updateMeal object that are we are spreading here
}


// 3. DELETE: In an Immutable way, remove the calories property and log the result to the console
const {calories, ...mealWithoutCalories} = newCalories

console.log(meal, updatedMeal, newCalories, mealWithoutCalories)

// [object Object] {
//   description: "Dinner"
// }
// [object Object] {
//   calories: 200,
//   description: "Dinner"
// }
// [object Object] {
//   calories: 300,
//   description: "Dinner"
// }
// [object Object] {
//   description: "Dinner"
// }
``` 

* When we using spread operator is what happening the properties of what we are spreading `meal` in the case above are expanded into new thing that you have created. It's like you copy the `meal` object into a new object and the curly braces where removed. Essentially the properties of an old object are injected into a new object.  Using the spread operator we can add new properts and update existing properties.

* To delete a property from an object we need to combine two operations: Destructuring + Rest Syntax `const {calories, ...mealWihtoutCalories } = newCalories`. Here we are pulling the `id` out into his own `const`, then whatever remaining properties there are in `newCalories` is collected `mealWithtouCalories` `const` 

* The `...` syntax does different things depending on where you use it. To spread something we use `...` on the right side of equal sign. The rest syntax which collected the remaining properties we use `...` on the left side of the equal sign. 

### Updating Array in a Immutable Way

* You can use the same spread `...` with Arrays too.

```js
const meals = [
  {id: 1, description: 'Breakfast', calories: 420},
  {id: 2, description: 'Lunch', calories: 520}
]

const meal = {
  id: 3,
  description: 'Snack',
  calories: 180
}

const updatedMeals = [...meals, meal]

console.log(updatedMeals)

// [[object Object] {
//   calories: 420,
//   description: "Breakfast",
//   id: 1
// }, [object Object] {
//   calories: 520,
//   description: "Lunch",
//   id: 2
// }, [object Object] {
//   calories: 180,
//   description: "Snack",
//   id: 3
// }]
``` 

* Updating an array? We can update an array by using a map function. `.map()` is a function that transforms data. The map funciton always creates a new array, it never modifies the existing array as some of the methods in JS do.

![Map](./images/map-function.png)

* Functions are things that transform values. Functions are values similar to how Numbers, Strings, Booleans, Object Literals. In JavaScript functions are set as to be the 1st class and they are treated just like any other value. Passing one function into another function as an argument is being another big concept, that you use extensivly as a functional programmer. 

**Note:** to update a value of property, we spread and reassign the key (name) with a new value. See example below:

```js
// 1. ADD: This is how you can add an item to an array
const meals = [
  {id: 1, description: 'Breakfast', calories: 420},
  {id: 2, description: 'Lunch', calories: 520}
]

const meal = {
  id: 3,
  description: 'Snack',
  calories: 180
}

const updatedMeals = [...meals, meal]

console.log(updatedMeals)

// 2. UPDATE: This is how you can update an item in an array
const updateDescription = (element, index, array) => {
    if (element.id === 1) {
      return {...element, description: 'Update Description'}
    } else {
      return element
    }
}

// 3. DELETE: This is how you can delete an item from an array
const updatedMealDescription = updatedMeals.map(updateDescription)

console.log(updatedMealDescription)

const filteredMeals = updatedMealDescription.filter(element => element.id !== 1)

console.log(filteredMeals)
[[object Object] {
//   calories: 420,
//   description: "Breakfast",
//   id: 1
// }, [object Object] {
//   calories: 520,
//   description: "Lunch",
//   id: 2
// }, [object Object] {
//   calories: 180,
//   description: "Snack",
//   id: 3
// }]
// [[object Object] {
//   calories: 420,
//   description: "Update Description",
//   id: 1
// }, [object Object] {
//   calories: 520,
//   description: "Lunch",
//   id: 2
// }, [object Object] {
//   calories: 180,
//   description: "Snack",
//   id: 3
// }]
// [[object Object] {
//   calories: 520,
//   description: "Lunch",
//   id: 2
// }, [object Object] {
//   calories: 180,
//   description: "Snack",
//   id: 3
// }]
```

