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

	getDate = () => {
		return new Date()
			.toString()
			.split(' ')
			.splice(1, 3)
			.join(' ');
	};

	render() {
		return (
			<div className="justify-content-center d-flex mt-3">
				<div className="card text-center" style={{ width: '30%' }}>
					<div className="card-header">
						<span>{this.getDate()}</span>
					</div>
					<div className="card-body text-left" style={{ height: '100%' }}>
						<ul className="tasks">
							{this.state.data.map(docs =>
								// <li>{JSON.stringify(docs.tasks)}</li>
								docs.tasks.map(task => {
									return (
										<li>
											{task.title} | {task.date.substring(0, 10)}
										</li>
									);
								})
							)}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));