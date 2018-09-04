import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom"

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
	
	componentDidMount(){
		const urlMovie = 'https://api.themoviedb.org/3/trending/movie/week?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29';
		
		// Grabbing the Trending movies and putting it into state
		fetch(urlMovie)
			.then(result => result.json())
			.then(result => this.setState({ movie: result.results }))
	}
	
	render(){
		
		return(
			<div className="trending-main">
				<h3>This is trending movies</h3>
				<div className="trending-containers" id="trending-movie-container">
					{
						this.state.movie.map(element => (
						// Putting every Movie into Link container
						<Link to={`/about/movie?id=${element.id}`} key={element.id}>
							<img src={`https://image.tmdb.org/t/p/w185${element.poster_path}`} alt="Movie poster"/>
							<p>{element.title}</p>
						</Link>
						) )
					}
				</div>
			</div>
		)
	}
}

// TRENDING TV 

export class TrendingTv extends Component{
	
	state = {
		tv:[]
	}
	
	componentDidMount(){
		const urlTv = 'https://api.themoviedb.org/3/trending/tv/week?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29';
		
		// Grabbing the Trending TV shows and putting it into state
		fetch(urlTv)
			.then(result => result.json())
			.then(result => this.setState({ tv: result.results }))
	}
	
	render(){
		return(
			<div className="trending-main">
				<h3>This is trending tv</h3>
				<div className="trending-containers" id="trending-tv-container">
					{
						this.state.tv.map(element => (
							// Putting every TV show into Link container
							<Link to={`/about/tv?id=${element.id}`} key={element.id}>
								<img src={`https://image.tmdb.org/t/p/w185${element.poster_path}`} alt="Tv poster"/>
								<p>{element.name}</p>
							</Link>
						))
					}
				</div>
			</div>
		)
	}
}

export default Trending;