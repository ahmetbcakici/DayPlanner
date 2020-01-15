const express = require('express');
const router = express.Router();
const User = require('../models/User');
var session;

router.post('/login', (req, res) => {
	User.findOne({ username: req.body.username, password: req.body.password }).then(docs => {
		if (docs) res.status(200).send(docs);
		else res.status(404).send('Can not find an user');
	});
});

router.post('/register', (req, res) => {
	User.findOne({ username: req.body.username, mail: req.body.mail, password: req.body.password }).then(docs => {
		if (docs) res.status(200).send(docs);
		else res.status(404).send();
	});
	const newrecord = new User({
		username: req.body.username,
		mail: req.body.mail,
		password: req.body.password,
	});

	newrecord.save(err => {
		if (err) res.status(404).send();
		res.status(200).send();
	});
});

router.get('/get', (req, res) => {});

router.post('/post', (req, res) => {
	const newrecord = new User({
		username: 'mehmet',
		password: '123',
	});
	newrecord.save(err => {
		if (err) throw err;
		console.log('SAVED!');
	});
});

router.put('/put', (req, res) => {});

router.delete('/delete', (req, res) => {});

module.exports = router;
