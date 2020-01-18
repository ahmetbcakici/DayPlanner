import React, { Component } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut, easeSinOut, easeSinInOut, easeSin } from 'd3-ease';

// Animation
// import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './AnimatedProgressProvider';
// import ChangingProgressProvider from './ChangingProgressProvider';

// Radial separators
// import RadialSeparators from './RadialSeparators';

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

	render() {
		return (
			<div>
				<div className="text-center">
					<span className="float-left">
						<i className="fas fa-arrow-left" onClick={this.props.func}></i>
					</span>
					<h4 className="d-inline-block">{this.state.taskInTimer.title}</h4>
				</div>
				<div className="mx-auto mt-3" style={{ width: '20%' }}>
					<AnimatedProgressProvider valueStart={0} valueEnd={100} duration={60.0} easingFunction={easeSin}>
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
