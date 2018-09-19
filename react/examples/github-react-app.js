// You can use https://jscomplete.com/repl to run this app. Simply copy & pase this code.
const Card = (props) => {
	return (
  	<div>
    <img width='75' src={props.avatar_url} />
    <div style={{display: 'inline-block', marginLeft: 10, }}>
    <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
    <div>{props.company}</div>
    </div>
    </div>  
  )
}

const CardList = (props) => {
	return (
  <div>
  {props.cards.map(element => <div><Card key={element.id} {...element} /></div>)}
  </div>
  )
}

class Form extends React.Component {
	state = {
  	userName: ''
  }
  handleSubmit = (event) => {
  	event.preventDefault()
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    		 .then(res => {
         	this.props.onSubmit(res.data)
          this.setState({userName: ''})
         })
  }
  render() {
  return (
  	<form onSubmit={this.handleSubmit}>
    <input type='text' 
    	value={this.state.userName}
      onChange={event => this.setState({userName: event.target.value})}
      placeholder='Github username' 
      required />
    <button type='submit'>Add card</button>
    </form>
  )
  }
}

class App extends React.Component {
	state = {
  cards: []
  }
  addNewCard = (cardInfo) => {
  	this.setState(prevState =>
    ({cards: prevState.cards.concat(cardInfo)})
    )
  }
  render() {
  return (<div>
  <Form onSubmit={this.addNewCard}/>
  <CardList cards={this.state.cards} />
  </div>)
  }
}

ReactDOM.render(<App />, mountNode)
