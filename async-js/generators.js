function getData(d) {
    setTimeout(() => it.next(d), 1000);
}

const corouting = function* (params) {
    const x = 1 + (yield getData(10));
    const y = 1 + (yield getData(30));
    const answer = (yield getData('Final: ' + (x + y)));
    console.log(answer);
}

const it = corouting();
it.next();