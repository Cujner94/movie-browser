import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Search extends Component{
	
	state = {
		data : []
	}
	
	fetchData = () => {
		const {query, searchType} = this.props.match.params;
		const url = `https://api.themoviedb.org/3/search/${searchType}?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29&language=en-US&query=${query}&page=1&include_adult=false`
		
		fetch(url).then(result => result.json()).then(result => this.setState({data : result}))
	}
	
	componentDidMount(){
		this.fetchData();
	}
	
	componentDidUpdate(prevProps){
		if (this.props.match.params.query !== prevProps.match.params.query || this.props.match.params.searchType !== prevProps.match.params.searchType) {
			this.fetchData();
		}
	}
	
	render(){
		const results = this.state.data.results || [];
		const searchType = this.props.match.params.searchType;
		return(
			<div>
				{results.map(({id, poster_path,title, name, profile_path}) => (
					<Link key={id} to={`/about/${searchType}?id=${id}`} className="item-container">
						<li>
							<img src={`https://image.tmdb.org/t/p/w185${poster_path || profile_path}`} alt="Poster"/>
							<p>{title || name}</p>
						</li>
					</Link>
				))}
			</div>
		)
	}
}

export default Search;