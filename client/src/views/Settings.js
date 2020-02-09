import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SettingsSidebar from '../components/SettingsSidebar';
import '../style/Settings.css';
import SecuritySettings from '../components/SecuritySettings';
import PreferencesSettings from '../components/PreferencesSettings';

export default class Settings extends Component {
	constructor(props){
		super(props);
		this.state = {
			loggedUser: '',
			whichPage: <SecuritySettings/>,
		};
	}	

	p = () => {
		console.log("d")
		// this.setState({ whichPage: <PreferencesSettings /> });
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
		if (false) return <Redirect to="/" />; // if condition is true, can not login here
		return (
			<div>
				<Navbar currentUser={this.state.loggedUser} />
				<div className="container mt-3">
					<div className="row">
						<div className="col-2 border-right" >
							<SettingsSidebar func={this.p} />
						</div>
						<div className="col-10">{this.state.whichPage}</div>
					</div>
				</div>
			</div>
		);
	}
}
