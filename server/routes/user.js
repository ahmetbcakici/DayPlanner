const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const User = require('../models/User');
const checkAuth = require('../middleware/checkauth');

const hashPass = purepass => {
	return new Promise(function(res, rej) {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(purepass, salt, async (err, hash) => {
				if (err) throw err;
				res(hash);
			});
		});
	});
};

router.get('/jwt', checkAuth, (req, res) => {
	res.send(req.userData);
	res.end();
});

router.get('/get', (req, res) => {
	User.findOne({ username: 'tester' }).then(docs => {
		const { username, mail, registeredDate } = docs;
		res.json({
			username,
			mail,
			registeredDate,
		});
	});
});

router.post('/login', (req, res) => {
	if (!req.body.username || !req.body.password) return res.status(403).send();
	User.findOne({ username: req.body.username })
		.then(async docs => {
			if (docs) {
				if (await bcrypt.compare(req.body.password, docs.password)) {
					const token = jwt.sign(
						{
							username: docs.username,
							mail: docs.mail,
							_id: docs._id,
						},
						process.env.JWT_SECRETKEY,
						{
							expiresIn: '30d',
						}
					);
					return res.status(200).send({ message: 'success', token: token });
				} else res.status(400).send(); // 400 incorrect username or password
			} else res.status(404).send(); // 404 user not found
		})
		.catch(() => res.status(403).send()); // forbidden : something went wrong
});

router.post('/register', async (req, res) => {
	if (!req.body.username || !req.body.password || !req.body.mail) return res.status(403).send();

	const isRegistered = await User.findOne({ $or: [{ username: req.body.username }, { mail: req.body.mail }] });

	if (isRegistered) {
		res.status(400).end();
		return;
	}

	hashPass(req.body.password).then(response => {
		var newrecord = new User({
			username: req.body.username,
			mail: req.body.mail,
			password: response,
		});

		newrecord.save(err => {
			if (err) res.status(400).send();
			res.status(200).send();
		});
	});
});

router.put('/put', (req, res) => {});

router.delete('/delete', (req, res) => {});

module.exports = router;
