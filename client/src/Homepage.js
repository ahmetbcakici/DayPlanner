import React, { Component } from 'react';
import './Homepage.css';


export default class Homepage extends Component {
	componentDidMount() {
		document.body.style = `
            background-image: url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80');
            height: 100vh;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        `;
    }

    loginFormHandle = () => {
        alert("d")
    }

	render() {
		return (
			<div>
				<div className="row mt-5">
                <div className="col-6 justify-content-center d-flex" style={{'border-right':'.1rem solid rgba(255, 255, 255, 0.5)'}}>
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
								<input
									type="password"
									class="form-control"
									id="exampleInputPassword1"
									placeholder="Password"
								/>
							</div>
							<div class="form-group form-check">
								<input type="checkbox" class="form-check-input" id="exampleCheck1" />
								<label class="form-check-label" for="exampleCheck1">
									Check me out
								</label>
							</div>
							<button type="submit" class="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
					<div className="col-6 justify-content-center d-flex" style={{'border-left':'.1rem solid rgba(255, 255, 255, 0.5)'}}>
						<form className="w-75" action="#">
							<h4 className="text-center">Login Form</h4>
							<hr/>
							<div class="form-group">
								<label for="exampleInputText">Username</label>
								<input
									type="text"
									class="form-control username"
									id="exampleInputText"
									placeholder="Username"
								/>
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
							<button class="btn btn-primary w-100" onClick={this.loginFormHandle}>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
