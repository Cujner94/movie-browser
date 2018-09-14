import React, {Component,Fragment} from 'react';
import {Link} from "react-router-dom";

import DisplayItems from './displayItems';

const API_KEY = `b41936b8ed0f4f2f3e076cf8f2d3af29`;


// ----------------
//MAIN SWITCH
// ----------------

class ItemDetails extends Component{
	
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
		const id = this.props.location.search.slice(4);
		const searchType = this.props.match.params.searchType;
		let renderThis;
		
		// Checking for what type of component to render
		switch (searchType) {
			case 'movie':
				renderThis = <MovieComponent key={id} displayDate={this.displayDate} location={this.props.location} id={id} />
				break;
			case 'tv':
				renderThis = <TvComponent key={id} displayDate={this.displayDate} location={this.props.location} id={id} />
				break;
			case 'person':
				renderThis = <PersonComponent key={id} displayDate={this.displayDate} location={this.props.location} id={id} />
				break;	
		}
		
		
		return(
			<div>
				{renderThis}
			</div>
		)
	}
}


// ----------------
// MOVIE COMPONENT 
// ----------------

class MovieComponent extends Component{
	
	state={
		data : [],
		isLoading: true
	}
	
	
	componentDidMount(){
		const id = this.props.id;
		const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,similar`;
		
		this.setState({data:[], isLoading:true})
		
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false})); // Fetching data for movie detail
	}
	
	render(){
		
		if (this.state.isLoading) { // IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
			return <h1>Loading</h1>
		}
		
		const displayDate = this.props.displayDate; // PUTTING PROPS IN A CONST FOR EASIER READ
		
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
						similar } = this.state.data; // DECONSTRUCTING STATE INTO VARIABLES THAT ARE NEEDED IN COMPONENT
						
		const imageURL= `https://image.tmdb.org/t/p/w342/${poster_path}`; // IMAGE URL
		
		// RENDERING MOVIE COMPONENT
		return(
			<div id="movie-details" className="item-detail-container">
				
				<img id="movie-poster" src={imageURL} alt="Movie Poster"/>
				
				<div id="movie-description">
				
					<div className="movie-text">
						<h1>{title}</h1>
						
						<div className="movie-simple-info">
							<p>{runtime ? `${runtime}min` : "Unknown"}</p>
							<p>|</p>
							<p>{release_date ? `${displayDate(release_date)} (${status})` : `Unknown (${status})` }</p>
							<p>|</p>
							<p>Vote Average: {vote_average}</p>
						</div>
						
						
						<div className="movie-simple-info">
							{genres.map(({id, name}) =>(
								<p className="movie-genre" key={id}>{name}</p>
							))}
						</div>
						
						<p id="movie-overview">{overview}</p>
					</div>
					
					
					<div id="movie-trailers">
						<h2>Trailer Container</h2>
					</div>
					
				</div>
				
				<div id="movie-empty">
					<h2>Empty</h2>
				</div>
				
				<div id="movie-credits">
					<h2>Cast</h2>
					<ul className="credit-ul">
						{credits.cast.map(({id, cast_id, character, name}) => (
							<li key={cast_id}>
								<p>
									<Link to={`/about/person?id=${id}`}>
										<b>{name}</b>
									</Link> as <b>{character}</b>
								</p>
							</li>
						))}
					</ul>
					
					<h2>Crew</h2>				
					<ul className="credit-ul">
						{credits.crew.slice(0, 20).map(({id, credit_id , job, name}) => (
							<li key={credit_id}>
								<p>
									<Link to={`/about/person?id=${id}`}>
										<b>{name}</b>
									</Link> - <b>{job}</b>
								</p>
							</li>
						))}
					</ul>
				</div>
				
				<div id="movie-similar" className="similar">
					<DisplayItems type="movie" item={similar.results} />
				</div>
			</div>
		)
	}
}


// ----------------
// TV COMPONENT
// ----------------

class TvComponent extends Component{
	
	state={
		data : [],
		isLoading: true
	}
	
