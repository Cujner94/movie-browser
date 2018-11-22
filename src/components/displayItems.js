import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';


const DisplayItems = props => (
	<Fragment>
		{
			props.item.map(({id, poster_path, title, name, profile_path}) => (
				// Putting every TV show into Link container
				<figure key={id} className="item-container">
					<Link to={`/about/${props.type}?id=${id}`}>
						{(poster_path || profile_path) ? <img className="item-image" src={`https://image.tmdb.org/t/p/w185${poster_path || profile_path}`} alt="Poster"/> : <div className="item-image"/>}
						<figcaption>
							<p className="item-name">{title || name}</p>
						</figcaption>
					</Link>
				</figure>
			))
		}
	</Fragment>
)

export default DisplayItems;