import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Wrapper from './Wrapper'

/* Import Utils */
import { getRootDirectory } from './../utils/_explorerAPI'



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

	render(){		
		return (
			<Switch>
				<Route exact path="/" render={() => (
					<Redirect to="/root"/>
				)}/>
				<Route
					path="/:path"
					render={(props) => <Wrapper {...props} root={this.state.root} />}
				/>
			</Switch>
		)
	}
}
