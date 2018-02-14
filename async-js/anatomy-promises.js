// Here is the basic anatomy of promise in JavaScript

// Create a promise that is immediately resolved
const p1 = new Promise((resolve, reject) => {
        resolve(42);
});

console.log(p1); // Promise {42}

// We can wrap any value into a promise with Promise.resolve() by doing so we can normalize the values
const p2 = Promise.resolve(42);

console.log(p2); // Promise {42}

// then() method fires a callback in case of success or in case of rejection
p2.then(data => console.log(data)); // 42

// but we can also chain then() methods to have a control flow since each .then() returns another promise
console.log(p2.then(data => data)) // Promise {<pending>}

p2.then(data => data) // Promise {<pending>} this promise gets immediately resolved with the next .then()
  .then(data => console.log(data)) // 42 this then() return another promise, since we are not returning anything it's undefined
  .then(data => {console.log(data); return 38}) // undefined but if we would now return something it will be wrapped into a promise again
  .then(data => console.log(data)); // 38 so the chain can further and further