const fs = require('fs');

const readFileIntoArray = (file, cb = null) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (error, data) => {
            if (cb) {
                return cb(error)
                return reject(error)
                }
            
            const lines = data.toString().trim().split('\n')
            if (cb) return cb(lines)
            else return resolve(lines)
            
        });
    });
};

const printLines = (lines) => {
    console.log(`there are ${lines.length} line(s)`);
    console.log(lines);
};

const FILE_NAME = __filename

readFileIntoArray(FILE_NAME)
    .then(data => printLines(data)) // he was just writing .then(printLines) and it has worked
    .catch(console.error);