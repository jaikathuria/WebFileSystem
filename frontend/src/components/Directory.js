import React, { Component } from 'react'
import File from './File'
import { withRouter } from 'react-router'
import { ContextMenuTrigger } from 'react-contextmenu'
import RightClickMenu from './RightClickMenu'
class Directory extends Component {
	state = {
		selected: null,
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

	handleClick(e,data,target){
		const url = target.getAttribute('url')
		if(data.type === 'OPEN'){
			this.props.history.push(`/${url}`)
		} else if (data.type === 'INFO') {
			const name = target.getAttribute('name')
			const type = target.getAttribute('type')
			this.props.openModal({name, url, type})
		} else {
			this.props.deleteFileFromRoot(url)
		}
	}

	render(){
		const { currentDirectory, query } = this.props
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
				<RightClickMenu handleClick={this.handleClick.bind(this)}/>
				{currentDirectory && !query && <File 
					file={{type: 'add-file', name: 'Add New File'}}
					setSelected={this.props.openAdd}
				/>}
			</section>
		)
	}
}

export default withRouter(Directory)