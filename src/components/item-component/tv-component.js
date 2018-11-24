import React, {Component,Fragment} from 'react';

import DisplayItems from '../displayItems';

// ----------------
// TV COMPONENT
// ----------------


class TvComponent extends Component{
	
	state={
		data : [],
		isLoading: true,
		isShowingSeason: false,
		seasonNum: ""
	}
	
	componentDidMount(){
		const id = this.props.id;
		const API_KEY = this.props.apiKey;		
		const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=similar`;
		
		this.setState({data:[], isLoading:true})
		
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false})); // Fetching data for movie detail
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
	
	handleButton = (e) => {
		this.setState({seasonNum: e.target.value, isShowingSeason:true});
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
			
			
				<div className="top-container">
					<img className="item-poster" src={imageURL} alt="Tv Poster"/>
					
					
					<div className="tv-description">
						<h1>{name}</h1>
						
						<section className="item-stats">
								<div>
									<div className="item-stats-main">
										<p>Seasons</p>
									</div>
									<div className="item-stats-stats">
										<p>{number_of_seasons} ({number_of_episodes} episodes)</p>
									</div>
								</div>
								<div>
									<div className="item-stats-main">
										<p>First Air</p>
									</div>
									<div className="item-stats-stats">
										<p>{displayDate(first_air_date)}</p>
									</div>
									<div className="item-stats-main">
										<p>Last episode</p>
									</div>
									<div className="item-stats-stats">
										<p>{displayDate(last_air_date)}</p>
										<span>({status})</span>
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
						
						<p id="tv-overview">{overview}</p>
						
					</div>
				</div>
				
				<div className="season-grid">
					<div className="seasonNum-grid">
						{seasons.map(({id, season_number}) => (
							<button value={season_number} onClick={this.handleButton} key={id}>{season_number}</button>
						))}
					</div>
						{this.state.isShowingSeason ? <TvSeasons key={this.state.seasonNum} location={this.props.location} id={this.props.id} season={this.state.seasonNum} displayDate={displayDate} /> : ""}
				</div>
				
				
				{similar.results.length > 0 ? (<div id="tv-similar" className="similar-container-2">
					<div className="similar">
						<DisplayItems type="tv" item={similar.results} />
						<button onClick={this.handleScroll} className="scroll-button" id="left"></button>
						<button onClick={this.handleScroll} className="scroll-button" id="right"></button>
					</div>
				</div>) : ""}
			</div>
		)
	}
}

// ----------------
// SEASON COMPONENT
// ----------------

class TvSeasons extends Component{
	
	state={
		data : [],
		isLoading: true
	}
	
	componentDidMount(){
		let id = this.props.id;
		let season = this.props.season;
		const API_KEY = `b41936b8ed0f4f2f3e076cf8f2d3af29`;
		
		const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`;
		
		this.setState({data : [], isLoading:true});
		
		fetch(url).then(result => result.json()).then(data => this.setState({data, isLoading: false}));
	}
	
	render(){
		
		if (this.state.isLoading) { // IF DATA IS NOT FETCHED DISPLAY LOADING TO ESCAPE ERRORS
			return <h1 className="loading">Loading</h1>
		}
		
		const { episodes,
						id,
						season_number } = this.state.data; //Destructuring
		
		
		return(
			<div>
				<h2>Season {season_number}</h2>
				<div>
					{episodes.map(({id,name, episode_number, air_date}) =>(
						<div key={id} className="episode-container">
							<p className="episode-name">{episode_number}. "{name}"</p>
							<p className="episode-date">{air_date ? this.props.displayDate(air_date) : "Unknown"}</p>
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default TvComponent;