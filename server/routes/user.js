const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', (req, res) => {
	// if (req.body.username == 'ahmet' && req.body.password == '123') {
	// 	res.send('D');
	// } else {
	// 	res.send('Y');
	// }

	User.findOne({ username: req.body.username, password: req.body.password }).then(docs => {
		if (docs) res.status(200).send(docs);
		else res.status(404).send('Can not find an user');
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
