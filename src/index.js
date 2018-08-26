import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/home';

const API_KEY = 'b41936b8ed0f4f2f3e076cf8f2d3af29';
// TODO: MOVE API KEY, LINKS AND OTHER CONST DATA TO OTHER FILE 

class App extends Component{
	
	state = { 
		query: 'movies'
	}
	
	getInfo = () => {
		console.log(this.state);
	}
	
	handleChange = (e) => {
		this.setState({query: e.target.value})
	}
	
	render(){
		return(
			<Router>
				<div>
					
					<input type="text" placeholder="Search..."/>
					<select onChange={this.handleChange} name="type" id="selector">
						<option value="movies">Movies</option>
						<option value="tv">Tv Shows</option>
					</select>
					
					<button onClick={this.getInfo}>State Check</button>
					
					<Route exact path="/" component={Home}/>
					
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));