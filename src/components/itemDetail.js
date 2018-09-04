import React, {Component} from 'react';

class ItemDetails extends Component{
	render(){
		const id = this.props.location.search.slice(4);
		console.log(id, this.props.match.params.searchType);
		return(
			<div>Sup</div>
		)
	}
}

export default ItemDetails;