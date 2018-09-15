import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withRouter } from 'react-router'
import { createFileObject } from './../utils/_helper'


class AddModal extends Component {
	state = {
		name: "",
		creator: "",
		directory: false,
		size: ""
	}

	handleInput = (event) => {
		if(event.target.name === "name"){
			if(!(/^$|^[a-zA-Zа-яА-Я0-9_.!]+$/.test(event.target.value.trim()))) return 
		} else if (event.target.name === "creator"){
			if(!(/^$|^[a-zA-Z]+$/.test(event.target.value))) return 
		} else {
			if(!(/^$|^[0-9]+$/.test(event.target.value))) return
		}

		this.setState({
			[event.target.name]: event.target.value.trim()		
		})
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	}

	handleSubmit = () => {
		const { name, creator, size, directory } = this.state
		const url  = this.props.location.pathname
		const file = createFileObject(name,creator,url,size,directory)
		const valid = !!(name.length && creator.length)
		valid && this.props.addFileToRoot(url,file)
	}

	render() {
		const { open, onCloseModal } = this.props
		const {name, size, directory, creator } = this.state
		const valid = !!(name.length && creator.length)
		return (
			<Modal open={open} onClose={onCloseModal} center classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}>
				<div className="contanier">
					<div className="panel panel-info">
						<div className="panel-heading">Add File</div>
						<div className="panel-body">
							<div className="input-group input-group-lg">
							<FormControlLabel className="switch-label" control={
							<Switch
								checked={this.state.directory}
								onChange={this.handleChange('directory')}
								color="primary"
								value="checkedA"
							/>}
							label="Is Directory ?" />
							</div>
							<div className="input-group input-group-lg">
								<span className="input-group-addon"><i className="fa fa-file-o" aria-hidden="true"></i></span>
								<input type="text" className="form-control" placeholder="File Name"  value={name} onChange={this.handleInput.bind(this)} name="name"/>
							</div>
							<div className="input-group input-group-lg">
								<span className="input-group-addon"><i className="fa fa-user-o" aria-hidden="true"></i></span>
								<input type="text" className="form-control" placeholder="Creator"  value={creator} onChange={this.handleInput.bind(this)} name="creator" />
							</div>
							{!this.state.directory && <div className="input-group input-group-lg">
								<span className="input-group-addon"><i className="fa fa-hdd-o" aria-hidden="true"></i></span>
								<input type="text" className="form-control" placeholder="Size"  value={size} onChange={this.handleInput.bind(this)} name="size"/>
							</div>}
							<div className="input-group input-group-lg" >
								<button type="button" className={`btn btn-primary ${valid ?'':'disabled'}`} onClick={this.handleSubmit.bind(this)} >Submit</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}

export default withRouter(AddModal)