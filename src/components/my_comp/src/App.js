import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import {robots} from './robots';
import './App.css';


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: robots,
			searchfield: ''
		}
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		});
		return (
			<div className='tc'>
				<h1 className='f2'>Value</h1>
				<SearchBox searchchange={this.onSearchChange} />
				<Scroll>
				<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
		);
	};
}

export default App;