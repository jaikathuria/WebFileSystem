import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Wrapper from './Wrapper'

/* Import Utils */
import { getRootDirectory } from './../utils/_explorerAPI'
import { addToRoot } from './../utils/_helper'
 
export default class App extends Component {
	state = {
		root : {}
	}

	componentDidMount(){
		getRootDirectory()
			.then(res => {
				this.setState({
					root: JSON.parse(JSON.stringify(res))
				})
			})
	}

	addFileToRoot(url,file){
		this.setState({
			root: addToRoot(root, url, file)
		})
	}

	render(){		
		return (
			<Switch>
				<Route exact path="/" render={() => (
					<Redirect to="/root"/>
				)}/>
				<Route
					path="/:path"
					render={(props) => <Wrapper {...props} root={this.state.root} addFileToRoot={ this.addFileToRoot.bind(this) } />}
				/>
			</Switch>
		)
	}
}
