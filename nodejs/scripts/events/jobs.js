const util = require('util');

const Job = function() {
    //...
    this.process = function () {
        job.emit('done', {completedOn: new Date()});
    }
}

util.inherits(Job, require('events').EventEmitter);

module.exports = Job;