	componentDidMount(){
		const id = this.props.id;
		const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=similar`;
		
		this.setState({data:[], isLoading:true})
		
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false})); // Fetching data for movie detail
	}
	
	render(){
		
		if (this.state.isLoading) { // IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
			return <h1>Loading</h1>
		}
		
		const displayDate = this.props.displayDate; // PUTTING PROPS IN A CONST FOR EASIER READ
		
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
						similar } = this.state.data;
		
		const imageURL= `https://image.tmdb.org/t/p/w342/${poster_path}`; // IMAGE URL
		
		return(
			<div className="item-detail-container">
				<img src={imageURL} alt="Tv Poster"/>
				<h1>{name}</h1>
				<h2>Number of seasons: {number_of_seasons} ({number_of_episodes} episodes)</h2>
				<h4>First air : {displayDate(first_air_date)}</h4>
				<h4>Last episode : {displayDate(last_air_date)}</h4>
				<p>{overview}</p>
				
				<h2>Genre:</h2>
				{genres.map(({id, name}) =>(
					<li key={id}>{name}</li>
				))}
				
				<p><b>Vote Average:</b> {vote_average}</p>
				<h2>Status : {status}</h2>
				
				{seasons.map(({id, season_number}) => (
					<TvSeasons key={id} location={this.props.location} id={this.props.id} season={season_number} />
				))}
				
				<h2>Similar Shows</h2>
				<div className="similar">
					<DisplayItems type="tv" item={similar.results} />
				</div>
			</div>
		)
	}
}


// ----------------
// PERSON COMPONENT
// ----------------

class PersonComponent extends Component{
	
	state={
		data : [],
		isLoading: true
	}
	
	componentDidMount(){
		const id = this.props.id;
		const url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US&append_to_response=combined_credits
		`;
		
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false})); // Fetching data for movie detail
	}
	
	filterArray = (myArr, type) => {  //FILTERING ARRAY FOR THE RIGHT TYPE OF MEDIA
		const newArr = myArr.filter(element => element.media_type == type);
		return newArr;
	}
	
	render(){
		
		if (this.state.isLoading) { // IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
			return <h1>Loading</h1>
		}
		
		
		const displayDate = this.props.displayDate; // PUTTING PROPS IN A CONST FOR EASIER READ
		
		const { birthday,
						known_for_department,
						deathday,
						name,
						biography,
						place_of_birth,
						profile_path,
						combined_credits } = this.state.data; //Destructuring
						
		const imageURL= `https://image.tmdb.org/t/p/h632/${profile_path}`; // IMAGE URL
		
		return(
			<div className="item-detail-container">
				<img src={imageURL} alt="Profile Picture"/>
				<h1>{name}</h1>
				<h2>{known_for_department}</h2>
				<h2>Born: {displayDate(birthday)} in {place_of_birth}</h2>
				{deathday ? <h2>Died: {displayDate(deathday)}</h2> : ""}
				
				<p>{biography}</p>
				
				<div>
					<h3>Cast</h3>
					<div id="movie">
						<h4>Movies:</h4>
						{this.filterArray(combined_credits.cast,"movie").map(({character, title, id, media_type, credit_id}) => ( //FIXME: REMOVE CODE REPEATING
							<li key={credit_id}>As {character ? character : "Unknown"} in <Link to={`/about/${media_type}?id=${id}`}>{title}</Link></li>
						))}
					</div>
					<div id="tv">
						<h4>Tv Shows:</h4>
						{this.filterArray(combined_credits.cast,"tv").map(({character, name, id, media_type, credit_id}) => (
							<li key={credit_id}>As {character ? character : "Unknown"} in <Link to={`/about/${media_type}?id=${id}`}>{name}</Link></li>
						))}
					</div>
				</div>
				
			</div>
		)
	}
}


// ----------------
// SEASON COMPONENT
// ----------------

// FIXME: MANAGE SEASONS WITH A LOT OF EPISODES TO NOT SLOW DOWN BROWSER 
class TvSeasons extends Component{
	
	state={
		data : [],
		isLoading: true
	}
	
	componentDidMount(){
		let id = this.props.id;
		let season = this.props.season;
		const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`;
		
		this.setState({data : [], isLoading:true});
		
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false}));
	}
	
	render(){
		
		if (this.state.isLoading) { // IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
			return <h1>Loading</h1>
		}
		
		const { episodes,
						id,
						name,
						season_number } = this.state.data; //Destructuring
		
		
		return(
			<div>
				<p>Season : {season_number}</p>
				<p>Name : {name}</p>
				<div>
					{episodes.map(({id,name, episode_number}) =>(
						<p key={id}>Episode {episode_number} - "{name}"</p>
					))}
				</div>
			</div>
		)
	}
}

export default ItemDetails;