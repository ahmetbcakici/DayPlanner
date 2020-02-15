import React, { Component } from 'react';

export default class SettingsSidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<ul className="sidebar navbar-nav text-success">
					<li className="nav-item active border-bottom">
						<a className="nav-link" href="#" onClick={() => this.props.func("Account")}>
							<i class="fas fa-shield-alt mr-2"></i>
							<span>Account</span>
						</a>
					</li>
					{/* <li className="nav-item active border-bottom">
						<a className="nav-link" href="#" onClick={() => this.props.func('Preferences')}>
							<i class="fas fa-sliders-h mr-2"></i>
							<span>Preferences</span>
						</a>
					</li>
					<li className="nav-item active border-bottom">
						<a className="nav-link" href="#" onClick={() => this.props.func("Daily")}>
							<i class="fas fa-chart-pie mr-2"></i>
							<span>Daily Routine</span>
						</a>
					</li> */}
				</ul>
			</div>
		);
	}
}
