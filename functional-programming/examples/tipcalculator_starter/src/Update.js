import * as R from 'ramda';

const MSGS = {
  BILL_AMOUNT_INPUT: 'BILL_AMOUNT_INPUT',
  TIP_PERCENTAGE_INPUT: 'TIP_PERCENTAGE_INPUT',
}

export function billAmountInputMsg(bill) {
  return {
    type: MSGS.BILL_AMOUNT_INPUT,
    bill
  }
}

export function percentageInputMsg(tip) {
  return {
    type: MSGS.TIP_PERCENTAGE_INPUT,
    tip
  }
}

function fromNumberToPercent(bill, tip) {
  return bill * (tip / 100)
}

function calculateTip(model) {
  const { bill, tip } = model
  return bill
    ? {
      ...model,
      tipTotal: fromNumberToPercent(bill, tip),
      billTotal: fromNumberToPercent(bill, tip) + bill
    }
    : { ...model }
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.BILL_AMOUNT_INPUT: {
      const { bill } = msg
      return calculateTip({
        ...model,
        bill: R.pipe(
          parseInt,
          R.defaultTo(0)
        )(bill)
      })
    }
    case MSGS.TIP_PERCENTAGE_INPUT: {
      const { tip } = msg
      return calculateTip({
        ...model,
        tip: R.pipe(
          parseInt,
          R.defaultTo(0)
        )(tip)
      })
    }
  }
}

export default update;
