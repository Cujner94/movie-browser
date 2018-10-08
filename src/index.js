import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';

import style from "./style/main.css";
import Home from './components/home';
import Search from './components/search';
import NavBar from './components/nav';
import Discover from './components/discover';
import ItemDetails from './components/itemDetail';

const API_KEY = 'b41936b8ed0f4f2f3e076cf8f2d3af29';
// TODO: MOVE API KEY, LINKS AND OTHER CONST DATA TO OTHER FILE 

class App extends Component{
	
	state = { 
		searchType: 'movie',
		query: ''
	}
	
	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}
	
	render(){
		return(
			<Router>
				<div>
					
					<header id="header">
						<NavBar/>
						
						<section id="form-container">
						
							<form autoComplete="off" action={`/${this.state.searchType}/${this.state.query}`} method="GET">
								<div className="input-container">
									<input id="query" type="text" onChange={this.handleChange} value={this.state.query} placeholder="Search..."/>
									<span className="focus-border"></span>
								</div>
							</form>
							<select onChange={this.handleChange} name="type" value={this.state.searchType} id="searchType">
								<option value="movie">Movies</option>
								<option value="tv">Tv Shows</option>
								<option value="person">People</option>
							</select>
							
						</section>
					</header>
					
					<main id="main-container">
						
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route path="/about/:searchType" component={ItemDetails}/>
							<Route path="/discover/:type" component={Discover}/>
							<Route path="/:searchType/:query" component={Search}/>
							<Route component={Home}/>
						</Switch>
						
					</main>
					
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));