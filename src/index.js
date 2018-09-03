import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import style from "./style/main.css";
import Home from './components/home';
import Search from './components/search';

const API_KEY = 'b41936b8ed0f4f2f3e076cf8f2d3af29';
// TODO: MOVE API KEY, LINKS AND OTHER CONST DATA TO OTHER FILE 

class App extends Component{
	
	state = { 
		searchType: 'movies',
		query: '',
		isSearching: false
	}
	
	getInfo = () => {
		console.log(this.state);
	}
	
	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value, isSearching: false})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({isSearching: true})
	}
	
	render(){
		return(
			<Router>
				<div id="main-container">
					
					<section id="form-container">
					
						<form onSubmit={this.handleSubmit}>
							<input id="query" type="text" onChange={this.handleChange} value={this.state.query} placeholder="Search..."/>
						</form>
						<select onChange={this.handleChange} name="type" value={this.state.searchType} id="searchType">
							<option value="movies">Movies</option>
							<option value="tv">Tv Shows</option>
						</select>
						
					</section>
					
					<button onClick={this.getInfo}>State Check</button>
					
					{this.state.isSearching ? <Redirect key="from-search" to={`/${this.state.searchType}/${this.state.query}`}/> : ""}
					
					<Route exact path="/" component={Home}/>
					<Route path="/:searchType/:query" component={Search}/>
					
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));