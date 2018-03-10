const util = require('util');
const fs = require('fs');

console.log('Step', 2) // Step 2
const name = 'Azat';
const city = 'San Francisco';
console.log('Hello %s from %s', name, city);

console.log(util.inspect({city: 'San Francisco'})) // { city: 'San Francisco' }
console.log('Hello %s from %s', 'Azat', {city: 'San Francisco'}) // Hello Azat from [object Object]
console.log('Hello %s from %s', 'Azat', util.inspect({city: 'San Francisco'})) // Hello Azat from { city: 'San Francisco' }
console.log('Hello %s from %s', 'Azat', JSON.stringify({city: 'San Francisco'})) // Hello Azat from {"city":"San Francisco"}

const str = util.inspect(global, {depth: 0});
//console.log(str);
//console.dir(global, {depth: 0})
console.dir(global,{ showHidden: false, depth: 2, showProxy: false })


const out = fs.createWriteStream('/.out.log');
const err = fs.createWriteStream('/.err.log');

const console2 = new console.Console(out, err);

setInterval(() => {
    console2.log(new Date()); // standard output
    console2.error(new Error('Whoops')) // error output
}, 5000)

