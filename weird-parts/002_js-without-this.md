# Javascript without the this

[Source](http://radar.oreilly.com/2014/03/javascript-without-the-this.html)

```js
// function Car(numberOfDoors){
//     this.numberOfDoors = numberOfDoors;
//     this.numberOfWheels = 4;

//     this.describe = function(){
//       return "I have " + this.numberOfWheels +
//         " wheels and " + this.numberOfDoors + " doors.";
//     }
//   }

//   var sportsCar = new Car(2);
//   console.log( sportsCar.describe() );


function createCar(numberOfDoors) {
    const numberOfWheels = 4
    function describe() {
        return 'I have ' + numberOfDoors + ' wheels and ' + numberOfDoors + ' doors '
    }
    return {
        describe: describe
    }
}


const suv = createCar(2)
console.log(suv.describe()) // I have 2 wheels and 2 doors


// Inheritance
function createMiniVan(capacity) {
    const car = createCar(2)
    car.capacity = function () {
        return 'I have room for ' + capacity + ' passenders'
    }
    return car
}

const miniVan = createMiniVan(7)
console.log(miniVan.describe()) // I have 2 wheels and 2 doors
console.log(miniVan.capacity()) // I have room for 7 passenders

// Composition
function createOdometer() {
    let mileage = 0
    function increment(numberOfMiles) { mileage += numberOfMiles }
    function report() { return mileage }
    return {
        increment: increment,
        report: report
    }
}

function createCarWithOdometer(numberOfDoors) {
    const odometer = createOdometer()
    const car = createCar(numberOfDoors)
    car.drive = function (numberOfMiles) {
        odometer.increment(numberOfMiles)
    }
    car.mileage = function () {
        return 'car has driven ' + odometer.report() + ' miles'
    }
    return car
}

const newCar = createCarWithOdometer(5)
newCar.drive(100)
console.log(
    newCar.mileage() // car has driven 100 miles
)
