import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class DisplayItems extends Component{
	render(){
		return(
			<Fragment>
				{
					this.props.item.map(({id, poster_path, title, name, profile_path}) => (
						// Putting every TV show into Link container
						<Link className="item-container" to={`/about/${this.props.type}?id=${id}`} key={id}>
							<img src={`https://image.tmdb.org/t/p/w185${poster_path || profile_path}`} alt="Poster"/>
							<p>{title || name}</p>
						</Link>
					))
				}
			</Fragment>
		)
	}
}

export default DisplayItems;