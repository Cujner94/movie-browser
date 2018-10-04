import React, {Component} from 'react';
import InputRange from "react-input-range";

import 'react-input-range/lib/css/index.css';

class Discover extends Component{
	state = {
		genre: "Action",
		year: {
			label: "year",
			min: 1970,
			max: 2018,
			step: 1,
			value: { min: 2000, max: 2018 }
		},
		rating: {
			label: "rating",
			min: 0,
			max: 10,
			step: 1,
			value: { min: 7, max: 10 }
		},
		runtime: {
			label: "runtime",
			min: 0,
			max: 200,
			step: 15,
			value: { min: 60, max: 150 }
		}
	}
	
	onGenreChange = event => {
		this.setState({genre : event.target.value});
	}
	
	onChange = data => {
		this.setState({
			[data.type]: {
				label: data.type,
				min: data.min,
				max: data.max,
				step: data.step,
				value: data.value
			}
		});
	};
	
	render(){
		return(
			<div className="item-detail-container">
				<Slider data={this.state.year} onChange={this.onChange} />
        <Slider data={this.state.rating} onChange={this.onChange} />
        <Slider data={this.state.runtime} onChange={this.onChange} />
				
				<Genres onGenreChange={this.onGenreChange}/>
			</div>
		)
	}
}

class Slider extends Component {
	
  onChange = range => {
    this.props.onChange({
			type: this.props.data.label,
			min: this.props.data.min,
			max: this.props.data.max,
			step: this.props.data.step,
      value: range
    });
  }

  render() {
    const { min, max, step, value, label } = this.props.data;
    return (
      <div className="slider">
        <label>{label.charAt(0).toUpperCase() + label.slice(1)}</label>
        <InputRange
          minValue={min}
          maxValue={max}
          step={step}
          onChange={this.onChange}
          value={value}
        />
      </div>
    )
  }
}

class Genres extends Component{
	
	state = {
		genres : {},
		isLoading : true
	}
	
	componentDidMount(){
		const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29&language=en-US';
		fetch(url).then(result => result.json()).then(genres => this.setState({genres, isLoading: false}));
	}
	
	render(){
		
		if (this.state.isLoading) {
			return(
				<select name="genres">
					<option>Loading</option>
				</select>
			)
		}
		
		const {genres} = this.state.genres;
		
		return(
			<select value={genres[0].name} onChange={this.props.onGenreChange} name="genres">
				{genres.map(({name, id}) => (
					<option key={id} value={name}>{name}</option>
				))}
			</select>
		)
	}
}


export default Discover;