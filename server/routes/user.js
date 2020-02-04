const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');
const checkAuth = require('../middleware/checkauth');
const hashPass = require('../middleware/hashpass');

router.get('/jwt', checkAuth, (req, res) => {
	res.send(req.userData);
	res.end();
});

// router.get('/get', (req, res) => { DEPRECATED
// 	User.findOne({ username: 'tester' }).then(docs => {
// 		// username should be dynamic
// 		const { username, mail, registeredDate } = docs;
// 		res.json({
// 			username,
// 			mail,
// 			registeredDate,
// 		});
// 	});
// });

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) return res.status(403).send();
	User.findOne({ username })
		.then(async docs => {
			if (docs) {
				if (await bcrypt.compare(password, docs.password)) {
					const token = jwt.sign(
						{
							username: docs.username,
							mail: docs.mail,
							registeredDate: docs.registeredDate,
							_id: docs._id,
						},
						process.env.JWT_SECRETKEY,
						{
							expiresIn: '30d',
						}
					);
					return res.status(200).send({ message: 'success', token });
				}
				return res.status(400).send(); // 400 incorrect username or password
			}
			return res.status(404).send(); // 404 user not found
		})
		.catch(() => res.status(403).send()); // forbidden : something went wrong
});

router.post('/register', hashPass, async (req, res) => {
	const { username, password, mail, date } = req.body;
	if (!username || !password || !mail) return res.status(404).send();

	const isRegistered = await User.findOne({ $or: [{ username }, { mail }] });

	if (isRegistered) {
		res.status(400).end();
		return;
	}

	var newrecord = new User({
		username,
		mail,
		password: req.hashedPass,
		registeredDate: date,
	});

	newrecord.save(err => {
		if (err) res.status(403).send();
		res.status(200).send();
	});
});

router.put('/put', (req, res) => {
	const { currentPassword, newPassword, newPasswordAgain } = req.body;
	const username = JSON.parse(req.query.loggedUser).username;
	if (!currentPassword || !newPassword || newPasswordAgain) return res.status(404).send();
	if (newPassword !== newPasswordAgain) return res.status(400).send();

	console.log(username);
});

router.delete('/delete', (req, res) => {});

module.exports = router;
