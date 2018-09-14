import React, { Component } from 'react'
import File from './File'
import { withRouter } from 'react-router'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"

 class Directory extends Component {
	state = {
		selected: null
	}
	updateSelected(file){
		if(this.state.selected !== null){
			if(file.type === 'directory'){
				if (file.url === this.state.selected.url) {
					this.setState({
						selected: null
					})
					this.props.history.push(`/${file.url}`)
				}
			}
		} 
		this.setState({
			selected: file
		})
	}

	render(){
		const { currentDirectory } = this.props
		return (
			<section className="row directory">
				{
					currentDirectory === null && <div> This Directory does not Exsist </div>
				}
				{
					currentDirectory && currentDirectory.map(file => 
						<ContextMenuTrigger 
							name={file.name}
							id={file.type === 'directory' ? 'DIRECTORY_CONTEXT_MENU' : 'FILE_CONTEXT_MENU'}
							attributes={file}
							key={file.name} 
						>
							<File 
								file={file} 
								setSelected={()=>{ this.updateSelected(file) }}
							/>
						</ContextMenuTrigger>)
				}
				<ContextMenu id={'DIRECTORY_CONTEXT_MENU'}>
					<MenuItem data={{foo: 'bar'}}>
						OPEN
					</MenuItem>
					<MenuItem data={{foo: 'bar'}}>
						GET INFO
					</MenuItem>
					<MenuItem data={{foo: 'bar'}}>
						DELETE
					</MenuItem>
				</ContextMenu>
				<ContextMenu id={'FILE_CONTEXT_MENU'}>
					<MenuItem data={{foo: 'bar'}}>
						GET INFO
					</MenuItem>
					<MenuItem data={{foo: 'bar'}}>
						DELETE
					</MenuItem>
				</ContextMenu>
				{currentDirectory && <File 
					file={{type: 'add-file', name: 'Add New File'}}
					setSelected={()=>{}}
				/>}
			</section>
		)
	}
}

export default withRouter(Directory)