import { toString } from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { billAmountInputMsg, percentageInputMsg } from './Update'

const {
  div,
  h1,
  pre,
  input,
  h6,
  p,
  span
} = hh(h);

function inputField(dispatch, value, oninput) {
  return input({
    type: 'text',
    value,
    className: 'mb1',
    oninput
  })
}

function inputBox(dispatch, header, value, inputMsg) {
  return div([
    h6({ className: 'mb1' }, header),
    inputField(dispatch, value, inputMsg)
  ])

}

function calculatedField(fieldName, fieldValue) {
  return div({ className: 'mt3' }, [
    span('', fieldName),
    span('', `$ ${toString(fieldValue)}`)
  ])
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputBox(dispatch, 'Bill Amount', model.bill, e =>
      dispatch(billAmountInputMsg(e.target.value))),
    inputBox(dispatch, 'Tip %', model.tip, e =>
      dispatch(percentageInputMsg(e.target.value))),
    calculatedField('Tip Total:', model.tipTotal),
    calculatedField('Total:', model.billTotal),
    //pre(JSON.stringify(model, null, 2)), shows the raw data model that needs to be converted to html, so user can interact with that model through the user interface.
  ]);
}

export default view;
