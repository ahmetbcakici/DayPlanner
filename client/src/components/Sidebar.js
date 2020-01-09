import React, { Component } from 'react';

export default class Sidebar extends Component {
	render() {
		return (
			<ul class="sidebar navbar-nav h-100 w-25 bg-dark">
				<li class="nav-item active">
					<a class="nav-link" href="/admin">
						<i class="fas fa-fw fas fa-home"></i>
						<span>Home Page</span>
					</a>
				</li>
				<li class="nav-item active">
					<a class="nav-link" href="/admin/experience">
						{/* <!-- <i class="fas fa-fw fa-tachometer-alt"></i> --> */}
						<i class="fab fa-fw fas fa-dice-d20"></i>
						<span>Experience</span>
					</a>
				</li>
				<li class="nav-item active">
					<a class="nav-link" href="/admin/skill">
						<i class="fab fa-fw fab fa-bandcamp"></i>
						<span>Skill</span>
					</a>
				</li>
				<li class="nav-item active">
					<a class="nav-link" href="/admin/portfolio">
						<i class="fab fa-fw fab fa-artstation"></i>
						<span>Portfolio</span>
					</a>
				</li>
				<li class="nav-item active">
					<a class="nav-link" href="/admin/blog">
						<i class="fas fa-fw fas fa-blog"></i>
						<span>Blog</span>
					</a>
				</li>
			</ul>
		);
	}
}
