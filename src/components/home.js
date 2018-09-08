import React, { Component } from 'react';


import NowPlaying from './inTheatres';

class Home extends Component{
	render(){
		return(
			<div id="home-container">
				<h2>
					Sup Home
				</h2>
				<NowPlaying/>
			</div>
		)
	}
}

export default Home;