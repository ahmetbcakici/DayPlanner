import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../style/Timer.css';
import { easeSin } from 'd3-ease';
import AnimatedProgressProvider from './AnimatedProgressProvider';

// var remainMinute = 24,
// 	remainSecond = 3;
// var pomodoroSession = () => {
// 	setInterval(function() {
// 		console.log(remainMinute);
// 		console.log(remainSecond);

// 		remainSecond--;
// 		if (remainSecond === 0) {
// 			remainSecond = 3;
// 			remainMinute--;
// 		}
// 	}, 1000);
// };

export default class Timer extends Component {
	constructor(props) {
		super(props);
		this.test = this.test.bind(this);
	}

	state = {
		remainMinute: 24,
		remainSecond: 3,
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

		// this.progress(600, 600, document.getElementById('progressBar'));
	}

	workSession = () => {
		var remainMinute = 24,
			remainSecond = 3;
		setInterval(function() {
			console.log(remainMinute);
			console.log(remainSecond);

			this.setStates(remainMinute, remainSecond);
			if (remainSecond === 0) {
				remainSecond = 3;
				// remainMinute--;
			}
		}, 1000);
	};

	setStates = (rM, rS) => {
		console.log('a');
		// this.setState({ remainMinute: rM, remainSecond: rS });
	};

	startSession = () => {
		this.setState({
			circularProgressEnd: 100,
			progressAnimated: true,
			progressLabel: '',
			progressVariant: 'success',
		});
		// pomodoroSession();
		// this.workSession();
		this.test();
	};

	test() {
		let x = () =>
			this.setState({ remainSecond: this.state.remainSecond - 1 }, () => {
				if (this.state.remainSecond < 1) {
					this.setState({ remainSecond: 3, remainMinute: this.state.remainMinute - 1 });
				}
			});
		function testingo() {
			console.log('z');
			x();

			// this.setState({ remainSecond: this.state.remainSecond - 1 });
		}
		let abc = setInterval(testingo, 1000);
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
							<AnimatedProgressProvider
								valueStart={0}
								valueEnd={this.state.circularProgressEnd}
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
								<small>{this.state.remainMinute}:{this.state.remainSecond}</small>
							</div>
							<div className="col-6"></div>
						</div>
						<p>{Math.abs(this.state.remainMinute - 24)}</p>
						<ProgressBar
							variant={this.state.progressVariant}
							animated={this.state.progressAnimated}
							now={Math.abs(this.state.remainMinute - 24) === 0 ? 100 : Math.abs(this.state.remainMinute - 24)}
							min={0}
							max={25}
							// label={'Click here to start your work session'}
							label={this.state.progressLabel}
							onClick={this.startSession}
						/>
					</div>
				</div>
			</div>
		);
	}
}
