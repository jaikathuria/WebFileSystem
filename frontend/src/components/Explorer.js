import React, { Component } from 'react'
import Navbar from './Navbar';
import Directory from './Directory';

export default class Explorer extends Component {
	
	state = {
		query: ""
	}

	updateQuery(query){
		this.setState({
			query
		})
	}



	render(){
		let {currentDirectory} = this.props
		const { query } = this.state
		if (query.trim() !== ""){
			console.log("I wam working")
			currentDirectory = currentDirectory.filter(file => file.name.match(query) !== null)
		} 
		return (
			<div className="container-fluid margin-left-280">
				<Navbar query={this.state.query} updateQuery={this.updateQuery.bind(this)}/>
				<Directory
					currentDirectory={currentDirectory}
				/>
			</div>
		)
	}

}