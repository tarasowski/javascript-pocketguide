import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import tableView from './components/Table'

import {
    showFormMsg,
    mealInputMsg,
    caloriesInputMsg,
    saveMealMsg
} from './Update'

const { pre, div, button, h1, label, input, form } = hh(h)

function buttonSet(dispatch) {
    return div([
        button({
            className: 'f3 pv2 ph3 bg-blue white bn mr2',
            type: 'submit',
        }, 'Save'),
        button({
            className: 'f3 pv2 ph3 bg-orange white bn',
            type: 'button',
            onclick: () => dispatch(showFormMsg(false))
        }, 'Cancel')
    ])
}


function fieldSet(labelText, inputValue, oninput) {
    return div([
        label({ className: 'db mb1' }, labelText),
        input({
            className: 'pa2 input-reset ba w-100 mb2',
            type: 'text',
            value: inputValue,
            oninput
        })
    ])
}

function formView(dispatch, model) {
    const { description, calories, showForm } = model
    if (showForm) {
        return form({
            className: 'w-100 mv2', onsubmit: e => {
                e.preventDefault()
                dispatch(saveMealMsg)
            }
        }, [
                fieldSet('Meal', description, e => dispatch(mealInputMsg(e.target.value))),
                fieldSet('Calories', calories || '', e => dispatch(caloriesInputMsg(e.target.value))),
                buttonSet(dispatch)
            ])
    }
    return button({ className: 'f3 pv2 ph3 bg-blue white bn', onclick: () => dispatch(showFormMsg(true)) }, 'Add Meal')
}

function view(dispatch, model) {
    return div({ className: 'mw6 center' }, [
        h1({ className: 'f2 pv2 bb' }, 'Calorie Counter'),
        formView(dispatch, model),
        tableView(dispatch, model),
        pre({}, JSON.stringify(model, null, 4))
    ])
}


export default view