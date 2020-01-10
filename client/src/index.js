import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		data: [],
		taskEditable: 'false',
		minusPlus: 0,
	};

	componentDidMount() {
		this.getItem();
	}

	getDate = () => {
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var d = new Date(new Date().setDate(new Date().getDate() - this.state.minusPlus));
		var dayName = days[d.getDay()];

		return (
			dayName +
			' ' +
			new Date(new Date().setDate(new Date().getDate() - this.state.minusPlus))
				.toString()
				.split(' ')
				.splice(1, 3)
				.join(' ')
		);
	};

	getItem = () => {
		axios.get(`http://localhost:3001/task/get`).then(res => {
			const data = res.data;
			console.log(data)
			this.setState({ data });
		});
	};

	postItem = e => {
		if (e.key === 'Enter'){
			axios.post(`http://localhost:3001/task/insert?title=${document.getElementsByClassName('add-task')[0].value}`).then(() => this.getItem());
		}
	};

	putItem = e => {
		// axios.put(`http://localhost:3001/task/delete/${e.target.id}`).then(() => this.getItem());
		// console.log(e.parent)
		this.setState({ taskEditable: 'true' });
	};

	deleteItem = e => {
		axios.delete(`http://localhost:3001/task/delete/${e.target.id}`).then(() => this.getItem());
	};

	minus = () => {
		this.setState({ minusPlus: this.state.minusPlus + 1 });
		this.getDate();
	};

	plus = () => {
		this.setState({ minusPlus: this.state.minusPlus - 1 });
		this.getDate();
	};

	render() {
		return (
			<div className="justify-content-center d-flex mt-5">
				<div className="card text-center transparent-bg" style={{ width: '30%' }}>
					<div className="card-header">
						<h3>{this.getDate()}</h3>
					</div>
					<div className="card-body text-left" style={{ height: '100%' }}>
						<a href="#" className="arrow arrow-right transparent-color" onClick={this.plus}>
							<i className="fas fa-chevron-right"></i>
						</a>
						<a href="#" className="arrow arrow-left transparent-color" onClick={this.minus}>
							<i className="fas fa-chevron-left"></i>
						</a>
						<input
							type="text"
							className="add-task"
							name=""
							placeholder="Add new task"
							onKeyPress={this.postItem}
						/>
						<ul className="tasks">
							{this.state.data.tasks.map(docs =>
								docs.tasks.map(task => {
									return (
										<li key={task._id}>
											<span spellCheck="false">
												{task.title}
											</span>
											<span className="float-right">
												{/* <i className="fas fa-pen mr-2" onClick={this.putItem}></i> */}
												<i
													className="fas fa-trash-alt"
													id={task._id}
													onClick={this.deleteItem}></i>
											</span>
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
