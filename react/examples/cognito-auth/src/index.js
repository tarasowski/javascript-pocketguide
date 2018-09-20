import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Amplify from 'aws-amplify'
import config from './aws-config'

Amplify.configure(config)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
