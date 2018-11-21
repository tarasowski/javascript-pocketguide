# Rethinking JS


[Source](https://hackernoon.com/rethinking-javascript-the-if-statement-b158a61cd6cb)


### Remove the `if` and `if else` statements

```js
// ternary operator
const ifStat = true ? console.log('its true') : console.log('its false') // its true

const isCusomterValid = customer => customer === true

// remove the if statement
const saveCustomer = customer =>
    isCusomterValid(customer)
        ? console.log('save customer to db')
        : console.log('customer is invalid')

saveCustomer(true)


// remove the if else statement
const customerValidation = customer =>
    !customer.email ? console.log('email is required')
        : !customer.login ? console.log('login is required')
            : !customer.name ? console.log('name is required')
                : customer

const customerObj = {
    email: 'dimitri@gmail.com',
    login: 'dimitri',
    name: 'Dimitri Tarasowski'
}

customerValidation(customerObj) // { email: 'dimitri@gmail.com', login: 'dimitri', name: 'Dimitri Tarasowski' }

```

### Remove the `for` loop

[Source](https://hackernoon.com/rethinking-javascript-death-of-the-for-loop-c431564c84a8)

```js
const cats = [
    { name: 'Mojo', months: 84 },
    { name: 'Mao-Mao', months: 34 },
    { name: 'Waffles', months: 4 },
    { name: 'Pickles', months: 6 }
]


const under7Month = cats => cats.filter(cat => cat.months < 7)
const getNames = cats => cats.map(cat => cat.name)

const catNames = compose(getNames, under7Month)
catNames(cats) // [ 'Waffles', 'Pickles' ]
```

### Eliminate the `switch` statement

[Source](https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d)

```js
function switchcase(cases, defaultCase, key) {
    return cases.hasOwnProperty(key)
        ? cases[key]
        : defaultCase
}

const curriedSwitchcase = curry(switchcase)


const executeIfFunction = f =>
    f instanceof Function ? f() : f

const switchcaseF = cases => defaultCase => key =>
    executeIfFunction(curriedSwitchcase(cases)(defaultCase)(key))


const counter = (state = 0, action) =>
    switchcaseF({
        'RESET': 0,
        'INCREMENT': () => state + 1,
        'DECREMENT': () => state - 1
    })(state)(action.type)


counter(20, { type: 'INCREMENT' }) // 21
```

```js
// We have separated out all the logic from our impure getCurrentDay function 
// into a pure getDay function
const getDay = curriedSwitchcase({
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Staturday'
})('Unknown')

const getCurrentDay = () =>
    getDay(new Date().getDay()) // new Date().getDay() is a side-effect

getCurrentDay() 
```
