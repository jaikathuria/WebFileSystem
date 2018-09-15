import React, { Component } from 'react'
import Navbar from './Navbar';
import Directory from './Directory';
import Modal from 'react-responsive-modal'

export default class Explorer extends Component {
	
	state = {
		query: "",
		open: false,
		info: null
	}

	updateQuery(query){
		this.setState({
			query
		})
	}
	onOpenModal = (file) => {
		this.setState({ open: true, info: file })
	}
	
	onCloseModal = () => {
		this.setState({ open: false, info: null });
	}


	render(){
		let {currentDirectory} = this.props
		const { query, open, info } = this.state
		if (query.trim() !== ""){
			currentDirectory = currentDirectory.filter(file => file.name.match(query) !== null)
		} 
		return (
			<div className="container-fluid margin-left-280">
				<Navbar query={this.state.query} updateQuery={this.updateQuery.bind(this)}/>
				<Directory
					currentDirectory={currentDirectory}
					openModal={this.onOpenModal.bind(this)}
				/>
				<Modal open={open} onClose={this.onCloseModal} center classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}>
					<div className="contanier padding-top-50">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Name</h3>
							</div>
							<div className="panel-body">
								{info && info.name}
							</div>
						</div>
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Location</h3>
							</div>
							<div className="panel-body">
								{info && info.url}
							</div>
						</div>
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Type</h3>
							</div>
							<div className="panel-body">
								{info && info.type}
							</div>
						</div>
					</div>
				</Modal>
			</div>
		)
	}

}