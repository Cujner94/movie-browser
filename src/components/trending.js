import React, { Component } from 'react';


class Trending extends Component{
	render(){
		return(
			<div>
				<h1>This is Trending</h1>
				<TrendingMovies/>
				<TrendingTv/>				
			</div>
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
			<div>
				<h3>This is trending movies</h3>
				<button onClick={this.getInfo}>Check Movies</button>
				{
					this.state.movie.map(element => (
					<ul key={element.id}>
						<img src={`https://image.tmdb.org/t/p/w185${element.poster_path}`} alt="Movie poster"/>
						<li>{element.title}</li>
					</ul>
					) )
				}
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
			<div>
				<h3>This is trending tv</h3>
				<button onClick={this.getInfo}>Check Tv</button>
				{
					this.state.tv.map(element => (
						<ul key={element.id}>
							<img src={`https://image.tmdb.org/t/p/w185${element.poster_path}`} alt="Tv poster"/>
							<li>{element.name}</li>
						</ul>
					))
				}
			</div>
		)
	}
}

export default Trending;