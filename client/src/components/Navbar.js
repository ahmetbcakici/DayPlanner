import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{ zIndex: '1' }}>
				<Link to="/">
					<a className="navbar-brand">
						Day Planner
					</a>
				</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="collapsibleNavbar">
					<ul className="navbar-nav mr-auto">
						<Link to="/dashboard">
							<li className="nav-item">
								<a className="nav-link">
									Tasks
								</a>
							</li>
						</Link>
					</ul>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								style={{ fontSize: '1.2rem', padding: '0' }}>
								<i className="fas fa-user"></i>
							</a>
							<div className="dropdown-menu" style={{left:'auto',right:'0'}} aria-labelledby="navbarDropdownMenuLink">
								<a className="dropdown-item" href="#">
									Action
								</a>
								<a className="dropdown-item" href="#">
									Another action
								</a>
								<a className="dropdown-item" href="#">
									Logout
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
