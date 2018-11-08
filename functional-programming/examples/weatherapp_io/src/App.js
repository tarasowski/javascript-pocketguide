import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import axios from 'axios';

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    const updates = update(msg, model);
    Array.isArray(updates) ? model = updates[0] : model = updates
    Array.isArray(updates) ? httpEffects(dispatch, updates[1]) : null
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

function httpEffects(dispatch, command) {
  return command === null
    ? null
    : axios(command.request).then(response => dispatch(command.successMsg(response)))
}

export default app;
