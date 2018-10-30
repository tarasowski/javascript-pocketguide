import hh from 'hyperscript-helpers'
import { h, diff, patch } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'

const { div, button } = hh(h)

const initModel = 0

// in this case is model a simple number
function view(dispatch, model) {
    return div([
        div({ className: 'mv2' }, `Count: ${model}`),
        button({ className: 'pv1 ph2 mr2', onclick: () => dispatch(MSGS.ADD) }, '+'),
        button({ className: 'pv1 ph2', onclick: () => dispatch(MSGS.SUBSTRACT) }, '-')
    ])
}

const MSGS = {
    ADD: 'ADD',
    SUBSTRACT: 'SUBSTRACT'
}

function update(msg, model) {
    switch (msg) {
        case MSGS.ADD:
            return model + 1
        case MSGS.SUBSTRACT:
            return model - 1
        default:
            return model
    }
}


// impure code below this line
function app(initModel, update, view, node) {
    let model = initModel
    let currentView = view(dispatch, model)
    let rootNode = createElement(currentView)
    node.appendChild(rootNode)

    function dispatch(msg) {
        model = update(msg, model)
        const updatedView = view(dispatch, model)
        const patches = diff(currentView, updatedView)
        rootNode = patch(rootNode, patches)
        currentView = updatedView
    }
}

const rootNode = document.getElementById('app')

app(initModel, update, view, rootNode)

// this code causes a side-effect. So we should eliminate or tightly control it.
// can we eliminate it? Not really, we need something to show on the page. So we need tightly control it.
//rootNode.appendChild(view(update('minus', initModel)))