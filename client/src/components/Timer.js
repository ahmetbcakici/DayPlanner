import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../style/Timer.css';
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './AnimatedProgressProvider';

export default class Timer extends Component {
	state = {
		remainMinute: 25,
		remainSecond: 0,
		secondCounter: 0,
		taskInTimer: '',
		circularProgressEnd: 0,
		progressAnimated: false,
		progressLabel: 'Click here to start your work session',
		progressNow: false,
		progressVariant: 'primary',
	};

	findTaskById = () => {
		this.props.tasks.map(task => {
			if (task._id === this.props.id) this.setState({ taskInTimer: task });
		});
	};

	componentDidMount() {
		this.findTaskById();
	}

	startSession = () => {
		this.setState({
			circularProgressEnd: 100,
			progressAnimated: true,
			progressLabel: '',
			progressVariant: 'success',
		});
		this.runWorkTimer();
	};

	runWorkTimer() {
		let timerProcess = () => {
			this.setState(
				{ remainSecond: this.state.remainSecond - 1, secondCounter: this.state.secondCounter + 1 },
				() => {
					if (this.state.remainSecond < 1) {
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
		let abc = setInterval(timerProcess, 1000);
	}

	render() {
		return (
			<div>
				<div className="text-center">
					<span style={{ position: 'absolute', left: '1rem' }}>
						<i className="fas fa-arrow-left" onClick={this.props.func}></i>
					</span>
					<h4 className="d-inline-block">{this.state.taskInTimer.title}</h4>
				</div>
				<div className="row">
					<div className="col-4">
						<div style={{ width: '90%' }}>
							{/* Deprecated because there is a bug */}
							{/* <AnimatedProgressProvider
								valueStart={0}
								valueEnd={this.state.circularProgressEnd}
								duration={25.0}
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
					<div className="col-8">
						<div className="row">
							<div className="col-6"></div>
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
							now={this.state.remainMinute === 25 ? 1500 : this.state.secondCounter}
							min={0}
							max={1500}
							label={this.state.progressLabel}
							onClick={this.startSession}
						/>
					</div>
					<p>{this.state.taskInTimer.note}</p>
				</div>
			</div>
		);
	}
}
