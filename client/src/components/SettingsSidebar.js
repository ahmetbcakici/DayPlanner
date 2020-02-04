import React, { Component } from 'react';

export default class SettingsSidebar extends Component {
	render() {
		return (
			<div>
				<ul className="sidebar navbar-nav text-success">
					<li className="nav-item active border-bottom">
						<a className="nav-link" href="#">
							<i className="fas fa-fw fas fa-home"></i>
							<span>Home Page</span>
						</a>
					</li>
					<li className="nav-item active border-bottom">
						<a className="nav-link" href="#">
							<i className="fab fa-fw fas fa-dice-d20"></i>
							<span>Experience</span>
						</a>
					</li>
					<li className="nav-item active border-bottom">
						<a className="nav-link" href="#">
							<i className="fab fa-fw fas fa-dice-d20"></i>
							<span>Experience</span>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
