import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './views/Homepage';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import Footer from './components/Footer';

render(
	<Router>
		<Switch>
			<Route exact path="/" component={Homepage} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/settings" component={Settings} />
			<Redirect to="/" />
		</Switch>
		<Footer />
	</Router>,
	document.getElementById('root')
);
