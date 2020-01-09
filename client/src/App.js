import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

export default class App extends Component {
	state = {
		data: [],
	};

	componentDidMount() {
		axios.get(`http://localhost:3001/products`).then(res => {
			const data = res.data;
			this.setState({ data });
		});
	}

	render() {
		return (
			<div className="justify-content-center d-flex mt-3">
				<div className="card text-center" style={{width:"30%"}}>
					<div className="card-header">
						<span>9 January 2020</span>
					</div>
					<div className="card-body text-left" style={{ height: '100%' }}>
						<ul className="tasks">
							{this.state.data.map(docs => (
								<li>{docs.name}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
