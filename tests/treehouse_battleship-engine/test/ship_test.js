const expect = require('chai').expect

describe('checkForShip', () => {
  const checkForShip = require('../game_logic/ship_methods').checkForShip         

  it.skip('should correctly report no ship at a given players coordinate', ()=> {
    const player = {
        ships: [
            {
                locations: [[0,0]]
            }
        ]
    } 
    
    expect(checkForShip(player, [9, 9])).to.be.false
  })
  it.skip('should correctly report a shit is at a given coordinate', () => {
    const player = {
        ships: [
            {
                locations: [[0,0]]
            }
        ]
    } 
    
    expect(checkForShip(player, [0, 0])).to.be.true
  })
  it.skip('should handle ships located at more than one coordinate', ()=> {
    const player = {
        ships: [
            {
                locations: [[0,0], [0,1]]
            }
        ]
    } 
    expect(checkForShip(player, [0, 1])).to.be.true
    expect(checkForShip(player, [0, 0])).to.be.true
    expect(checkForShip(player, [9, 9])).to.be.false
  })
  
})