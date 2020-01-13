import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
	render() {
		return (
			<nav class="navbar navbar-expand-sm bg-dark navbar-dark" style={{ zIndex: '1' }}>
				<Link to="/">
					<a class="navbar-brand" href="#">
						Day Planner
					</a>
				</Link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="collapsibleNavbar">
					<ul class="navbar-nav">
						<Link to="/sample">
							<li class="nav-item">
								<a class="nav-link" href="#">
									Sample
								</a>
							</li>
						</Link>
						<Link to="/tasks">
							<li class="nav-item">
								<a class="nav-link" href="#">
									Tasks
								</a>
							</li>
						</Link>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Link
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
