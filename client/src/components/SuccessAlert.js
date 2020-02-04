import React, { Component } from 'react';

export default class SuccessAlert extends Component {
	render() {
		return (
			<div className="alert alert-success mt-3 mb-0" role="alert">
				{this.props.msg}
			</div>
		);
	}
}
