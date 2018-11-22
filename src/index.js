import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import style from "./style/main.css";
import Home from './components/home';
import Search from './components/search';
import NavBar from './components/nav';
import Discover from './components/discover';
import ItemDetails from './components/itemDetail';

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
						
							<form className="form" autoComplete="off">
								<input id="query" type="text" onChange={this.handleChange} value={this.state.query} placeholder="Search..."/>
								<span className="focus-border"></span>
							</form>
							<select onChange={this.handleChange} name="type" value={this.state.searchType} id="searchType">
								<option value="movie">Movies</option>
								<option value="tv">Tv Shows</option>
								<option value="person">People</option>
							</select>
							<Link to={`/${this.state.searchType}/${this.state.query}`}>
								<button className="form-search">Search</button>
							</Link>
							
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