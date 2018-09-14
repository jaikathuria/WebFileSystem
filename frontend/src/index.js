import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

/* Import Styles */
import 'react-metismenu/dist/react-metismenu-standart.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.css'
import 'font-awesome/css/font-awesome.min.css'


/* Import Components */
import App from './components/App'


ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root'))

