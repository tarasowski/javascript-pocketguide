import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import * as R from 'ramda'
import { deleteMealMsg, editMealMsg } from '../Update'

const { div, table, tr, th, td, thead, tbody, i } = hh(h)


function totalRow(meals) {
    const total = R.pipe(
        R.map(meal => meal.calories),
        R.sum
    )(meals)
    return tr([
        cell(td, '', 'Total:'),
        cell(td, '', total)
    ])
}

function mealRow(dispatch, className, meal) {
    const { description, calories, id } = meal
    return tr([
        cell(td, '', description),
        cell(td, '', calories),
        cell(td, '', [
            i({
                className: 'ph1 fa fa-trash-o pointer',
                onclick: () => dispatch(deleteMealMsg(id))
            }
            ),
            i({
                className: 'ph1 fa fa-pencil-square-o pointer',
                onclick: () => dispatch(editMealMsg(id))
            })
        ])
    ])
}

function cell(tag, className, value) {
    return tag({ className }, value)
}

function mealsBody(dispatch, className, meals) {
    const rows = R.map(
        R.partial(mealRow, [dispatch, 'stripe-dark']), meals
    )
    const rowsWithTotal = [...rows, totalRow(meals)]
    return tbody({ className }, rowsWithTotal)
}


const tableHeader = thead([
    tr([
        cell(th, 'fw6 bb b--black-20 tl pb3 pr3 bg-white', 'Meal'),
        cell(th, 'fw6 bb b--black-20 tl pb3 pr3 bg-white', 'Calories'),
        cell(th, 'fw6 bb b--black-20 tl pb3 pr3 bg-white', '')
    ])
])

function tableView(dispatch, model) {
    const { meals } = model
    if (meals.length === 0) {
        return div({ className: 'mt2' }, 'No meals to display...')
    }
    return table({ className: 'f6 w-100 mw8 center mt3' },
        [
            tableHeader,
            mealsBody(dispatch, '', meals)
        ])
}


export default tableView