import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const API_KEY = 'b41936b8ed0f4f2f3e076cf8f2d3af29';

class App extends Component{
	render(){
		return(
			<div>
				<h1>Cujo</h1>
				<p>Test</p>
				<p>Hello</p>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));