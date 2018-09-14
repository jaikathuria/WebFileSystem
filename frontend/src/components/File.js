import React, { Component } from 'react'


export default class File extends Component {

	getImageSrc(){
		switch(this.props.file.type){
		case 'directory':
			return require('./../images/Folder.png')
		case '.jpg':
			return require('./../images/Image.png')
		case '.mp3':
			return require('./../images/Music.png')
		default:
			return require('./../images/File.png') // blank file
		}
	}

	onClick = () => {
		this.props.setSelected()
	}

	render(){
		const source = this.getImageSrc()
		const { name } = this.props.file
		return (
			<div>
				<div className="col-xs-2" onClick={this.onClick.bind(this)}>
					<div className="image-wrapper">
						<img src={source} alt="file" className={'file-icon'}/>
						<span className="image-caption"> {name} </span>
					</div>
				</div>
			</div>
		)
	}
}