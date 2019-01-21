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
  n == 1
    ? n
    : n * factorial(n - 1)

// 4 * factorial(3) * factorial(2) * factorial(1)
// 4 *      3       *       2      *      1

console.log(
  factorial(4),
  sum(10, 20, 30, 40, 50),
  isPrime(20),
  foo(16)
)

```
