import React, {Component} from 'react';
import InputRange from "react-input-range";

import 'react-input-range/lib/css/index.css';

class Discover extends Component{
	state = {
		genre: "comedy",
		year: {
			label: "year",
			min: 1970,
			max: 2017,
			step: 1,
			value: { min: 2000, max: 2017 }
		},
		rating: {
			label: "rating",
			min: 0,
			max: 10,
			step: 1,
			value: { min: 8, max: 10 }
		},
		runtime: {
			label: "runtime",
			min: 0,
			max: 300,
			step: 15,
			value: { min: 60, max: 120 }
		}
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
			<div>
				<Slider data={this.state.year} onChange={this.onChange} />
        <Slider data={this.state.rating} onChange={this.onChange} />
        <Slider data={this.state.runtime} onChange={this.onChange} />
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
	render(){
		return(
			<div>
				Genres
			</div>
		)
	}
}


export default Discover;