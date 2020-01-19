import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch , Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Footer from './components/Footer';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (false ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)}
	/>
);

render(
	<Router>
		<Switch>
			<Route exact path="/" component={Homepage} />
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
		</Switch>
		<Footer />
	</Router>,
	document.getElementById('root')
);

// render(<App />, document.getElementById('root'));
