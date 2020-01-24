import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../style/Timer.css';
import { easeSin } from 'd3-ease';

// Animation
// import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './AnimatedProgressProvider';

var remainMinute = 24,
	remainSecond = 59;
var pomodoroSession = () => {
	setInterval(function() {
		// this.setState({ remainSecond: this.state.remainSecond - 1 });
		if (remainSecond-- === 0) {
			remainSecond = 59;
			remainMinute--;
		}
	}, 1000);
};

export default class Timer extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		taskInTimer: '',
		progressEnd: 0,
		test: 0,
	};

	findTaskById = () => {
		this.props.tasks.map(task => {
			if (task._id === this.props.id) this.setState({ taskInTimer: task });
		});
	};

	componentDidMount() {
		this.findTaskById();
		pomodoroSession();
		// this.progress(600, 600, document.getElementById('progressBar'));
	}

	startTimer = () => {
		this.setState({ progressEnd: 100 });
	};

	test = () => {
		this.setState({ test: this.state.test + 5 });
	};

	render() {
		return (
			<div>
				<div className="text-center">
					<span style={{ position: 'absolute', left: '1rem' }}>
						<i className="fas fa-arrow-left" onClick={this.props.func}></i>
					</span>
					<h4 className="d-inline-block">{this.state.taskInTimer.title}</h4>
				</div>
				{/* <div>
					<div style={{ width: '25%', float: 'left' }} onClick={this.startTimer}>
						<AnimatedProgressProvider
							valueStart={0}
							valueEnd={this.state.progressEnd}
							duration={10.0}
							easingFunction={easeSin}>
							{value => {
								const roundedValue = Math.round(value);
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
						</AnimatedProgressProvider>
					</div>
					<div className="d-flex justify-content-center" onClick={this.test}>
						<div className="mt-5">a</div>
						<div className="mt-4">
							<small>sada</small>
							<small>sada</small>
						</div>
						<ProgressBar
							animated={false}
							now={25}
							min={0}
							max={25}
							style={{ width: '75%', float: 'left' }}
							label={'Click here to start your work session'}
							className="mt-5"
						/>
					</div>
				</div> */}
				<div className="row">
					<div className="col-4" onClick={this.startTimer}>
						<div style={{width:'90%'}}>
						<AnimatedProgressProvider
							valueStart={0}
							valueEnd={this.state.progressEnd}
							duration={10.0}
							easingFunction={easeSin}>
							{value => {
								const roundedValue = Math.round(value);
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
						</AnimatedProgressProvider>
						</div>
					</div>
					<div className="col-8 mt-4">
						<div className="row">
							<div className="col-6">
								<small>00:00</small>
							</div>
							<div className="col-6">
							</div>
						</div>
						<ProgressBar
							animated={false}
							now={25}
							min={0}
							max={25}
							label={'Click here to start your work session'}
							onClick={null}
						/>
					</div>
				</div>
			</div>
		);
	}
}
