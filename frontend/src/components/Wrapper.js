import React, { Component } from 'react'


/* Import Components */
import MetisMenu from 'react-metismenu'
import SideMenu from './SideMenu'
import Explorer from './Explorer'

/* Import Utils */
import { getDirectories, getCurrentDirectory } from './../utils/_helper'

export default class Wrapper extends Component {

	state = {
		currentDirectory: [],
		directories: []
	}

	componentDidMount(){
		this.unlisten = this.props.history.listen(location => {
			this.updateCurrentDirectory(location.pathname)
		})
	}

	updateCurrentDirectory(url){
		const currentDirectory = getCurrentDirectory(url, this.props.root)
		this.setState({
			currentDirectory
		})
	}
	
	componentDidUpdate(newProps){
		const root = this.props.root
		const newRoot = newProps.root
		if(root !== newRoot){
			this.updateCurrentDirectory(this.props.location.pathname)
		}
	}

	componentWillUnmount(){
		this.unlisten()
	}

	render(){
		const directories = getDirectories(JSON.parse(JSON.stringify(this.props.root)))	
		return (
			<div>
				<MetisMenu 
					content={directories}
					activeLinkFromLocation={true}
					LinkComponent={SideMenu}
				/>
				<Explorer 
					currentDirectory={this.state.currentDirectory} 
				/>
			</div>
		)
	}
}