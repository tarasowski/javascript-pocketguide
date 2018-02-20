# Iterator

An object is an iterator when it knows how to access items from a collection one at a time, while keeping track of its current position within that sequence. In JavaScript an iterator is an object that provides a next() method which returns the next item in the sequence. This method returns an object with two properties: done and value. [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

```js
var a = [1,3,5,7,9];

for (var v of a) {
	console.log( v );
}
// 1 3 5 7 9
```
The for..of loop asks a for its iterator, and automatically uses it to iterate over a's values.

`a` in the previous snippet is an iterable. The `for..of` loop automatically calls its `Symbol.iterator` function to construct an iterator. But we could of course call the function manually, and use the iterator it returns:

```js
var a = [1,3,5,7,9];

var it = a[Symbol.iterator]();

it.next().value;	// 1
it.next().value;	// 3
it.next().value;	// 5
```

## What is an Iterable?

An iterable is a data structure that wants to make its elements accessible to the public. It does so by implementing a method whose key is Symbol.iterator. That method is a factory for iterators. [Source](http://exploringjs.com/es6/ch_iteration.html#sec_overview-iteration)

## Iterable values

The following values are iterable:

Arrays
Strings
Maps
Sets
DOM data structures (work in progress)






