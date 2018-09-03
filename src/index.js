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
		this.setState({searchType: e.target.value})
	}
	
	handleInput = (e) => {
		this.setState({query: e.target.value})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		
	}
	
	render(){
		return(
			<Router>
				<div id="main-container">
					
					<section id="form-container">
						<form onSubmit={this.handleSubmit}>
							<input id="input-text" type="text" onChange={this.handleInput} value={this.state.query} placeholder="Search..."/>
							<Link to="/movies/lala">Go!</Link>
						</form>
						<select onChange={this.handleChange} name="type" value={this.state.searchType} id="selector">
							<option value="movies">Movies</option>
							<option value="tv">Tv Shows</option>
						</select>
					</section>
					
					<button onClick={this.getInfo}>State Check</button>
					
					<Route exact path="/" component={Home}/>
					<Route path="/movies/lala" component={Search}/>
					
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));