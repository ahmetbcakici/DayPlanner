import React, { Component } from 'react';

export default class Timer extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		test: '',
    };
    
	render() {
    return <h1>{this.props.id}</h1>;
	}
}
