import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './App';
import Homepage from './Homepage';
import Sample from './Sample';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

render(
	<Router>
		<Navbar />
		<Switch>
			<Route exact path="/" component={Homepage} />
			<Route exact path="/tasks" component={App} />
			<Route exact path="/sample" component={Sample} />
		</Switch>
		<Footer />
	</Router>,
	document.getElementById('root')
);

// render(<App />, document.getElementById('root'));
