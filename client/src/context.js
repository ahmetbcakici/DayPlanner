import React, { Component } from 'react';

const userContext = React.createContext();

export class UserProvider extends Component {
	state = {
		test: '123',
	};
	render() {
		return <userContext.Provider value={this.state}>{this.props.children}</userContext.Provider>;
	}
}

const UserConsumer = userContext.Consumer;

export default UserConsumer;
