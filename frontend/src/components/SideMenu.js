import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'


export default class SideMenu extends Component {
	constructor() {
		super()
		this.onClick = this.onClick.bind(this)
	}

	onClick(e) {
		if (this.props.hasSubMenu) {
			console.log(this.props)
			this.props.toggleSubMenu(e)
		} else {
			
			this.props.activateMe({
				newLocation: this.props.to,
				selectedMenuLabel: this.props.label,
			})
		}
}

	render() {
		return (
			<Link
				className={classnames(
					this.props.className,
					this.props.active && this.props.classNameActive,
					this.props.hasActiveChild && this.props.classNameHasActiveChild,
				  )} 
	
				onClick={this.onClick}
				to={this.props.to} 
			>
				{this.props.children}
			</Link>
		)
	}
}