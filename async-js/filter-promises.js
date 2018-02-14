const axios = require('axios');

// We have a list of urls that we want to fetch asynchronously in parallel (concurrency)
const urls = ['https://jsonplaceholder.typicode.com/posts/1',
'https://jsonplaceholder.typicode.com/posts/2',
'https://jsonplaceholder.typicode.com/posts/3',
'https://jsonplaceholder.typicode.com/posts/4',
'https://jsonplaceholder.typicode.com/posts/error'
];


// this function checks if the request was resolved or rejected and returns only resolved urls
const validate = (urls) => {
    // fetch urls and return promise with a value true for 200 or false for 400
    let requests = urls.map((element, index, array) => {
        return axios.get(element).then(() => true, () => false);
    });
    // Promise.all resolves the promises with true/false values and .filter() filter outs the false values.
    return Promise.all(requests).then(result => {
        return urls.filter((element, index, array) => result[index]);
    });
};

validate(urls)
    .then(result => console.log(result));
