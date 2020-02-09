import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import '../style/Dashboard.css';
import '../style/Settings.css';
import Sidebar from 'react-sidebar';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import SettingsSidebar from '../components/SettingsSidebar';
import AccountSettings from '../components/AccountSettings';
import PreferencesSettings from '../components/PreferencesSettings';
import DailySettings from '../components/DailySettings';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		// this.currentUser();
		this.state = {
			usertasks: [],
			minusPlus: 0,
			turnTodayDisplay: 'none',
			sidebarOpen: false, // default : false
			selectedColor: '',
			taskNote: '',
			workTime: 25,
			breakTime: 5,
			editingTask: '',
			taskToPost: '',
			taskToPut: '',
			isTimerScreen: false,
			taskIdInTimer: '',
			// loggedUser: this.props.location.state.loggedUser, // ERROR you have to handle catch, see also line 47 currentUser func
			loggedUser: '', // ERROR you have to handle catch, see also line 47 currentUser func
			directlyDashboard: false,
			minDate: false,
			isSetting: false,
			whichSettingsPage: 'Account',
			colorToFilter: 'remove-filter',
		};
	}

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

	// componentDidCatch(err){
	// 	console.log("op")
	// 	console.log(err)
	// }

	currentUser = async () => {
		try {
			await this.setState({ loggedUser: this.props.location.state.loggedUser });
			this.getItem();
			this.minDateControl();
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
		const { editingTask, taskToPut, selectedColor, taskNote, workTime, breakTime, loggedUser } = this.state;
		axios
			.put(
				`http://localhost:3001/task/put`,
				{
					id: editingTask._id,
					title: taskToPut,
					color: selectedColor,
					note: taskNote,
					workTime: workTime,
					breakTime: breakTime,
				},
				{ params: { loggedUser: loggedUser } }
			)
			.then(() => {
				this.getItem();
				this.setState({ selectedColor: '' });
			});
		this.onSetSidebarOpen(false);
	};

	deleteItem = e => {
		const { loggedUser } = this.state;
		const { id } = e.target;
		axios
			.delete(`http://localhost:3001/task/delete`, {
				data: { id },
				params: { loggedUser },
			})
			.then(() => this.getItem());
	};

	handleInputPostTask = e => {
		this.setState({ taskToPost: e.target.value });
	};

	handleInputPutTask = e => {
		this.setState({ taskToPut: e.target.value });
	};

	handleTaskNote = e => {
		this.setState({ taskNote: e.target.value });
	};

	handleWorkTime = e => {
		this.setState({ workTime: e.target.value });
	};

	handleBreakTime = e => {
		this.setState({ breakTime: e.target.value });
	};

	minus = async () => {
		await this.setState({ minusPlus: this.state.minusPlus - 1, colorToFilter: 'remove-filter' });
		this.getDate();
		this.checkIsToday();
		this.minDateControl();
	};

	plus = async () => {
		await this.setState({ minusPlus: this.state.minusPlus + 1, colorToFilter: 'remove-filter' });
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
		const { usertasks } = this.state;
		this.setState({ sidebarOpen: open });
		if (!open) {
			this.clearColors();
			this.setState({ taskNote: '' });
		} else {
			await usertasks.map(task => {
				if (task._id === id) {
					this.setState({ editingTask: task });
				}
			});
			const { title, note, workTime, breakTime, color } = this.state.editingTask;
			this.setState({
				taskToPut: title,
				taskNote: note,
				workTime,
				breakTime,
			});
			for (var element of document.getElementsByClassName('colors-area')[0].childNodes)
				if (element.style.color === color) {
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
		try {
			this.setState({ taskIdInTimer: e.target.id });
		} catch {
			//do nothing
		} finally {
			this.setState({ isTimerScreen: !this.state.isTimerScreen });
			this.getItem();
		}
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

	setSettingsPage = () => {
		this.setState({ isSetting: !this.state.isSetting });
	};

	setWhichSettingsPage = pageName => {
		this.setState({ whichSettingsPage: pageName });
	};

	filterColor = e => {
		this.setState({ colorToFilter: e.target.id });
	};

	renderTasks = color => {
		//LimeGreen Crimson DodgerBlue DarkOrange
		let filterCheck;
		if (color) filterCheck = color;
		else filterCheck = undefined;
		return (
			<ul className="tasks">
				{this.state.usertasks.map(task => {
					this.selectedDate(); //
					if (task.date.substring(0, 10) === this.selectedDate() && task.color === filterCheck) {
						return (
							<li key={task._id}>
								<ReactTooltip />
								<span>
									<i
										className={
											task.status === 'completed' ? 'far fa-check-circle' : 'far fa-circle'
										}
										data-tip={
											task.status === 'completed' ? 'Incomplete the task' : 'Complete the task'
										}
										style={{
											color: task.color,
										}}
										onMouseEnter={this.onHover}
										onMouseLeave={e => this.inHover(e, task.status)}
										onClick={() => this.completedStatus(task._id)}></i>{' '}
								</span>
								<span className={task.status === 'completed' ? 'text-decoration text-muted' : ''}>
									{task.title}
								</span>
								<span className="float-right">
									<small className="text-muted mr-2" data-tip="Time worked for the task">
										{task.timeWorked ? `${task.timeWorked} min` : null}
									</small>
									<i
										className="fas fa-hourglass-start mr-2"
										data-tip="Let's start to work"
										id={task._id}
										onClick={this.setTimerScreen}
										style={{
											display:
												this.state.turnTodayDisplay === 'inline' || task.status === 'completed'
													? 'none'
													: 'inline',
										}}></i>
									<i
										className="fas fa-pen mr-2"
										data-tip="Edit the task"
										onClick={() => this.onSetSidebarOpen(true, task._id)}></i>
									<i
										className="fas fa-trash-alt"
										data-tip="Delete the task"
										id={task._id}
										onClick={this.deleteItem}></i>
								</span>
							</li>
						);
					}
				})}
			</ul>
		);
	};

	render() {
		if (this.state.directlyDashboard) return <Redirect to="/" />;
		if (this.state.isSetting)
			return (
				<div>
					<Navbar currentUser={this.state.loggedUser} func={this.setSettingsPage} />
					<div className="container mt-3">
						<div className="float-right">
							<i class="fas fa-times" onClick={this.setSettingsPage}></i>
						</div>
						<div className="row">
							<div className="col-2 border-right">
								<SettingsSidebar func={this.setWhichSettingsPage} />
							</div>
							<div className="col-10">
								{this.state.whichSettingsPage === 'Account' ? (
									<AccountSettings currentUser={this.state.loggedUser} />
								) : null}
								{this.state.whichSettingsPage === 'Preferences' ? (
									<PreferencesSettings currentUser={this.state.loggedUser} />
								) : null}
								{this.state.whichSettingsPage === 'Daily' ? (
									<DailySettings currentUser={this.state.loggedUser} />
								) : null}
							</div>
						</div>
					</div>
				</div>
			);
		const {
			loggedUser,
			turnTodayDisplay,
			isTimerScreen,
			minDate,
			taskToPost,
			taskIdInTimer,
			usertasks,
		} = this.state;
		return (
			<div>
				<Navbar currentUser={loggedUser} func={this.setSettingsPage} />
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
								<div className="pl-5 pr-5">
									<label for="customRange3">Work Time ({this.state.workTime}min)</label>
									<input
										type="range"
										class="custom-range"
										min="10"
										max="120"
										step="5"
										id="customRange3"
										defaultValue="60"
										value={this.state.workTime}
										onChange={this.handleWorkTime}
									/>

									<label for="customRange4">Break Time ({this.state.breakTime}min)</label>
									<input
										type="range"
										class="custom-range"
										min="5"
										max="30"
										step="5"
										id="customRange4"
										defaultValue="15"
										value={this.state.breakTime}
										onChange={this.handleBreakTime}
									/>
								</div>
								<textarea
									className="transparent-bg-full border-0 pl-3"
									placeholder="Enter your task's notes"
									name=""
									id=""
									cols="30"
									rows="13"
									onChange={this.handleTaskNote}
									value={this.state.taskNote}></textarea>
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
							<span className="text-center" style={{ display: turnTodayDisplay }}>
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
									visibility: isTimerScreen ? 'hidden' : 'visible',
								}}>
								<i className="fas fa-chevron-right"></i>
							</a>
							<a
								href="#"
								className="arrow arrow-left transparent-color"
								onClick={this.plus}
								style={{
									visibility: isTimerScreen || minDate ? 'hidden' : 'visible',
								}}>
								<i className="fas fa-chevron-left"></i>
							</a>
							<input
								type="text"
								className="add-task"
								placeholder="Add new task"
								onChange={this.handleInputPostTask}
								value={taskToPost}
								style={{
									display: isTimerScreen || turnTodayDisplay === 'inline' ? 'none' : 'inline',
								}}
								onKeyPress={this.postItem}
							/>

							<Dropdown
								style={{
									display: isTimerScreen || turnTodayDisplay === 'inline' ? 'none' : 'inline-block',
								}}>
								<Dropdown.Toggle style={{ background: 'transparent', border: 'none', color: 'black' }}>
									<i class="fas fa-ellipsis-v"></i>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={this.filterColor} id="remove-filter">
										Remove Filter
									</Dropdown.Item>
									<Dropdown.Item className="dropdownitem">
										<p className="" onChange={null}>
											<i
												className="far fa-circle pr-2 cursor-pointer"
												style={{ color: 'LimeGreen' }}
												onClick={this.filterColor}
												id="green"></i>
											<i
												className="far fa-circle pr-2 cursor-pointer"
												style={{ color: 'Crimson' }}
												onClick={this.filterColor}
												id="red"></i>
											<i
												className="far fa-circle pr-2 cursor-pointer"
												style={{ color: 'DodgerBlue' }}
												onClick={this.filterColor}
												id="blue"></i>
											<i
												className="far fa-circle pr-2 cursor-pointer"
												style={{ color: 'DarkOrange' }}
												onClick={this.filterColor}
												id="yellow"></i>
										</p>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>

							{isTimerScreen === true ? (
								<Timer
									id={taskIdInTimer}
									tasks={usertasks}
									func={this.setTimerScreen}
									currentUser={loggedUser}
								/>
							) : (
								<ul className="tasksbox">
									{this.state.colorToFilter === 'red' ? this.renderTasks('crimson') : null}
									{this.state.colorToFilter === 'yellow' ? this.renderTasks('darkorange') : null}
									{this.state.colorToFilter === 'green' ? this.renderTasks('limegreen') : null}
									{this.state.colorToFilter === 'blue' ? this.renderTasks('dodgerblue') : null}
									{this.state.colorToFilter === 'remove-filter' ? (
										<div>
											{this.renderTasks('crimson')}
											{this.renderTasks('darkorange')}
											{this.renderTasks('dodgerblue')}
											{this.renderTasks('limegreen')}
											{this.renderTasks()}
										</div>
									) : null}
								</ul>
							)}
							{/* <p className="text-center p-0 m-0" style={{ fontSize: '1.5rem' }}>
								<i className="fas fa-sort-down"></i>
							</p> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
