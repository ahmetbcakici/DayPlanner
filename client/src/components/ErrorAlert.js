import React, { Component } from 'react';

export default class ErrorAlert extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="alert alert-danger mt-3 mb-0" role="alert">
				{this.props.msg}
                x
			</div>
		);
	}
}
