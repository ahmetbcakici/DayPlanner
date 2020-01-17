const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');

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

router.post('/login', (req, res) => {
	User.findOne({ username: req.body.username }).then(async docs => {
		if (docs) {
			if (await bcrypt.compare(req.body.password, docs.password)) {
				res.status(200).send(); // successfully login process
			} else res.status(400).send(); // 400 incorrect username or password
		} else res.status(404).send(); // 404 user not found
	});
	// .catch(err => );
});

router.post('/register', async (req, res) => {
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

// router.post('/register', async (req, res) => {
// 	// You should make a control for if there is an user with this name or email
// 	console.log(req.body)
// 	await User.findOne({ $or: [{ username: req.body.username }, { mail: req.body.mail }] }).then(docs => {
// 		if (docs) return res.status(400).end();
// 	});

// 	console.log("x")

// 	hashPass.then(response => {
// 		var newrecord = new User({
// 			username: req.body.username,
// 			mail: req.body.mail,
// 			password: response,
// 		});

// 		newrecord.save(err => {
// 			if (err) res.status(404).send();
// 			console.log('saved');
// 			res.status(200).send();
// 		});
// 	});
// });

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
