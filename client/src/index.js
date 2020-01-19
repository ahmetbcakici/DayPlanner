import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Footer from './components/Footer';

render(
	<Router>
		<Switch>
			<Route exact path="/" component={Homepage} />
			<Route exact path="/dashboard" component={Dashboard} />
		</Switch>
		<Footer />
	</Router>,
	document.getElementById('root')
);
