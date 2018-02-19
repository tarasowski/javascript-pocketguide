const generate = function* () {
    console.log('Hello');
    yield
    console.log('World');
};

const it = generate();
it.next(); // 'Hello'
it.next(); // 'World'