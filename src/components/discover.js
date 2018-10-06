import React, {Component} from 'react';
import InputRange from "react-input-range";
import DisplayItems from "./displayItems";

import 'react-input-range/lib/css/index.css';

class Discover extends Component{
	state = {
		genre: "Action",
		genreList : {},
		year: {
			label: "year",
			min: 1960,
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
		},
		isLoading: true,
		sortBy: "desc",
		moviesUrl: `https://api.themoviedb.org/3/discover/movie?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
	}
	
	componentDidMount(){
		const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b41936b8ed0f4f2f3e076cf8f2d3af29&language=en-US';
		fetch(url).then(result => result.json()).then(genreList => this.setState({genreList, isLoading: false}));
	}
	
	onGenreChange = event => {
		this.setState({genre : event.target.value});
	}
	
	onSortChange = event => {
		this.setState({sortBy : event.target.value});
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
	}
	
	generateUrl = () => {
    const {genreList, year, rating, runtime } = this.state;
    const selectedGenre = genreList.genres.find( genre => genre.name === this.state.genre);
    const genreId = (selectedGenre ? selectedGenre.id : undefined);

    const moviesUrl = `https://api.themoviedb.org/3/discover/movie?` +
      `api_key=b41936b8ed0f4f2f3e076cf8f2d3af29&` +
			`language=en-US&sort_by=popularity.${this.state.sortBy}&` +
			`include_adult=false&include_video=false&` +
      (genreId ? `with_genres=${genreId}&` : "") +
      `primary_release_date.gte=${year.value.min}-01-01&` +
      `primary_release_date.lte=${year.value.max}-12-31&` +
      `vote_average.gte=${rating.value.min}&` +
      `vote_average.lte=${rating.value.max}&` +
      `with_runtime.gte=${runtime.value.min}&` +
      `with_runtime.lte=${runtime.value.max}&` +
      `page=1&`;

    this.setState({ moviesUrl });
  }
	
	render(){
		return(
			<div className="item-detail-container">
			
				<div className="discover-navigation">
					<Slider data={this.state.year} onChange={this.onChange} />
	        <Slider data={this.state.rating} onChange={this.onChange} />
	        <Slider data={this.state.runtime} onChange={this.onChange} />
					
					<Genres genres={this.state.genreList} isLoading={this.state.isLoading} onGenreChange={this.onGenreChange}/>
					
					<select onChange={this.onSortChange} value={this.state.sortBy} name="Sort">
						<option value="desc">Descending</option>
						<option value="asc">Ascending</option>
					</select>
					
					<button onClick={this.generateUrl}> Search </button>
				</div>
				
				<DiscoverList key={this.state.moviesUrl} moviesUrl={this.state.moviesUrl}/>
				
			</div>
		)
	}
}

// SLIDER 

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

// GENRES

const Genres = props => {
	if (props.isLoading) {
		return(
			<select name="genres">
				<option>Loading</option>
			</select>
		)
	}
	
	const {genres} = props.genres;
	
	return(
		<select onChange={props.onGenreChange} name="genres">
			{genres.map(({name, id}) => (
				<option key={id} value={name}>{name}</option>
			))}
			<option value="none">None</option>
		</select>
	)
}

// MOVIES

class DiscoverList extends Component{
	
	state = {
		movies : {},
		isLoading: true
	}
	
	componentDidMount(){
		const url = this.props.moviesUrl;
		fetch(url).then(result => result.json()).then(movies => this.setState({movies, isLoading: false}));
	}
	
	
	render(){
		if (this.state.isLoading) {
			return(
				<h1 className="loading">Loading</h1>
			)
		}
		
		return(
			<div className="discover-movies">
				<DisplayItems type="movie" item={this.state.movies.results} />
			</div>
		)
	}
}

export default Discover;