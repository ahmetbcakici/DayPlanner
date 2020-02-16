import React, { Component } from 'react';
import axios from 'axios';
import { ProgressBar, Modal, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../style/Timer.css';
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './AnimatedProgressProvider';
import ReactTooltip from 'react-tooltip';

export default class Timer extends Component {
	state = {
		workTime: 5,
		breakTime: 1,
		isBreak: false,
		remainMinute: 0,
		remainSecond: 0,
		secondCounter: 0,
		taskInTimer: '',
		circularProgressEnd: 0,
		progressAnimated: false,
		progressLabel: 'Click here to start your work session',
		progressNow: false,
		progressVariant: 'primary',
		isInactive: false,
		timeWorked: 0,
		totalTimeWorked: 0,
		isBack: false,
		backModalDisplay: 'none',
	};

	findTaskById = () => {
		this.props.tasks.map(task => {
			if (task._id === this.props.id) this.setState({ taskInTimer: task });
		});
	};

	async componentDidMount() {
		await this.findTaskById();
		this.setState(
			{
				workTime: this.state.taskInTimer.workTime,
				breakTime: this.state.taskInTimer.breakTime,
				totalTimeWorked: this.state.taskInTimer.timeWorked,
			},
			() => this.setState({ remainMinute: this.state.workTime })
		);
	}

	workSessionCompleted = async () => {
		axios
			.put(
				`task/put`,
				{
					id: this.state.taskInTimer._id,
					timeWorked: this.state.timeWorked,
				},
				{ params: { loggedUser: this.props.currentUser } }
			)
			.then(() => {
				if (this.state.timeWorked === 0) {
					this.setState({ totalTimeWorked: this.state.totalTimeWorked + 25 });
					return;
				}
				this.setState({ totalTimeWorked: this.state.totalTimeWorked + this.state.timeWorked });
			})
			.then(() => {
				this.setState({ timeWorked: 0 });
				this.findTaskById();
			});
	};

	startSession = () => {
		if (this.state.progressVariant === 'success') return;
		this.setState({
			circularProgressEnd: 100,
			progressAnimated: true,
			progressLabel: '',
			progressVariant: 'success',
		});
		this.runWorkTimer();
	};

	endSession = () => {
		if (this.state.isBreak) {
			return;
		}
		this.setState({ timeWorked: this.state.workTime - this.state.remainMinute }, async () => {
			await this.workSessionCompleted();
			this.setState({ remainMinute: this.state.breakTime, remainSecond: 0, secondCounter: 0, isBreak: true });
		});
	};

	endAndCompleteSession = () => {
		axios
			.put(
				`task/put`,
				{ id: this.state.taskInTimer._id },
				{ params: { loggedUser: this.props.currentUser } }
			)
			.then(() => this.endSession())
			.then(() => this.handleBack());
	};

	runWorkTimer() {
		let timerProcess = () => {
			if (this.state.isBack) {
				clearInterval(timer);
				return;
			}

			if (this.state.remainMinute < 1 && this.state.remainSecond < 1) {
				this.setState({ isBreak: !this.state.isBreak }, () => {
					if (this.state.isBreak) {
						this.workSessionCompleted();
						this.setState({ remainMinute: this.state.breakTime, remainSecond: 0, secondCounter: 0 });
						return;
					}
					this.setState({ remainMinute: this.state.workTime, remainSecond: 0, secondCounter: 0 });
				});
			}

			this.setState(
				{ remainSecond: this.state.remainSecond - 1, secondCounter: this.state.secondCounter + 1 },
				() => {
					if (this.state.remainSecond < 1 && this.state.remainMinute > 0) {
						this.setState({
							remainSecond: 59,
							remainMinute: this.state.remainMinute - 1,
							secondCounter: this.state.secondCounter + 1,
						});
					}
				}
			);
		};
		timerProcess();
		let timer = setInterval(timerProcess, this.state.isInactive ? 1000 : 1000);
	}

	handleBack = async () => {
		await this.setState({ isBack: true });
		this.props.func();
	};

	skipBreak = () => {
		this.setState({ isBreak: false, remainMinute: this.state.workTime, remainSecond: 0, secondCounter: 0 });
	};

	render() {
		return (
			<div>
				<ReactTooltip />
				<div className="text-center">
					<span style={{ position: 'absolute', left: '1rem' }}>
						<i className="fas fa-arrow-left" data-tip="Back to tasks page" onClick={this.handleBack}></i>
					</span>
					<h4 className="d-inline-block">{this.state.taskInTimer.title}</h4>
				</div>
				<div className="row">
					<div className="col-4">
						<div style={{ width: '90%' }}>
							{/* Deprecated because there is a bug */}
							{/* <AnimatedProgressProvider
								valueStart={0}
								valueEnd={100}
								duration={11.0}
								easingFunction={easeQuadInOut}
							>
								{value => {
									let roundedValue = Math.round(value);
									return (
										<CircularProgressbar
											value={value}
											text={`${roundedValue}%`}
											styles={buildStyles({
												pathTransition: 'none',
												trailColor: '#e8e8e8',
												textColor: '#28A745',
												pathColor: '#28A745',
											})}
										/>
									);
								}}
							</AnimatedProgressProvider> */}
						</div>
					</div>
					<div className="col-12">
						<div className="row">
							<div
								className="col-6"
								style={{ display: this.state.progressVariant === 'primary' ? '' : 'none' }}></div>
							<div
								className="col-6"
								style={{
									display:
										this.state.isBreak || this.state.progressVariant === 'primary' ? 'none' : '',
								}}>
								<small>
									<i
										className="fas fa-check"
										data-tip="End the session"
										onClick={this.endSession}></i>
								</small>
								<small>
									<i
										className="fas fa-check-double"
										data-tip="End the session & complete the task"
										onClick={this.endAndCompleteSession}></i>
								</small>
							</div>
							<div
								className="col-6"
								style={{
									display:
										!this.state.isBreak || this.state.progressVariant === 'primary' ? 'none' : '',
								}}>
								<small>
									<i className="fas fa-forward" data-tip="Skip break" onClick={this.skipBreak}></i>
								</small>
							</div>
							<div className="col-6">
								<small className="float-right">
									{this.state.remainMinute}:
									{this.state.remainSecond.toString().length < 2
										? `0${this.state.remainSecond}`
										: this.state.remainSecond}
								</small>
							</div>
						</div>
						<ProgressBar
							variant={this.state.progressVariant}
							animated={this.state.progressAnimated}
							now={
								this.state.secondCounter < 1 ? 999 * 999 : this.state.secondCounter //temporary solve way
							}
							min={0}
							max={this.state.isBreak ? this.state.breakTime * 60 : this.state.workTime * 60}
							label={this.state.progressLabel}
							onClick={this.startSession}
						/>
						<p className="text-center text-muted">
							<small>{this.state.totalTimeWorked ? `${this.state.totalTimeWorked} min` : null}</small>
						</p>
					</div>
					{/* <p className="text-center mt-1 pr-3 pl-3">
						{this.state.taskInTimer.note ? this.state.taskInTimer.note : null}
					</p> */}
					{/* {this.state.taskInTimer.note ? <p className="text-center mt-1 pr-3 pl-3">{this.state.taskInTimer.note}</p> : null} */}
					<div className="w-100">
						<p className="text-center pr-3 pl-3">{this.state.taskInTimer.note}</p>
					</div>
				</div>
			</div>
		);
	}
}
