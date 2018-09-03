import React, { Component, Fragment } from 'react';


class Trending extends Component{
	render(){
		return(
			<Fragment>
				<h1>This is Trending</h1>
				<TrendingMovies/>
				<TrendingTv/>				
			</Fragment>
		)
	}
}

// TRENDING MOVIES 

export class TrendingMovies extends Component{
	
	state = {
		movie: []
	}
	
	getInfo = () => {
		console.log(this.state.movie);
	}
	
	componentDidMount(){
		const urlMovie = 'https://api.themoviedb.org/3/trending/movie/week?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29'
		fetch(urlMovie)
			.then(result => result.json())
			.then(result => this.setState({ movie: result.results }))
	}
	
	render(){
		
		return(
			<div className="trending-main">
				<h3>This is trending movies</h3>
				<ul className="trending-containers" id="trending-movie-container">
					{
						this.state.movie.map(element => (
						<div key={element.id}>
							<img src={`https://image.tmdb.org/t/p/w185${element.poster_path}`} alt="Movie poster"/>
							<li>{element.title}</li>
						</div>
						) )
					}
				</ul>
			</div>
		)
	}
}

// TRENDING TV 

export class TrendingTv extends Component{
	
	state = {
		tv:[]
	}
	
	getInfo = () => {
		console.log(this.state.tv);
	}
	
	componentDidMount(){
		const urlTv = 'https://api.themoviedb.org/3/trending/tv/week?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29'
		fetch(urlTv)
			.then(result => result.json())
			.then(result => this.setState({ tv: result.results }))
	}
	
	render(){
		return(
			<div className="trending-main">
				<h3>This is trending tv</h3>
				<ul className="trending-containers" id="trending-tv-container">
					{
						this.state.tv.map(element => (
							<div key={element.id}>
								<img src={`https://image.tmdb.org/t/p/w185${element.poster_path}`} alt="Tv poster"/>
								<li>{element.name}</li>
							</div>
						))
					}
				</ul>
			</div>
		)
	}
}

export default Trending;