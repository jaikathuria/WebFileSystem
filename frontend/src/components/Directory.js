import React, { Component } from 'react'
import File from './File'
import { withRouter } from 'react-router'

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
						<File 
							file={file} 
							key={file.name} 
							setSelected={()=>{ this.updateSelected(file) }}
						/>)
				}
			</section>
		)
	}
}

export default withRouter(Directory)