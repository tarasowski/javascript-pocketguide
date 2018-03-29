const checkForShip = (player, coordinates) => {
    let shipPresent;
    let ship;

    ship = player.ships.map(item => {
        return item
    })

    shipPresent = ship.locations.forEach(item => {
        
    })

    player.ships.forEach((item, index, array) => {
        ship = item

        shipPresent = ship.locations.filter(actualCoordinate => {
            return (actualCoordinate[0] === coordinates[0]) && (actualCoordinate[1] === coordinates[1])
        })[0]
    })
    
    if (shipPresent) {
        return true
    } 
    
    return false
}

module.exports.checkForShip = checkForShip