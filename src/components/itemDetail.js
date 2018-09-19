import React, {Component,Fragment} from 'react';

import DisplayItems from './displayItems';
import MovieComponent from "./item-component/movie-component";
import TvComponent from "./item-component/tv-component"; 
import PersonComponent from "./item-component/person-component";


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
		const API_KEY = `b41936b8ed0f4f2f3e076cf8f2d3af29`;

		let renderThis;
		
		// Checking for what type of component to render
		switch (searchType) {
			case 'movie':
				renderThis = <MovieComponent apiKey={API_KEY} key={id} displayDate={this.displayDate} location={this.props.location} id={id} />
				break;
			case 'tv':
				renderThis = <TvComponent apiKey={API_KEY} key={id} displayDate={this.displayDate} location={this.props.location} id={id} />
				break;
			case 'person':
				renderThis = <PersonComponent apiKey={API_KEY} key={id} displayDate={this.displayDate} location={this.props.location} id={id} />
				break;	
		}
		
		return(
			<Fragment>
				{renderThis}
			</Fragment>
		)
	}
}

export default ItemDetails;