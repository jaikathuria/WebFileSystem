import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { pathArray } from './../utils/_helper'

class Navbar extends Component {

	updateQuery(event){
		const query = event.target.value
		this.props.updateQuery(query)
	}

	render(){
		const paths = pathArray(this.props.location.pathname)
		
		const parentURL = paths.length !== 0 ? `/${paths.slice(0,paths.length-1).join('/')}` : ""
		return (
			<nav className="navbar navbar-default margin-top-10">
				<div className="container-fluild">
					<div className="row">
						<div className="col-xs-1">
							<div className="navbar-header">
								<Link className="navbar-brand" to={`/root${parentURL}`}>
									<i className="fa fa-arrow-up "></i>
								</Link>
							</div>
						</div>
						<div className="col-xs-6">
							<ol className="breadcrumb">
								<li><Link to="/root"> root </Link></li>
								{
									paths.map((path,index) => {
										const url =  paths.slice(0,index+1).join('/')
										return (<li key={url}><Link to={`/root/${url}`}> { path } </Link></li>)
									})
								}
							</ol>
						</div>
						<div className="col-xs-5">
							<form className="navbar-form">
								<div className="form-group inner-addon right-addon">
									<i className="fa fa-search group-icon" ></i>
									<input 
										type="text" 
										className="form-control pull-right group-input" 
										placeholder="Search"
										value={this.props.query}
										onChange={this.updateQuery.bind(this)}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</nav>
		)
	}
}

export default withRouter(Navbar)