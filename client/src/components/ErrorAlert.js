import React, { Component } from 'react';

export default class ErrorAlert extends Component {
	render() {
		return (
			<div className="alert alert-danger mt-3 mb-0" role="alert">
				{this.props.msg}
			</div>
		);
	}
}
