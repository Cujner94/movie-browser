import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
	render(){
		return(
			<div>
				<h1>Cujo</h1>
				<p>Test</p>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));