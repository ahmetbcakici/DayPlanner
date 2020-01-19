import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
			})
			.then(response => {
				this.setState({ redirect: true });
			})
			.catch(err => {
				this.setState({ ErrorAlert: true });
			});
	};

	render() {
		// return (
		// 	<UserConsumer>
		// 		{value => {
		// 			console.log(value);
		// 		}}
		// 	</UserConsumer>
		// );
		if (this.state.redirect) return <Redirect to="/dashboard" />;
		return (
			<form className="w-75" onSubmit={this.registerSubmitHandle}>
				<h4 className="text-center">Register Form</h4>
				<hr />
				<div class="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input
						type="email"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						onChange={this.mailChange}
						value={this.state.mail}
						required
					/>
				</div>
				<div class="form-group">
					<label for="exampleInputText">Username</label>
					<input
						type="text"
						class="form-control username"
						id="exampleInputText"
						placeholder="Username"
						onChange={this.usernameChange}
						value={this.state.username}
						required
					/>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input
						type="password"
						class="form-control"
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
