const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'secret_key');
		req.userData = decodedToken;
		next();
	} catch (error) {
		return res.status(401).send({
			message: 'Auth failed',
		});
	}
};
