const init = require('./modules/module-1.js');

console.log(init.runBit, 1)
console.log(init.runBit, 2)
console.log(init.runBit, 3)
init.banger();
init.runner();

console.log(require('module').wrapper);
console.log(__dirname);
console.log(__filename);
console.log(exports);
console.log('show the args of the wrapper functon: ', arguments.length);