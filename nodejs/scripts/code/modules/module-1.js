'use strict'
// starting to load and execute the module
module.exports = {
    runner() {
        console.log('Iam a runner');
    },
    banger() {
        console.log('Iam a banger')
    }
}
module.exports.runBit = 'hello from runBit';
module.exports.runFit = 'hello from runFit';

console.log(module);