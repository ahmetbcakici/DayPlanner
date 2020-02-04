import React, { Component } from 'react';
import axios from 'axios';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

export default class SecuritySettings extends Component {
	state = {
		currentPassword: '',
		newPassword: '',
		newPasswordAgain: '',
		newEmail: '',
		ErrorAlert: false,
		ErrorMsg: '',
		SuccessAlert: false,
		SuccessMsg: '',
	};

	currentPasswordChange = e => {
		this.setState({ currentPassword: e.target.value });
	};
	newPasswordChange = e => {
		this.setState({ newPassword: e.target.value });
	};
	newPasswordAgainChange = e => {
		this.setState({ newPasswordAgain: e.target.value });
	};

	newEmailChange = e => {
		this.setState({ newEmail: e.target.value });
	};

	changePasswordSubmitHandle = () => {
		const { currentPassword, newPassword, newPasswordAgain } = this.state;

		axios
			.put(
				`http://localhost:3001/user/put`,
				{
					currentPassword,
					newPassword,
					newPasswordAgain,
				},
				{ params: { loggedUser: this.props.currentUser } }
			)
			.then(res => {
				this.setState({
					ErrorAlert: false,
					SuccessAlert: true,
					currentPassword: '',
					newPassword: '',
					newPasswordAgain: '',
				});
			})
			.catch(err => {
				let temp_errormsg;
				if (err.response.status === 400) temp_errormsg = 'New passwords does not match.';
				else if (err.response.status === 401) temp_errormsg = 'Current password is incorrect.';
				else if (err.response.status === 404) temp_errormsg = 'Fields can not be empty.';
				else temp_errormsg = 'Something went wrong.';
				this.setState({ SuccessAlert: false, ErrorAlert: true, ErrorMsg: temp_errormsg });
			});
	};

	render() {
		return (
			<div className="mt-3">
				<div className="row p-3">
					<div className="col-6">
						<form action="#" onSubmit={this.changePasswordSubmitHandle}>
							<legend>Change your password</legend>
							<hr />
							<div className="form-group">
								<label for="exampleInputPassword1">Current password</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Password"
									
									value={this.state.currentPassword}
									onChange={this.currentPasswordChange}
								/>
							</div>
							<div className="form-group">
								<label for="exampleInputPassword2">New password</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword2"
									placeholder="New password"
									
									value={this.state.newPassword}
									onChange={this.newPasswordChange}
								/>
							</div>
							<div className="form-group">
								<label for="exampleInputPassword3">New password again</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword3"
									placeholder="New password again"
									
									value={this.state.newPasswordAgain}
									onChange={this.newPasswordAgainChange}
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
							{this.state.ErrorAlert ? (
								<ErrorAlert
									msg={
										<span>
											<strong>Attention !</strong> {this.state.ErrorMsg}
										</span>
									}
								/>
							) : null}
							{this.state.SuccessAlert ? (
								<SuccessAlert
									msg={
										<span>
											<strong>Operation Successfully !</strong>
										</span>
									}
								/>
							) : null}
						</form>
					</div>
					<div className="col-6">
						<form>
							<legend>Change your email</legend>
							<hr />
							<div className="form-group">
								<label for="exampleInputEmail1">New email address</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email"
									value={this.state.newEmail}
									onChange={this.newEmailChange}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
