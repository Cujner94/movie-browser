import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component{
	render(){
		return(
			<nav id="nav-bar">
				<Link className="nav-link" replace to="/">Home</Link>
				<Link className="nav-link" to="/discover">Discover</Link>
				<Link className="nav-link" to="/movies">Movies</Link>
				<Link className="nav-link" to="/tv">Tv</Link>
			</nav>
		)
	}
}

export default NavBar;