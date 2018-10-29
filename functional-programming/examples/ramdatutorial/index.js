const R = require('ramda')
const cities = require('./cities.json')
const percentile = require('./percentile')
const table = require('text-table')

const KtoC = k => k - 273.15
const KtoF = k => k * 9 / 5 - 459.67

const updateTemperature = R.curry((convertFn, city) => {
    const temp = Math.round(convertFn(city.temp))
    return { ...city, temp }
})

const updatedCitiesRamda = R.map(updateTemperature(KtoF), cities)

const totalCostReducer = (acc, city) => {
    const { cost = 0 } = city
    return acc + cost
}

const totalCost = R.reduce(totalCostReducer, 0, updatedCitiesRamda)
const cityCount = R.length(updatedCitiesRamda)
const costAverage = totalCost / cityCount

const groupByPropReducer = (acc, city) => {
    const { cost = [], internetSpeed = [] } = acc
    return {
        ...acc,
        cost: R.append(city.cost, cost),
        internetSpeed: R.append(city.internetSpeed, internetSpeed)
    }
}

const groupedByProp = R.reduce(groupByPropReducer, {}, updatedCitiesRamda)

const calcScore = city => {
    const { cost = 0, internetSpeed = 0 } = city
    const costPercentile = percentile(groupedByProp.cost, cost)
    const internetSpeedPercentile = percentile(groupedByProp.internetSpeed, internetSpeed)
    const score = 100 * (1.0 - costPercentile) + 20 * internetSpeedPercentile
    return { ...city, score }
}

const scoredCities = R.map(calcScore, updatedCitiesRamda)

const filterByWeather = city => {
    const { temp = 0, humidity = 0 } = city
    return temp > 68 && temp < 85 && humidity > 30 && humidity < 70
}

const filteredCities = R.filter(filterByWeather, scoredCities)

const sortedCities = R.sortWith(
    [R.descend(city => city.score)],
    filteredCities
)

const top10 = R.take(10, sortedCities)

const cityToArray = city => {
    const { name, country, score, cost, temp, internetSpeed } = city
    return [name, country, score, cost, temp, internetSpeed]
}

const interestingProps = [
    'Name',
    'Country',
    'Score',
    'Cost',
    'Temp',
    'Internet'
]

// pipe returns a function that will be called with the data (cities) that the first function in the pipeline is expecting. The first function in this case is the R.map() function which is expecting a cities array. That's why at the end of pipe we are calling the pipe function with the cities array.
// https://www.youtube.com/watch?v=3Lqqh7gE_a8&list=PLs0HJRuXPAqu6OLH_2K0K6jlxFP7erHDy&index=10
const topCities = R.pipe(
    R.map(updateTemperature(KtoF)),
    R.filter(filterByWeather),
    R.map(calcScore),
    R.sortWith([R.descend(city => city.score)]),
    R.take(10),
    R.map(cityToArray),
    R.prepend(interestingProps),
    table
)(cities)

console.log(topCities)