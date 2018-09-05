import React, {Component} from 'react';

class ItemDetails extends Component{
	render(){
		const id = this.props.location.search.slice(4);
		const searchType = this.props.match.params.searchType;
		let renderThis;
		
		// Checking for what type of component to render
		switch (searchType) {
			case 'movie':
				renderThis = <MovieComponent id={id} />
				break;
			case 'tv':
				renderThis = <TvComponent id={id} />
				break;
			case 'person':
				renderThis = <PersonComponent id={id} />
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
	
	componentDidMount(){
		console.log("Movie Mounted");
		const id = this.props.id;
		// Fetching data for movie detail
	}
	
	render(){
		return(
			<div>
				<h1>Movie Component</h1>
			</div>
		)
	}
}

// TV COMPONENT
class TvComponent extends Component{
	
	componentDidMount(){
		console.log("Tv Mounted");
		const id = this.props.id;
		// Fetching data for movie detail
	}
	
	render(){
		return(
			<div>
				<h1>Tv Component</h1>
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