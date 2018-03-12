const events = require('events');
const emitter = new events.EventEmitter();
const util = require('util');

emitter.on('knock', (result) => console.log(`Who's there?`));
emitter.on('knock', (result) => console.log('Go away'));

emitter.emit('knock');

console.log(util.inspect(events));
