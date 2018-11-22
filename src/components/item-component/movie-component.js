import React, {Component,Fragment} from 'react';
import {Link} from "react-router-dom";

import DisplayItems from '../displayItems';

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
		const API_KEY = this.props.apiKey;				
		const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,similar,videos`;
		
		this.setState({data:[], isLoading:true})
		
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false})).catch(err => console.dir(err)); // Fetching data for movie detail
	}
	
	handleScroll = (e) => {
		console.dir(e.target);
		if (e.target.id == "left") {
			e.target.parentElement.scrollLeft-=370;
		}
		else{
			e.target.parentElement.scrollLeft+=370;			
		}
	}
	
	render(){
		
		if (this.state.isLoading) { // IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
			return (
				<div className="item-detail-container">
					<h1 className="loading">Loading</h1>
				</div>
			)
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
						similar,
						videos } = this.state.data; // DECONSTRUCTING STATE INTO VARIABLES THAT ARE NEEDED IN COMPONENT
						
		const imageURL= `https://image.tmdb.org/t/p/w342/${poster_path}`; // IMAGE URL
		
		// RENDERING MOVIE COMPONENT
		return(
			<div id="movie-details" className="item-detail-container">
				
				<div id="movie-top" className="top-container">
					{poster_path ? <img className="item-poster" id="movie-poster" src={imageURL} alt="Movie Poster"/> : <div className="item-poster" id="movie-poster"/>}
					
					<div id="movie-description">
					
						<div className="movie-text">
							<h1>{title}</h1>
							
							<section className="item-stats">
								<div>
									<div className="item-stats-main">
										<p>Runtime</p>
									</div>
									<div className="item-stats-stats">
										<p>{runtime ? `${runtime}min` : "Unknown"}</p>
									</div>
								</div>
								<div>
									<div className="item-stats-main">
										<p>Release Date</p>
									</div>
									<div className="item-stats-stats">
										<p>{release_date ? `${displayDate(release_date)} (${status})` : `Unknown (${status})` }</p>
									</div>
								</div>
								<div>
									<div className="item-stats-main">
										<p>Vote Average</p>
									</div>
									<div className="item-stats-stats">
										<p>{vote_average}</p>
									</div>
								</div>
								<div>
									<div className="item-stats-main">
										<p>Genres</p>
									</div>
									<div className="item-stats-stats">
										{genres.map(({id, name}) =>(
											<p className="movie-genre" key={id}>{name}</p>
										))}
									</div>
								</div>
							</section>
							
							<p id="movie-overview">{overview}</p>
						</div>
						
						
						<div id="movie-trailers">
							{videos.results.length>0 ? ( <Trailers trailers={videos.results} /> ) : ""}
						</div>
						
					</div>
				</div>
				
				<div className="item-credits" id="movie-cast">
					<h2>Cast</h2>
					<ul className="credit-ul movie-cast">
						{credits.cast.map(({id, cast_id, character, name}) => (
							<li className="credit-name" key={cast_id}>
								<p className="left-name">
									<Link to={`/about/person?id=${id}`}>
										<b>{name}</b>
									</Link>
								</p>
								<p className="center-name">
									as
								</p>
								<p className="right-name">
									<b>{character}</b>
								</p>
							</li>
						))}
					</ul>
				</div>
				
				<div className="item-credits" id="movie-crew">
					<h2>Crew</h2>				
					<ul className="credit-ul movie-crew">
							{credits.crew.slice(0, 20).map(({id, credit_id , job, name}) => (
								<li className="credit-name" key={credit_id}>
									<p className="left-name">
										<Link to={`/about/person?id=${id}`}>
											<b>{name}</b>
										</Link>
									</p>
									<p className="center-name">
										-
									</p>
									<p className="right-name">
										<b>{job}</b>
									</p>
								</li>
							))}
						</ul>
				</div>
				
				{similar.results.length > 0 ? (<div id="movie-similar" className="similar-container-2">
					<div  className="similar">
						<DisplayItems type="movie" item={similar.results} />
						<button onClick={this.handleScroll} className="scroll-button" id="left"></button>
						<button onClick={this.handleScroll} className="scroll-button" id="right"></button>
					</div>
				</div>) : ""}
			</div>
		)
	}
}

const Trailers = props => {
	const trailers = props.trailers;
		
	return(
		<Fragment>
			<iframe
				width="280" 
				height="170" 
				src={`https://www.youtube.com/embed/${trailers[0].key}`} 
				frameBorder="0" 
				allow="autoplay; encrypted-media" 
				allowFullScreen>
			</iframe>
			{trailers.length>=3 ? (<Fragment>
				<iframe
					width="280" 
					height="170" 
					src={`https://www.youtube.com/embed/${trailers[1].key}`} 
					frameBorder="0" 
					allow="autoplay; encrypted-media" 
					allowFullScreen>
				</iframe>
				<iframe 
					width="280" 
					height="170" 
					src={`https://www.youtube.com/embed/${trailers[2].key}`} 
					frameBorder="0" 
					allow="autoplay; encrypted-media" 
					allowFullScreen>
				</iframe>
			</Fragment>): ""}
		</Fragment>
	)
}

export default MovieComponent;