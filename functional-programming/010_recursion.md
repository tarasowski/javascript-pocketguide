# Recursion

[Source](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch8.md)

```js
const foo = (x) =>
  x < 5
  ? x
  : foo(x/2)

const isPrime = (num, divisor = 2) => 
  (num < 2 || (num > 2 && num % divisor == 0))
    ? false
    : divisor <= Math.sqrt(num)
      ? isPrime(num, divisor + 1)
      : true


const sum = (num1, ...nums) =>
  nums.length == 0
    ? num1
    : num1 + sum(...nums)


const factorial = n =>
  n == 1 // base condition
    ? n
    : n * factorial(n - 1)

// https://duckduckgo.com/?q=recursion+computerphile&t=h_&ia=videos&iax=videos&iai=Mv9NEXX1VHc
// call stack representation
// 4 * factorial(3) * factorial(2) * factorial(1)
// 4 * factorial(3) * factorial(2) <-- 1
// 4 * factorial(3) <-- 2
// 4 <-- 6
// 24

console.log(
  factorial(4),
  sum(10, 20, 30, 40, 50),
  isPrime(20),
  foo(16)
)

```
# Continuation-passing style

[Source](http://matt.might.net/articles/by-example-continuation-passing-style/)

```js
const id = (x, ret) => ret(x)

id(10, console.log)

const fact = (n, ret) =>
  tail_fact(n, 1, ret)

const tail_fact = (n, a, ret) =>
  n == 0
  ? ret(a)
  : tail_fact(n-1, n*a, ret)

fact(20, console.log)

```
