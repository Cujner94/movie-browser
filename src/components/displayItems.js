import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class DisplayItems extends Component{
	render(){
		return(
			<Fragment>
				{
					this.props.item.map(element => (
						// Putting every TV show into Link container
						<Link to={`/about/${this.props.type}?id=${element.id}`} key={element.id}>
							<img src={`https://image.tmdb.org/t/p/w185${element.poster_path}`} alt="Poster"/>
							<p>{element.title || element.name}</p>
						</Link>
					))
				}
			</Fragment>
		)
	}
}

export default DisplayItems;