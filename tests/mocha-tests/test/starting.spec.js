const assert = require('assert')
const should = require('chai').should()

describe('Basic Mocha Test', function () {
    it('should deal with objects', function () {
        let obj = {name: 'John', gender: 'male'}
        let objB = {name: 'John', gender: 'male'}

        obj.should.deep.equal(objB)
    })
    it('should allow testing nulls', () => {
        const iAmNull = null;
        
        should.not.exist(iAmNull)
    })
})