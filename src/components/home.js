import React, { Component } from 'react';


import NowPlaying from './inTheatres';

class Home extends Component{
	render(){
		return(
			<div id="home-container">
			<h1>Home</h1>
				<NowPlaying/>
			</div>
		)
	}
}

export default Home;