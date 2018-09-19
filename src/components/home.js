import React, { Component } from 'react';


import NowPlaying from './in-theatres';

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