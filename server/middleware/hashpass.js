const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
	const { password, newPassword } = req.body;
	let passToHash = newPassword;
	if (password) passToHash = password;
	bcrypt.genSalt(10, (err, salt) => {
		if (err) throw err;
		bcrypt.hash(passToHash, salt, async (err, hash) => {
			if (err) throw err;
			req.hashedPass = await hash;
			next();
		});
	});
};
