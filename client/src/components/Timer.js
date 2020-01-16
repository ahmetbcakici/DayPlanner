import React, { Component } from 'react';
import axios from 'axios';

export default class Timer extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		taskInTimer: '',
	};

	findTaskById = () => {
		this.props.tasks.map(task => {
			if (task._id === this.props.id) this.setState({ taskInTimer: task });
		});
	};

	componentDidMount() {
		this.findTaskById();
	}

	render() {
		return <div>asd</div>;
	}
}
