import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import SettingsSidebar from '../components/SettingsSidebar';
import '../style/Settings.css';
import SecuritySettings from '../components/SecuritySettings';

export default class Settings extends Component {
	state = {
		loggedUser: '',
	};

	componentDidMount() {
		document.body.style = `
		background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80');
            height: 100vh;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        `;
	}

	render() {
		return (
			<div>
				<Navbar currentUser={this.state.loggedUser} />
				<div className="container mt-3">
					<div className="row">
						<div className="col-2 border-right">
							<SettingsSidebar />
						</div>
						<div className="col-10">
							<SecuritySettings />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
