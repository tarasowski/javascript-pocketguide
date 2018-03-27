const expect = require('chai').expect


expect(true).to.be.true

const titleCase = (title) => {
    return title
}

// starting to write the first expectation for the title function
// we are starting with a failing test since we are working acc. to red>green>refactor
expect(titleCase('the great mouse detective')).to.be.a('string')