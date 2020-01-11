import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import Sidebar from 'react-sidebar';

class App extends Component {
	state = {
		userdata: [],
		usertasks: [],
		minusPlus: 0,
		turnTodayVisibility: 'hidden',
		sidebarOpen: false,
		selectedColor: '',
		editingTask: '',
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
			const userdata = res.data;
			const usertasks = userdata.tasks;
			usertasks.reverse(); // For that : Users should be see task on top whichever is new
			this.setState({ userdata, usertasks });
		});
	};

	postItem = e => {
		if (e.key === 'Enter') {
			axios
				.post(
					`http://localhost:3001/task/post?title=${
						document.getElementsByClassName('add-task')[0].value
					}&date=${this.selectedDate()}` //new Date(Date.now()).toISOString()
				)
				.then(() => {
					this.getItem();
					document.getElementsByClassName('add-task')[0].value = '';
				});
		}
	};

	putItem = () => {
		axios
			.put(
				`http://localhost:3001/task/put?id=${this.state.editingTask._id}&title=${
					document.getElementsByClassName('put-task')[0].value
				}&color=${this.state.selectedColor}`
			)
			.then(() => this.getItem());
	};

	deleteItem = e => {
		axios.delete(`http://localhost:3001/task/delete/${e.target.id}`).then(() => this.getItem());
	};

	minus = async () => {
		await this.setState({ minusPlus: this.state.minusPlus - 1 });
		this.getDate();
		this.checkIsToday();
	};

	plus = async () => {
		await this.setState({ minusPlus: this.state.minusPlus + 1 });
		this.getDate();
		this.checkIsToday();
	};

	checkIsToday = () => {
		if (this.state.minusPlus !== 0) this.setState({ turnTodayVisibility: 'visible' });
		else this.setState({ turnTodayVisibility: 'hidden' });
	};

	handleTurnToday = async () => {
		await this.setState({ minusPlus: 0, turnTodayVisibility: 'hidden' });
		this.getDate();
	};

	selectedDate = () => {
		let selectedDate = this.getDate().split(' ');
		let monthNumber = '';
		switch (selectedDate[1]) {
			case 'Jan':
				monthNumber = '01';
				break;
			case 'Feb':
				monthNumber = '02';
				break;
			case 'Mar':
				monthNumber = '03';
				break;
			case 'Apr':
				monthNumber = '04';
				break;
			case 'May':
				monthNumber = '05';
				break;
			case 'Jun':
				monthNumber = '06';
				break;
			case 'Jul':
				monthNumber = '07';
				break;
			case 'Aug':
				monthNumber = '08';
				break;
			case 'Sep':
				monthNumber = '09';
				break;
			case 'Oct':
				monthNumber = '10';
				break;
			case 'Nov':
				monthNumber = '11';
				break;
			case 'Dec':
				monthNumber = '12';
				break;
		}
		return selectedDate[3] + '-' + monthNumber + '-' + selectedDate[2];
	};

	onSetSidebarOpen = async (open, id) => {
		this.setState({ sidebarOpen: open });
		if (!open) this.clearColors();
		else {
			await this.state.usertasks.map(task => {
				if (task._id === id) {
					this.setState({ editingTask: task });
				}
			});
			document.getElementsByClassName('put-task')[0].value = this.state.editingTask.title;
			for (var element of document.getElementsByClassName('colors-area')[0].childNodes)
				if (element.style.color == this.state.editingTask.color) {
					element.style.fontSize = '1.2rem';
					element.style.textShadow = '1px 1px rgba(0, 0, 0, 0.4)';
				}
		}
	};

	clearColors = () => {
		for (var element of document.getElementsByClassName('colors-area')[0].childNodes) {
			element.style.fontSize = '1rem';
			element.style.textShadow = '0px 0px rgba(0, 0, 0, 0)';
		}
	};

	handleColorSelect = e => {
		this.setState({ selectedColor: e.target.style.color });
		this.clearColors();
		e.target.style.fontSize = '1.2rem';
		e.target.style.textShadow = '1px 1px rgba(0, 0, 0, 0.4)';
	};

	completedStatus = id => {
		axios.put(`http://localhost:3001/task/put?id=${id}`).then(() => this.getItem());
	};

	render() {
		return (
			<div className="justify-content-center d-flex mt-5">
				<Sidebar
					sidebar={
						<div className="text-center">
							<br />
							<h4>Edit your task</h4>
							<br />
							{/* <input type="hidden" name="" value={this.state.editingTask._id} /> */}
							<input type="text" className="put-task w-75" />
							<br />
							<p className="colors-area text-left pl-5" onChange={null}>
								<span className="pr-2">Color:</span>
								<i
									className="far fa-circle pr-2 cursor-pointer"
									style={{ color: 'LimeGreen' }}
									onClick={this.handleColorSelect}></i>
								<i
									className="far fa-circle pr-2 cursor-pointer"
									style={{ color: 'Crimson' }}
									onClick={this.handleColorSelect}></i>
								<i
									className="far fa-circle pr-2 cursor-pointer"
									style={{ color: 'DodgerBlue' }}
									onClick={this.handleColorSelect}></i>
								<i
									className="far fa-circle pr-2 cursor-pointer"
									style={{ color: 'DarkOrange' }}
									onClick={this.handleColorSelect}></i>
							</p>
							<button className="btn btn-success w-75" onClick={this.putItem}>
								Save Changes
							</button>
						</div>
					}
					open={this.state.sidebarOpen}
					onSetOpen={this.onSetSidebarOpen}
					pullRight="true"
					styles={{
						sidebar: { background: 'rgba(255, 255, 255, 0.5)', marginTop: '55px', width: '25%' },
					}}>
					l
				</Sidebar>
				<div className="card text-center transparent-bg" style={{ width: '30%' }}>
					<div className="card-header">
						<h3>{this.getDate()}</h3>
						<span className="text-center" style={{ visibility: this.state.turnTodayVisibility }}>
							<a href="#" className="turn-today" onClick={this.handleTurnToday}>
								Turn Today
							</a>
						</span>
					</div>
					<div className="card-body text-left" style={{ height: '100%' }}>
						<a href="#" className="arrow arrow-right transparent-color" onClick={this.minus}>
							<i className="fas fa-chevron-right"></i>
						</a>
						<a href="#" className="arrow arrow-left transparent-color" onClick={this.plus}>
							<i className="fas fa-chevron-left"></i>
						</a>
						<input
							type="text"
							className="add-task"
							placeholder="Add new task"
							style={{ visibility: this.state.turnTodayVisibility === 'hidden' ? 'visible' : 'hidden' }}
							onKeyPress={this.postItem}
						/>
						<ul className="tasks">
							{this.state.usertasks.map(task => {
								this.selectedDate();
								if (task.date.substring(0, 10) == this.selectedDate()) {
									return task.status == 'uncompleted' ? (
										<li key={task._id}>
											<span>
												<i
													className="far fa-circle"
													style={{
														color: task.color,
														fontWeight: task.status == 'completed' ? 'bold' : 'normal',
													}}
													onClick={() => this.completedStatus(task._id)}></i>{' '}
											</span>
											<span>{task.title}</span>
											<span className="float-right">
												<i
													className="fas fa-pen mr-2"
													onClick={() => this.onSetSidebarOpen(true, task._id)}></i>
												<i
													className="fas fa-trash-alt"
													id={task._id}
													onClick={this.deleteItem}></i>
											</span>
										</li>
									) : (
										<li key={task._id}>
											<span>
												<i
													className="far fa-circle"
													style={{
														color: task.color,
														fontWeight: task.status == 'completed' ? 'bold' : 'normal',
													}}
													onClick={() => this.completedStatus(task._id)}></i>{' '}
											</span>
											<span>{task.title}</span>
											<span className="float-right">
												<i
													className="fas fa-pen mr-2"
													onClick={() => this.onSetSidebarOpen(true, task._id)}></i>
												<i
													className="fas fa-trash-alt"
													id={task._id}
													onClick={this.deleteItem}></i>
											</span>
										</li>
									);
								}
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
