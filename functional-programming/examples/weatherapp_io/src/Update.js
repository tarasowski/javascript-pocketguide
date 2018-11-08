import { prop, compose, filter, map } from 'ramda-x'

export const MSGS = {
  CITY_INPUT: 'CITY_INPUT',
  ADD_CITY: 'ADD_CITY',
  REMOVE_CITY: 'REMOVE_CITY',
  HTTP_SUCCESS: 'HTTP_SUCCESS'
}

export function inputCityMsg(city) {
  return {
    type: MSGS.CITY_INPUT,
    city
  }
}

export function addCityMsg() {
  return {
    type: MSGS.ADD_CITY
  }
}

export function removeCityMsg(id) {
  return {
    type: MSGS.REMOVE_CITY,
    id
  }
}

const removeCity = id => city => city.id !== id

export const httpSuccessMsg = id => response => {
  return {
    type: MSGS.HTTP_SUCCESS,
    id,
    response
  }

}


const APPID = '3e4a81d64d8e5f8f3acfa3e8efbdd59a'

// only for testing
APPID === undefined ? console.log('please change APPID inside Update.js') : 'server has started'


function weatherUrl(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=imperial&APPID=${APPID}`
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.CITY_INPUT: {
      return {
        ...model,
        input: msg.city
      }
    }
    case MSGS.ADD_CITY: {
      return [{
        ...model,
        nextId: model.nextId + 1,
        input: '',
        cities: [
          ...model.cities,
          {
            id: model.nextId,
            location: model.input,
            temp: '?',
            low: '?',
            high: '?'
          }
        ]
      },
      {
        request: { url: weatherUrl(model.input) },
        successMsg: httpSuccessMsg(model.nextId)
      }
      ]
    }
    case MSGS.REMOVE_CITY: {
      return { ...model, cities: filter(removeCity(msg.id), model.cities) }
    }
    case MSGS.HTTP_SUCCESS: {
      return {
        ...model,
        cities: updateCityTemp(model, msg)
      }
    }
  }
}


function updateCityTemp(model, msg) {
  return map(city => {
    return city.id === msg.id
      ? {
        ...city,
        temp: Math.round(prop('temp', msg.response.data.main)),
        low: Math.round(prop('temp_min', msg.response.data.main)),
        high: Math.round(prop('temp_max', msg.response.data.main))
      }
      : city
  }, model.cities)
}

export default update;
