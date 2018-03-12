'use strict'
console.log('Loading module 1');
exports.a = 1;

require('./module-2');

exports.b = 2;
exports.c = 3;
