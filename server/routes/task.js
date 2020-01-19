const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/get', (req, res) => {
	// JSON.parse(req.query.loggedUser).username
	User.findOne({ username: 'ahmet' }).then(docs => {
		res.send(docs.tasks);
	});
});

router.post('/post', (req, res) => {
	User.findOne({ username: 'ahmet' }).then(doc => {
		doc.tasks.push({
			title: req.body.title,
			date: req.body.date,
		});
		doc.save().then(() => res.end());
	});
});

router.put('/put', (req, res) => {
	if (Object.keys(req.body).length < 2) {
		User.findOne({ username: 'ahmet' }).then(doc => {
			doc.tasks.map(task => {
				if (task.id === req.body.id) {
					task.status = task.status == 'incompleted' ? 'completed' : 'incompleted';
				}
			});
			doc.save().then(() => res.end());
		});
	} else {
		User.findOne({ username: 'ahmet' }).then(doc => {
			doc.tasks.map(task => {
				if (task.id === req.body.id) {
					if (req.body.color) task.color = req.body.color;
					task.title = req.body.title;
				}
			});
			doc.save().then(() => res.end());
		});
	}
});

router.delete('/delete', (req, res) => {
	User.findOne({ username: 'ahmet' }).then(doc => {
		doc.tasks.map(task => {
			if (task.id === req.body.id) task.remove();
		});
		doc.save().then(() => res.end());
	});
});

module.exports = router;
