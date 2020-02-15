import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';
import axios from 'axios';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		username: '',
		password: '',
		redirect: false,
		ErrorAlert: false,
		ErrorMsg: '',
	};

	usernameChange = e => {
		this.setState({ username: e.target.value });
	};

	passwordChange = e => {
		this.setState({ password: e.target.value });
	};

	setRedirect = () => {
		this.setState({
			redirect: true,
		});
	};

	loginSubmitHandle = () => {
		axios
			.post('user/login', { username: this.state.username, password: this.state.password })
			.then(response => {
				localStorage.setItem('token', response.data.token);
				this.setState({ redirect: true });
			})
			.catch(err => {
				let temp_errormsg;
				if (err.response.status === 400) temp_errormsg = 'Username or password are incorrect.';
				else if (err.response.status === 403) temp_errormsg = 'Username and password fields can not be empty.';
				else if (err.response.status === 404) temp_errormsg = 'User can not found.';
				else temp_errormsg = 'Something went wrong.';
				this.setState({ ErrorAlert: true, ErrorMsg: temp_errormsg });
			});
	};

	render() {
		if (this.state.redirect) return <Redirect to="/dashboard" />;
		return (
			<form className="w-75 login-form" action="#" onSubmit={this.loginSubmitHandle}>
				<h4 className="text-center">Login Form</h4>
				<hr />
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
					<label for="exampleInputPassword2">Password</label>
					<input
						type="password"
						className="form-control password"
						id="exampleInputPassword2"
						placeholder="Password"
						onChange={this.passwordChange}
						value={this.state.password}
						required
					/>
				</div>
				<div className="form-group">
					<label>
						<a href="#" onClick={this.props.func}>
							Not registered yet?
						</a>
					</label>
				</div>
				<button className="btn btn-primary w-100">Submit</button>
				{this.state.ErrorAlert ? (
					<ErrorAlert
						msg={
							<span>
								<strong>Attention !</strong> {this.state.ErrorMsg}
							</span>
						}
					/>
				) : null}
			</form>
		);
	}
}
