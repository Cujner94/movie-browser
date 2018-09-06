import React, {Component,Fragment} from 'react';

import {DisplayItems} from './trending';

const API_KEY = `b41936b8ed0f4f2f3e076cf8f2d3af29`;

class ItemDetails extends Component{
	render(){
		const id = this.props.location.search.slice(4);
		const searchType = this.props.match.params.searchType;
		let renderThis;
		
		// Checking for what type of component to render
		switch (searchType) {
			case 'movie':
				renderThis = <MovieComponent location={this.props.location} id={id} />
				break;
			case 'tv':
				renderThis = <TvComponent location={this.props.location} id={id} />
				break;
			case 'person':
				renderThis = <PersonComponent location={this.props.location} id={id} />
				break;	
		}
		
		
		return(
			<div>
				{renderThis}
			</div>
		)
	}
}

// MOVIE COMPONENT 
class MovieComponent extends Component{
	
	state={
		data : [],
		isLoading: true
	}
	
	fetchData = () => {
		const id = this.props.id;
		const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,similar`;
		
		// Fetching data for movie detail
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false}));
	}
	
	componentDidMount(){
		this.fetchData();
	}
	
	componentDidUpdate(prevProps){
		if (this.props.location.search !== prevProps.location.search || this.props.location.pathname !== prevProps.location.pathname) {
			this.fetchData();
		}
	}
	
	// CONVERT DATE
	displayDate = (date) => {
		const newDate = new Date(date);
		const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		const day   = newDate.getDate();
		const month = monthNames[newDate.getMonth()];
		const year  = newDate.getFullYear();
		
		return `${day} ${month} ${year}`;
	}
	
	render(){
		// IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
		if (this.state.isLoading) {
			return <h1>Loading</h1>
		}
		
		// DECONSTRUCTING STATE INTO VARIABLES THAT ARE NEEDED IN COMPONENT
		const {	genres, 
						overview, 
						production_companies, 
						release_date, 
						runtime, 
						status, 
						title, 
						vote_average, 
						poster_path, 
						credits, 
						similar} = this.state.data;
						
		// IMAGE URL
		const imageURL= `https://image.tmdb.org/t/p/w342/${poster_path}`;
		
		// RENDERING MOVIE COMPONENT
		return(
			<div>
				
				{/* MOVIE DETAILS */}
				<img src={imageURL} alt="Movie Poster"/>
				<h1>{title}</h1>
				<h2>Runtime: {runtime}min</h2>
				<h3>Release Date : {this.displayDate(release_date)} ({status})</h3>
				<p>{overview}</p>
				
				{/* GENGRE */}
				<h2>Genre:</h2>
				{genres.map(({id, name}) =>(
					<li key={id}>{name}</li>
				))}
				
				{/* PRODUCTION COMPANIES */}
				<h2>Production Companies:</h2>
				{production_companies.map(({id, name}) => (
					<li key={id}>{name}</li>
				))}
				
				{/* VOTE AVERAGE */}
				<p><b>Vote Average:</b> {vote_average}</p>
				
				{/* CAST */}
				<ul>
					{credits.cast.map(({id, character, name}) => (
						<li key={id}>
							<p><b>{name}</b> as <b>{character}</b></p>
						</li>
					))}
				</ul>
				
				{/* SIMILAR MOVIES */}
				<div className="trending-containers">
					<DisplayItems type="movie" item={similar.results} />
				</div>
			</div>
		)
	}
}

// TV COMPONENT
class TvComponent extends Component{
	
	state={
		data : [],
		isLoading: true
	}
	
	fetchData = () => {
		const id = this.props.id;
		const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=similar`;
		
		// Fetching data for movie detail
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false}));
	}
	
	componentDidMount(){
		this.fetchData();
	}
	
	componentDidUpdate(prevProps){
		if (this.props.location.search !== prevProps.location.search || this.props.location.pathname !== prevProps.location.pathname) {
			this.fetchData();
		}
	}
	
	// CONVERT DATE
	displayDate = (date) => {
		const newDate = new Date(date);
		const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		const day   = newDate.getDate();
		const month = monthNames[newDate.getMonth()];
		const year  = newDate.getFullYear();
		
		return `${day} ${month} ${year}`;
	}
	
	render(){
		// IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
		if (this.state.isLoading) {
			return <h1>Loading</h1>
		}
		
		const { first_air_date,
						genres,
						last_air_date,
						name,
						number_of_episodes,
						number_of_seasons,
						overview,
						poster_path,
						seasons,
						vote_average,
						networks,
						status,
						similar
		} = this.state.data;
		
		// IMAGE URL
		const imageURL= `https://image.tmdb.org/t/p/w342/${poster_path}`;
		
		return(
			<div>
				<img src={imageURL} alt="Tv Poster"/>
				<h1>{name}</h1>
				<h2>Number of seasons: {number_of_seasons} ({number_of_episodes} episodes)</h2>
				<h4>First air : {this.displayDate(first_air_date)}</h4>
				<h4>Last episode : {this.displayDate(last_air_date)}</h4>
				<p>{overview}</p>
				
				<h2>Genre:</h2>
				{genres.map(({id, name}) =>(
					<li key={id}>{name}</li>
				))}
				
				<p><b>Vote Average:</b> {vote_average}</p>
				<h2>Status : {status}</h2>
				
				<div className="trending-containers">
					<DisplayItems type="tv" item={similar.results} />
				</div>
			</div>
		)
	}
}

// PERSON COMPONENT
class PersonComponent extends Component{
	
	componentDidMount(){
		console.log("Person Mounted");
		const id = this.props.id;
		// Fetching data for person detail
	}
	
	render(){
		return(
			<div>
				<h1>Person Component</h1>
			</div>
		)
	}
}

export default ItemDetails;