import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { map, curry } from 'ramda-x'
import {
  inputCityMsg,
  addCityMsg,
  removeCityMsg
} from './Update'

const { div, h1, pre, input, button, p, span } = hh(h);


function inputSet(dispatch) {
  return div([
    input({
      className: '',
      type: 'text',
      oninput: e => dispatch(inputCityMsg(e.target.value)),
    }),
    button({
      className: 'p3',
      onclick: () => dispatch(addCityMsg())
    }, 'Add City')
  ])
}


function smallBox(header, data) {
  return div({ className: 'dib mr4' }, [
    div('', header),
    div('', data)
  ])
}


const cityView = curry((dispatch, element) => {
  return div({ className: 'ba-ns mt3' }, [
    smallBox('Location', element.location),
    smallBox('Temp', element.temp),
    smallBox('Low', element.low),
    smallBox('High', element.high),
    button({
      onclick: () => dispatch(removeCityMsg(element.id))
    }, 'Delete')
  ])
})

function cityBlock(dispatch, model) {
  return div({ className: 'mw-100' }, map(cityView(dispatch), model.cities))
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Weather'),
    inputSet(dispatch),
    cityBlock(dispatch, model),
  ]);
}

export default view;
