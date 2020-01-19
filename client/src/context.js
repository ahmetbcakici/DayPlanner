import React, { Component } from 'react';

export const userContext = React.createContext();

export class UserProvider extends Component {
	state = {
		currentUser: '',
	};

	setCurrentUser = (currentUser) => {
		this.setState({ currentUser });
	};

	render() {
		return <userContext.Provider value={this.state,{setCurrentUser:this.setCurrentUser}}>{this.props.children}</userContext.Provider>;
	}
}

const UserConsumer = userContext.Consumer;

export default UserConsumer;
