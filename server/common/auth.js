const jwt = require('jsonwebtoken');

exports.check = (req, res, next) => {
	let token = req.cookies.jwt;
	if (!token) {
		return res.status(403).json({
			success: false,
			message: 'not logged in'
		});
	}

	const p = new Promise(
		(resolve, reject) => {
			jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
				if (err) reject(err);
				resolve(decoded)
			});
		}
	);

	const respond = (token) => {
		next();
	};

	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		});
	};

	p.then(respond).catch(onError);
};

exports.getInfo = (req) => {
	let token = req.cookies.jwt;

	return jwt.verify(token, req.app.get('jwt-secret'));
};

exports.getUserNo = (req) => {
	let token = req.cookies.jwt;
	if (!token) return 0;
	let decoded;
	try {
		decoded = jwt.verify(token, req.app.get('jwt-secret'));
	} catch (exception) {
		return 0;
	}

	return decoded.userNo ? decoded.userNo : 0;
};

exports.getAdminYn = (req) => {
	let token = req.cookies.jwt;
	if (!token) return 'N';
	let decoded;
	try {
		decoded = jwt.verify(token, req.app.get('jwt-secret'));
	} catch (exception) {
		return 'N';
	}

	return decoded.adminYn ? decoded.adminYn : 'N';
};

exports.getTelno= (req) => {
	let token = req.cookies.jwt;
	if (!token) return '';
	let decoded;
	try {
		decoded = jwt.verify(token, req.app.get('jwt-secret'));
	} catch (exception) {
		return '';
	}

	return decoded.telno ? decoded.telno : '';
};

exports.delete = (req, res) => {
	res.cookie('jwt', '');
};
