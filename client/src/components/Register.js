import React, { Component } from 'react';

export default class Register extends Component {
	render() {
		return (
			<form className="w-75">
				<h4 className="text-center">Register Form</h4>
				<div class="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input
						type="email"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
					<small id="emailHelp" class="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
				</div>
				<div class="form-group form-check">
					<input type="checkbox" class="form-check-input" id="exampleCheck1" />
					<label class="form-check-label" for="exampleCheck1">
						Check me out
					</label>
				</div>
				<div className="form-group">
					<label>
						<a href="#" onClick={this.props.func}>
							Do you have an account? Then let's login!
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
