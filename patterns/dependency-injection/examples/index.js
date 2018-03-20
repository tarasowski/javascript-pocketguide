
// 1 у базы noname есть метод query
//const dbInstance = require('./noname.js');

// 2 у базы mongo есть метод query
const dbInstance = require('./mongo.js');

// 3 у базы aws нет метода query, а есть метод select, поэтому прокинем инстанс
// через наш адаптер, котором будет query наружу, а вызывать будем select внутри
// const dbAWS = require('./aws.js');
// const dbInstance = require('./adapter.js')(dbAWS);


// мы хотим, чтобы app предоставлял нам метод get для получения записи в базе
// независимо от того, какая база будет использована
// для этого мы инжектируем туда инстанс нашей конкретной базы (можем раскомментировать 1, 2 или 3)

const app = require('./app.js')(dbInstance);
console.log(app.get('name'));
//console.log(app.set('name'));
