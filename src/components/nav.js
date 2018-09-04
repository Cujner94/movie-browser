import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component{
	render(){
		return(
			<nav>
				<Link replace to="/"><button>Home</button></Link>
				<Link to="/discover"><button>Discover</button></Link>
				<Link to="/movies"><button>Movies</button></Link>
				<Link to="/tv"><button>Tv</button></Link>
			</nav>
		)
	}
}

export default NavBar;