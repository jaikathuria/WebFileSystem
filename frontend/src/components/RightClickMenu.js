import React, { Component } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'


export default class RightClickMenu extends Component {
	render() {
		return (
			<div>
				<ContextMenu id="DIRECTORY_CONTEXT_MENU">
					<MenuItem data={{ type: 'OPEN' }} onClick={this.props.handleClick}>
						OPEN


					</MenuItem>
					<MenuItem data={{ type: 'INFO' }} onClick={this.props.handleClick}>
						GET INFO


					</MenuItem>
					<MenuItem data={{ type: 'DELETE' }} onClick={this.props.handleClick}>
						DELETE


					</MenuItem>
				</ContextMenu>
				<ContextMenu id="FILE_CONTEXT_MENU">
					<MenuItem data={{ type: 'INFO' }} onClick={this.props.handleClick}>
						GET INFO


					
					</MenuItem>
					<MenuItem data={{ type: 'DELETE' }} onClick={this.props.handleClick}>
						DELETE


					</MenuItem>
				</ContextMenu>
			</div>
		)
	}
}
