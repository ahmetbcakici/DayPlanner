import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Sidebar from 'react-sidebar';
import Navbar from './components/Navbar';
import Timer from './components/Timer';

export default class App extends Component {
	state = {
		userdata: [],
		usertasks: [],
		minusPlus: 0,
		turnTodayDisplay: 'none',
		sidebarOpen: false,
		selectedColor: '',
		editingTask: '',
		taskToPost: '',
		taskToPut: '',
		isTimerScreen: false,
	};

	componentDidMount() {
		document.body.style = `
		background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80');
		height: 100vh;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	`;
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
		if (e.key === 'Enter' && e.target.value !== '') {
			axios
				.post(`http://localhost:3001/task/post`, { title: e.target.value, date: this.selectedDate() })
				.then(() => {
					this.getItem();
					this.setState({ taskToPost: '' });
				});
		}
	};

	putItem = () => {
		axios
			.put(`http://localhost:3001/task/put`, {
				id: this.state.editingTask._id,
				title: this.state.taskToPut,
				color: this.state.selectedColor,
			})
			.then(() => {
				this.getItem();
				this.setState({ selectedColor: '' });
			});
	};

	deleteItem = e => {
		axios.delete(`http://localhost:3001/task/delete`, { data: { id: e.target.id } }).then(() => this.getItem());
	};

	handleInputPostTask = e => {
		this.setState({ taskToPost: e.target.value });
	};

	handleInputPutTask = e => {
		this.setState({ taskToPut: e.target.value });
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
		if (this.state.minusPlus !== 0) this.setState({ turnTodayDisplay: 'inline' });
		else this.setState({ turnTodayDisplay: 'none' });
	};

	handleTurnToday = async () => {
		await this.setState({ minusPlus: 0, turnTodayDisplay: 'none' });
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
			this.setState({ taskToPut: this.state.editingTask.title });
			for (var element of document.getElementsByClassName('colors-area')[0].childNodes)
				if (element.style.color === this.state.editingTask.color) {
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
		axios.put(`http://localhost:3001/task/put`, { id }).then(() => this.getItem());
	};

	setTimerScreen = e => {
		this.setState({ isTimerScreen: <Timer id={e.target.id} tasks={this.state.usertasks} /> });
	};

	render() {
		return (
			<div>
				<Navbar />
				<div className="justify-content-center d-flex mt-5">
					<Sidebar
						sidebar={
							<div className="text-center">
								<br />
								<h4>Edit your task</h4>
								<br />
								<input
									type="text"
									className="put-task w-75"
									onChange={this.handleInputPutTask}
									value={this.state.taskToPut}
								/>
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
						}}></Sidebar>
					<div className="card text-center transparent-bg" style={{ width: '30%' }}>
						<div className="card-header">
							<h3>{this.getDate()}</h3>
							<span className="text-center" style={{ display: this.state.turnTodayDisplay }}>
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
								onChange={this.handleInputPostTask}
								value={this.state.taskToPost}
								style={{
									display: this.state.isTimerScreen ? 'none' : null,
									display: this.state.turnTodayDisplay === 'none' ? 'inline' : 'none',
									// visibility : this.state.isTimerScreen ? 'hidden' : 'visible'
									// visibility: this.state.turnTodayDisplay === 'none' ? 'inline' : 'none',
								}}
								onKeyPress={this.postItem}
							/>
							{this.state.isTimerScreen ? (
								this.state.isTimerScreen
							) : (
								<ul className="tasks">
									{this.state.usertasks.map(task => {
										this.selectedDate();
										if (task.date.substring(0, 10) === this.selectedDate()) {
											return (
												<li key={task._id}>
													<span>
														<i
															className={
																task.status === 'completed'
																	? 'far fa-check-circle'
																	: 'far fa-circle'
															}
															style={{
																color: task.color,
															}}
															onMouseEnter={null}
															onMouseLeave={null}
															onClick={() => this.completedStatus(task._id)}></i>{' '}
													</span>
													<span
														className={
															task.status === 'completed'
																? 'text-decoration text-muted'
																: ''
														}>
														{task.title}
													</span>
													<span className="float-right">
														<i
															class="fas fa-hourglass-start mr-2"
															id={task._id}
															onClick={this.setTimerScreen}></i>
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
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
