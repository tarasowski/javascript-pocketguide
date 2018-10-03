import React, { Component } from 'react';
import './App.css';

import M from './components/Mutation'

class App extends Component {
  render() {
    return (
      <div>
        <h2>My first Apollo app</h2>
        <M />
      </div>
    );
  }
}

export default App;
