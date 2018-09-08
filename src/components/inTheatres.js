import React, {Component} from 'react';

import DisplayItems from './displayItems';

class NowPlaying extends Component{
	
	state = {
		data: [],
		isLoading: true
	}
	
	componentDidMount(){
		const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29&language=en-US&page=1`
		
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading:false}))
	}
	
	render(){
		
		if (this.state.isLoading) { // IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
			return <h1>Loading</h1>
		}
		
		return(
			<div>
				<h2>
					Now Playing:
				</h2>
				<DisplayItems type="movie" item={this.state.data.results}/>
			</div>
		)
	}
}

export default NowPlaying;