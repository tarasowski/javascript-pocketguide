const axios = require('axios');

// We have a list of urls that we want to fetch asynchronously in parallel (concurrency)
const urls = ['https://jsonplaceholder.typicode.com/posts/1',
'https://jsonplaceholder.typicode.com/posts/2',
'https://jsonplaceholder.typicode.com/posts/3',
'https://jsonplaceholder.typicode.com/posts/4'
];

// We are making a request that gives us back a promise (axios) node module
const getPromises = (urls) => {
    const promises = urls.map((element, index, array) => {
        return axios.get(element);
    });
    return promises;
};

// We are storing the promises array in this variable
const promisesList = getPromises(urls);

// We want to fetch all urls and wait untill all are resolved
const doSomething = (promises) => {
    return Promise.all(promises);
};

// Now we get the answer and logging each element of the array and their response data
doSomething(promisesList)
    .then(response => {
        response.forEach((element, index, array) => {
            console.log(element.data);
        })
    })      
    .catch(err => console.log(err));


    