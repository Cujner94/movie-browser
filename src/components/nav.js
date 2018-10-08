import React,{Component} from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => (
	<nav id="nav-bar">
		<Link className="nav-link" replace to="/">Home</Link>
		<Link className="nav-link" to="/discover/movie">Discover Movies</Link>
		<Link className="nav-link" to="/discover/tv">Discover TV</Link>
	</nav>
)

export default NavBar;