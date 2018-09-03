import React, { Component } from 'react';

class Search extends Component{
	
	state = {
		urlQuery : '',
		urlSearch : ''
	}
	
	fetchData = () => {
		const {query, searchType} = this.props.match.params;
		const url = `https://api.themoviedb.org/3/search/${searchType}?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29&language=en-US&query=${query}&page=1&include_adult=false`
		
		fetch(url).then(result => result.json()).then(result => console.log(result))
	}
	
	componentDidMount(){
		this.setState({urlQuery : this.props.match.params.query, urlSearch: this.props.match.params.searchType});
		this.fetchData();
	}
	
	componentDidUpdate(){
		if (this.state.urlQuery != this.props.match.params.query || this.state.urlSearch != this.props.match.params.searchType) {
			this.fetchData();
			this.setState({urlQuery : this.props.match.params.query, urlSearch: this.props.match.params.searchType});
		}
	}
	
	render(){
		return(
			<div>
				<h1>This is Search!!!!</h1>
			</div>
		)
	}
}

export default Search;