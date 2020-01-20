const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) throw err;
		bcrypt.hash(req.body.password, salt, async (err, hash) => {
			if (err) throw err;
			req.hashedPass = hash;
		});
	});
	next();
};
