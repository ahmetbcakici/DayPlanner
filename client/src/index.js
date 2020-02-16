import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './views/Homepage';
import Dashboard from './views/Dashboard';
import Footer from './components/Footer';

axios.defaults.baseURL = "http://localhost:3001/";

render(
	<Router>
		<Switch>
			<Route exact path="/" component={Homepage} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Redirect to="/" />
		</Switch>
		<Footer />
	</Router>, 
	document.getElementById('root')
);
