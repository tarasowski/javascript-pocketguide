import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from '../utils/request'
import { setBusy, storeResult } from '../actions/actions'
import { searchActionCreator } from '../actions/actionCreators'


class Search extends Component {
    constructor(props) {
        super(props)
        this.onSearchUserClick = this.onSearchUserClick.bind(this)
    }
    state = {
        userName: ''
    }
    onInputChange(userName) {
        this.setState({ userName })
    }
    onSearchUserClick() {
        if (this.props.busy) {
            return
        }
        this.props.dispatch(searchActionCreator(this.state.userName))
    }
    render() {
        return (
            <div>
                <div className='search-bar'>

                    <input
                        placeholder="Enter a Github User's name"
                        value={this.state.userName}
                        onChange={event => this.onInputChange(event.target.value)}
                        type='text'
                    />

                    <button
                        className={this.props.busy ? 'busy' : ''}
                        disabled={this.props.busy}
                        onClick={this.onSearchUserClick}
                        type="submit"
                    >Search </button>


                </div>
                <div className='repo-list'>
                    <h4>List of available repositories:</h4>
                    <p>(click on any repo to visit on GitHub)</p>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        busy: state.home.busy
    }
}
export default connect(mapStateToProps)(Search) 