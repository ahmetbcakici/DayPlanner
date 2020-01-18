import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
	render() {
		return (
			<nav class="navbar navbar-expand-sm bg-dark navbar-dark" style={{ zIndex: '1' }}>
				<Link to="/">
					<a class="navbar-brand">
						Day Planner
					</a>
				</Link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="collapsibleNavbar">
					<ul class="navbar-nav mr-auto">
						<Link to="/tasks">
							<li class="nav-item">
								<a class="nav-link">
									Tasks
								</a>
							</li>
						</Link>
					</ul>
					<ul class="navbar-nav ml-auto">
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								style={{ fontSize: '1.2rem', padding: '0' }}>
								<i class="fas fa-user"></i>
							</a>
							<div class="dropdown-menu" style={{left:'auto',right:'0'}} aria-labelledby="navbarDropdownMenuLink">
								<a class="dropdown-item" href="#">
									Action
								</a>
								<a class="dropdown-item" href="#">
									Another action
								</a>
								<a class="dropdown-item" href="#">
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
