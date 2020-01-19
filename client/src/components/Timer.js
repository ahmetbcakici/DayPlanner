import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
	};

	findTaskById = () => {
		this.props.tasks.map(task => {
			if (task._id === this.props.id) this.setState({ taskInTimer: task });
		});
	};

	componentDidMount() {
		this.findTaskById();
		pomodoroSession();
	}

	startTimer = () => {
		this.setState({ progressEnd: 100 });
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
				<div className="mx-auto mt-3" style={{ width: '30%' }} onClick={this.startTimer}>
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
									// text={`${remainMinute} m\n${remainSecond} s`}
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
		);
	}
}
