import React, {Component,Fragment} from 'react';
import {Link} from "react-router-dom";

import DisplayItems from '../displayItems';

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
		const API_KEY = this.props.apiKey;
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
			return (
				<div className="item-detail-container">
					<h1 className="loading">Loading</h1>
				</div>
  		)
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
				
				<div className="top-container">
					<img className="item-poster" src={imageURL} alt="Profile Picture"/>
					
					<div id="person-info">
						<h1>{name}</h1>
						<h2>Born: {displayDate(birthday)} in {place_of_birth}</h2>
						{deathday ? <h2>Died: {displayDate(deathday)}</h2> : ""}
						<h2>{known_for_department}</h2>
						
						<p>{biography}</p>
					</div>
				</div>
				
				<div className="item-credits" id="person-credits">
					<h2>Cast</h2>
					<h2>Crew</h2>
					<div className="person-cast-scroll" id="person-cast">
						<div id="movie">
							<h4>Movies:</h4>
							{this.filterArray(combined_credits.cast,"movie").map(({character, title, id, media_type, credit_id}) => (
								<li className="credit-name" key={credit_id}>
									<b>{character ? character : "Unknown"}</b>
									<span>in</span>
									<Link className="person-credit-right" to={`/about/${media_type}?id=${id}`}>
										{title}
									</Link>
								</li>
							))}
						</div>
						<div id="tv">
							<h4>Tv Shows:</h4>
							{this.filterArray(combined_credits.cast,"tv").map(({character, name, id, media_type, credit_id}) => (
								<li className="credit-name" key={credit_id}>
									<b>{character ? character : "Unknown"}</b>
									<span>in</span> 
									<Link className="person-credit-right" to={`/about/${media_type}?id=${id}`}>
										{name}
									</Link>
								</li>
							))}
						</div>
					</div>
					<div className="person-cast-scroll" id="person-crew">
						{combined_credits.crew.map(({credit_id, id, job, title, media_type}) => (
							<li className="credit-name" key={credit_id}>
								<b>{job ? job : "Unknown"}</b>
								<span>on</span> 
								<Link className="person-credit-right" to={`/about/${media_type}?id=${id}`}>
									{title}
								</Link>
							</li>
						))}
					</div>
				</div>
				
			</div>
		)
	}
}

export default PersonComponent;