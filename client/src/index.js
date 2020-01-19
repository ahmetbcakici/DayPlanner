import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { UserProvider } from './context';

import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Footer from './components/Footer';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (false ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)} />
);

render(
	<Router>
		<Switch>
			<UserProvider>
				<Route exact path="/" component={Homepage} />
				<Route exact path="/dashboard" component={Dashboard} />
				{/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
			</UserProvider>			
		</Switch>
		<Footer />
	</Router>,
	document.getElementById('root')
);

// render(<App />, document.getElementById('root'));
