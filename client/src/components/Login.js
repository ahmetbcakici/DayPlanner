import React, { Component } from 'react';

export default class Login extends Component {
	render() {
		return (
			<form className="w-75" action="#">
				<h4 className="text-center">Login Form</h4>
				<hr />
				<div class="form-group">
					<label for="exampleInputText">Username</label>
					<input type="text" class="form-control username" id="exampleInputText" placeholder="Username" />
				</div>
				<div class="form-group">
					<label for="exampleInputPassword2">Password</label>
					<input
						type="password"
						class="form-control password"
						id="exampleInputPassword2"
						placeholder="Password"
					/>
				</div>
				<div class="form-group form-check">
					<input type="checkbox" class="form-check-input" id="exampleCheck2" />
					<label class="form-check-label" for="exampleCheck2">
						Remember me
					</label>
				</div>
				<div className="form-group">
					<label>
							<a href="#">
								Not registered yet?
							</a>
					</label>
				</div>
				<button class="btn btn-primary w-100">
					Submit
				</button>
			</form>
		);
	}
}
