const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/get', (req, res) => {
	try {
		const username = JSON.parse(req.query.loggedUser).username;
		User.findOne({ username }).then(docs => {
			res.send(docs.tasks);
		});
	} catch {
		res.status(401).json({ message: 'There is no token!' });
	}
});

router.post('/post', (req, res) => {
	try {
		const username = JSON.parse(req.query.loggedUser).username;
		User.findOne({ username }).then(doc => {
			doc.tasks.push({
				title: req.body.title,
				date: req.body.date,
			});
			doc.save().then(() => res.end());
		});
	} catch {
		res.status(401).json({ message: 'There is no token!' });
	}
});

router.put('/put', (req, res) => {
	try {
		const username = JSON.parse(req.query.loggedUser).username;
		if (Object.keys(req.body).length < 2) {
			console.log(req.body);
			User.findOne({ username }).then(doc => {
				doc.tasks.map(task => {
					if (task.id === req.body.id) {
						task.status = task.status == 'incompleted' ? 'completed' : 'incompleted';
					}
				});
				doc.save().then(() => res.end());
			});
		} else if (Object.keys(req.body).length < 3) {
			User.findOne({ username }).then(doc => {
				doc.tasks.map(task => {
					if (task.id === req.body.id) {
						if (req.body.timeWorked > 0) task.timeWorked += req.body.timeWorked;
						else task.timeWorked += task.workTime;
					}
				});
				doc.save().then(() => res.end());
			});
		} else {
			User.findOne({ username }).then(doc => {
				if (!req.body.title) {
					return res.end();
				}

				doc.tasks.map(task => {
					if (task.id === req.body.id) {
						if (req.body.color) task.color = req.body.color;
						task.title = req.body.title;
						task.note = req.body.note;
						task.workTime = req.body.workTime;
						task.breakTime = req.body.breakTime;
					}
				});
				doc.save().then(() => res.end());
			});
		}
	} catch {
		res.status(401).json({ message: 'There is no token!' });
	}
});

router.delete('/delete', (req, res) => {
	try {
		const username = JSON.parse(req.query.loggedUser).username;
		User.findOne({ username }).then(doc => {
			doc.tasks.map(task => {
				if (task.id === req.body.id) task.remove();
			});
			doc.save().then(() => res.end());
		});
	} catch {
		res.status(401).json({ message: 'There is no token!' });
	}
});

module.exports = router;
