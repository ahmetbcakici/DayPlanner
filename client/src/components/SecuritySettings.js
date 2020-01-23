import React, { Component } from 'react';

export default class SecuritySettings extends Component {
	render() {
		return (
			<div className="mt-3">
				<div className="row p-3">
					<div className="col-6">
						{' '}
						<form>
							<legend>Change your password</legend>
							<hr/>
							<div className="form-group">
								<label for="exampleInputPassword1">Current password</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Password"
								/>
							</div>
							<div className="form-group">
								<label for="exampleInputPassword2">New password</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword2"
									placeholder="New password"
								/>
							</div>
							<div className="form-group">
								<label for="exampleInputPassword3">New password again</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword3"
									placeholder="New password again"
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
					<div className="col-6">
						<form>
							<legend>Change your email</legend>
							<hr/>
							<div className="form-group">
								<label for="exampleInputEmail1">New email address</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
