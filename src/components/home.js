import React, { Component } from 'react';


import Trending from './trending';

class Home extends Component{
	render(){
		return(
			<div id="home-container">
				<h2>
					Sup Home
				</h2>
				<Trending/>
			</div>
		)
	}
}

export default Home;