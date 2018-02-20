const axios = require('axios');

const url = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];


// Manual async function with Generators
const myGen = function* () {
    const urls = yield Promise.all(url.map(url => axios.get(url)));
    const clean = urls.map(e => e.data);
    const [a, b, c] = clean;
    console.log(a);
};

const it = myGen();
const p = it.next().value;
p.then(res => it.next(res));

// The same example with the async function
const myGenAsync = async function () {
    const urls = await Promise.all(url.map(url => axios.get(url)));
    const clean = urls.map(e => e.data);
    const [a, b, c] = clean;
    console.log(a);
}

myGenAsync();