import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Register extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		username: '',
		mail: '',
		password: '',
		redirect: false,
	};

	getDate = () => {
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var d = new Date(new Date().setDate(new Date().getDate()));
		var dayName = days[d.getDay()];

		return (
			dayName +
			' ' +
			new Date(new Date().setDate(new Date().getDate()))
				.toString()
				.split(' ')
				.splice(1, 3)
				.join(' ')
		);
	};

	selectedDate = () => {
		let selectedDate = this.getDate().split(' ');
		let monthNumber = '';
		switch (selectedDate[1]) {
			case 'Jan':
				monthNumber = '01';
				break;
			case 'Feb':
				monthNumber = '02';
				break;
			case 'Mar':
				monthNumber = '03';
				break;
			case 'Apr':
				monthNumber = '04';
				break;
			case 'May':
				monthNumber = '05';
				break;
			case 'Jun':
				monthNumber = '06';
				break;
			case 'Jul':
				monthNumber = '07';
				break;
			case 'Aug':
				monthNumber = '08';
				break;
			case 'Sep':
				monthNumber = '09';
				break;
			case 'Oct':
				monthNumber = '10';
				break;
			case 'Nov':
				monthNumber = '11';
				break;
			case 'Dec':
				monthNumber = '12';
				break;
		}
		return selectedDate[3] + '-' + monthNumber + '-' + selectedDate[2];
	};

	usernameChange = e => {
		this.setState({ username: e.target.value });
	};

	mailChange = e => {
		this.setState({ mail: e.target.value });
	};

	passwordChange = e => {
		this.setState({ password: e.target.value });
	};

	registerSubmitHandle = e => {
		e.preventDefault();
		axios
			.post('http://localhost:3001/user/register', {
				mail: this.state.mail,
				username: this.state.username,
				password: this.state.password,
				registeredDate:this.selectedDate()
			})
			.then(response => {
				this.setState({ redirect: true });
			})
			.catch(err => {
				this.setState({ ErrorAlert: true });
			});
	};

	render() {
		if (this.state.redirect) return <Redirect to="/dashboard" />;
		return (
			<form className="w-75" onSubmit={this.registerSubmitHandle}>
				<h4 className="text-center">Register Form</h4>
				<hr />
				<div className="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						onChange={this.mailChange}
						value={this.state.mail}
						required
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputText">Username</label>
					<input
						type="text"
						className="form-control username"
						id="exampleInputText"
						placeholder="Username"
						onChange={this.usernameChange}
						value={this.state.username}
						required
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Password"
						onChange={this.passwordChange}
						value={this.state.password}
						required
					/>
				</div>
				<div className="form-group">
					<label>
						<a href="#" onClick={this.props.func}>
							Do you have an account?
						</a>
					</label>
				</div>
				<button type="submit" class="btn btn-primary">
					Submit
				</button>
			</form>
		);
	}
}
