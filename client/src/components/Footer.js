import React, { Component } from 'react';
import GitHubButton from 'react-github-btn';

export default class Footer extends Component {
	render() {
		return (
			<footer className="text-right">
				<span className="p-2">
					<GitHubButton
						href="https://github.com/ahmetbcakici/DayPlanner"
						data-size="large"
						aria-label="Star ahmetbcakici/DayPlanner on GitHub">
						Star on GitHub
					</GitHubButton>
				</span>
				{/* <span>Copyright (c) Ahmet Buğra Çakıcı 2020</span> */}
			</footer>
		);
	}
}
