'use strict'

console.log('Step', 1);
const start = Date.now();
console.time('Loop');
for (let i = 0; i < 1000000; i++) { 
    // nothing to do here
}
console.log('Step', 2);
const end = Date.now();
console.timeEnd('Loop');
console.log('Loop', start - end);