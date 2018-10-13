import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search'
import List from './components/List'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <List />
      </div>
    );
  }
}

export default App;
