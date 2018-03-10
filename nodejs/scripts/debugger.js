console.log('step', 1);
console.log('step', 2);
const a = 10;
const b = 'Dima';
let c = 'Hello';
setTimeout(() => {
    debugger;
    console.log('run after the stack is empty')
    c = 'New Value set';
}, 1000)
console.log('step', 3);
console.log(process.memoryUsage());