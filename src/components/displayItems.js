import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class DisplayItems extends Component{
	render(){
		return(
			<Fragment>
				{
					this.props.item.map(({id, poster_path, title, name, profile_path}) => (
						// Putting every TV show into Link container
						<figure key={id} className="item-container">
							<Link to={`/about/${this.props.type}?id=${id}`}>
								<img className="item-image" src={`https://image.tmdb.org/t/p/w185${poster_path || profile_path}`} alt="Poster"/>
								<figcaption>
									<p className="item-name">{title || name}</p>
								</figcaption>
							</Link>
						</figure>
					))
				}
			</Fragment>
		)
	}
}

export default DisplayItems;