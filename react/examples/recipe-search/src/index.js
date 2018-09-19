import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Router from './components/Router'

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
