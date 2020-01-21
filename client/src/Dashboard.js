import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import Sidebar from 'react-sidebar';
import Navbar from './components/Navbar';
import Timer from './components/Timer';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		usertasks: [],
		minusPlus: 0,
		turnTodayDisplay: 'none',
		sidebarOpen: false,
		selectedColor: '',
		editingTask: '',
		taskToPost: '',
		taskToPut: '',
		isTimerScreen: false,
		taskIdInTimer: '',
		loggedUser: '',
		directlyDashboard: false,
		minDate: false,
	};

	componentDidMount() {
		document.body.style = `
		background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80');
		height: 100vh;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	`;
		this.currentUser();
	}

	currentUser = async () => {
		try {
			await this.setState({ loggedUser: this.props.location.state.loggedUser });
			this.getItem();
		} catch {
			await this.setState({ directlyDashboard: true });
		}
	};

	getDate = () => {
		return new Date(new Date().setDate(new Date().getDate() - this.state.minusPlus))
			.toString()
			.split(' ')
			.splice(0, 4)
			.join(' ');
	};

	getItem = () => {
		axios.get(`http://localhost:3001/task/get`, { params: { loggedUser: this.state.loggedUser } }).then(res => {
			const usertasks = res.data;
			usertasks.reverse(); // For that : Users should be see task on top whichever is new
			this.setState({ usertasks });
		});
	};

	postItem = e => {
		if (e.key === 'Enter' && e.target.value !== '') {
			axios
				.post(
					`http://localhost:3001/task/post`,
					{ title: e.target.value, date: this.selectedDate() },
					{ params: { loggedUser: this.state.loggedUser } }
				)
				.then(() => {
					this.getItem();
					this.setState({ taskToPost: '' });
				});
		}
	};

	putItem = () => {
		axios
			.put(
				`http://localhost:3001/task/put`,
				{
					id: this.state.editingTask._id,
					title: this.state.taskToPut,
					color: this.state.selectedColor,
				},
				{ params: { loggedUser: this.state.loggedUser } }
			)
			.then(() => {
				this.getItem();
				this.setState({ selectedColor: '' });
			});
	};

	deleteItem = e => {
		axios
			.delete(`http://localhost:3001/task/delete`, {
				data: { id: e.target.id },
				params: { loggedUser: this.state.loggedUser },
			})
			.then(() => this.getItem());
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
		this.minDateControl();
	};

	plus = async () => {
		await this.setState({ minusPlus: this.state.minusPlus + 1 });
		this.getDate();
		this.checkIsToday();
		this.minDateControl();
	};

	checkIsToday = () => {
		if (this.state.minusPlus !== 0) this.setState({ turnTodayDisplay: 'inline' });
		else this.setState({ turnTodayDisplay: 'none' });
	};

	handleTurnToday = async () => {
		await this.setState({ minusPlus: 0, turnTodayDisplay: 'none' });
		this.getDate();
		this.minDateControl();
	};

	minDateControl = () => {
		const { registeredDate } = this.state.loggedUser;
		if (this.selectedDate() !== registeredDate.substring(0, 10)) {
			this.setState({ minDate: false });
			return;
		}

		this.setState({ minDate: true });
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
		selectedDate = selectedDate[3] + '-' + monthNumber + '-' + selectedDate[2];

		return selectedDate;
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
		axios
			.put(`http://localhost:3001/task/put`, { id }, { params: { loggedUser: this.state.loggedUser } })
			.then(() => this.getItem());
	};

	setTimerScreen = e => {
		this.setState({ isTimerScreen: !this.state.isTimerScreen, taskIdInTimer: e.target.id });
	};

	onHover = e => {
		e.target.className === 'far fa-check-circle'
			? (e.target.className = 'far fa-circle')
			: (e.target.className = 'far fa-check-circle');
	};

	inHover = (e, task_statu) => {
		task_statu === 'completed'
			? (e.target.className = 'far fa-check-circle')
			: (e.target.className = 'far fa-circle');
	};

	render() {
		if (this.state.directlyDashboard) return <Redirect to="/" />;
		return (
			<div>
				<Navbar currentUser={this.state.loggedUser} />
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
							<a
								href="#"
								className="arrow arrow-right transparent-color"
								onClick={this.minus}
								style={{
									visibility: this.state.isTimerScreen ? 'hidden' : 'visible',
								}}>
								<i className="fas fa-chevron-right"></i>
							</a>
							<a
								href="#"
								className="arrow arrow-left transparent-color"
								onClick={this.plus}
								style={{
									visibility: this.state.isTimerScreen || this.state.minDate ? 'hidden' : 'visible',
								}}>
								<i className="fas fa-chevron-left"></i>
							</a>
							<input
								type="text"
								className="add-task"
								placeholder="Add new task"
								onChange={this.handleInputPostTask}
								value={this.state.taskToPost}
								style={{
									display:
										this.state.isTimerScreen || this.state.turnTodayDisplay === 'inline'
											? 'none'
											: 'inline',
								}}
								onKeyPress={this.postItem}
							/>
							{this.state.isTimerScreen === true ? (
								<Timer
									id={this.state.taskIdInTimer}
									tasks={this.state.usertasks}
									func={this.setTimerScreen}
								/>
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
															onMouseEnter={this.onHover}
															onMouseLeave={e => this.inHover(e, task.status)}
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
															className="fas fa-hourglass-start mr-2"
															id={task._id}
															onClick={this.setTimerScreen}
															style={{
																display:
																	this.state.turnTodayDisplay === 'inline'
																		? 'none'
																		: 'inline',
															}}></i>
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
