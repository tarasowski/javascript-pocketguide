import React, { Component } from 'react';
import './App.css';
import Form from './components/Form'
import Recipes from './components/Recipes';


const API_KEY = 'c8dfd2224b910c1f9259f73e73b8fbff'

class App extends Component {
  state = {
    recipes: []
  }
  getRecipe = async (event) => {
    event.preventDefault()
    const recipeName = event.target.elements.recipeName.value
    const api_call = `https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`
    const res = await fetch(api_call)
    const data = await res.json()
    this.setState({recipes: data.recipes})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
