import React, { Component } from 'react'
import Navbar from './Navbar';
import Directory from './Directory'
import InfoModal from './InfoModal'
import AddModal from './AddModal'


export default class Explorer extends Component {
	
	state = {
		query: "",
		infoOpen: false,
		addOpen: false,
		info: null
	}

	updateQuery(query){
		this.setState({
			query
		})
	}

	onOpenModal = (file) => {
		this.setState({ infoOpen: true, info: file })
	}
	
	onCloseModal = () => {
		this.setState({ infoOpen: false, info: null });
	}

	onOpenAdd = () => {
		this.setState({ addOpen: true })
	}

	onCloseAdd = () => {
		this.setState({ addOpen: false })
	}


	componentDidUpdate(newProps){
		if(this.props.currentDirectory !== newProps.currentDirectory){
			this.setState({
				query: ""
			})
		}
	}

	render(){
		let {currentDirectory} = this.props
		const { query, infoOpen, info, addOpen } = this.state
		const validQuery = (query.trim() !== "")
		if (validQuery){
			currentDirectory = currentDirectory.filter(file => file.name.toLowerCase().match(query.toLowerCase()) !== null)
		} 
		return (
			<div className="container-fluid margin-left-280">
				<Navbar query={this.state.query} updateQuery={this.updateQuery.bind(this)}/>
				<Directory
					currentDirectory={currentDirectory}
					openModal={this.onOpenModal.bind(this)}
					openAdd={this.onOpenAdd.bind(this)}
					query={validQuery}
				/>
				<InfoModal 
					open={infoOpen}
					info={info}
					onCloseModal={this.onCloseModal.bind(this)}
				/>
				<AddModal 
					open={addOpen}
					addFiletoRoot={this.props.addFiletoRoot}
					onCloseModal={this.onCloseAdd.bind(this)}
				/>
			</div>
		)
	}

}