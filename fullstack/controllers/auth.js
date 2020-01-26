const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

const User = require('../models/User');

module.exports.login = async (req, res) => {
	// login
	const candidate = await User.findOne({ email: req.body.email });
	if (candidate) {
		// if user exist throw error
		const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
		if (passwordResult) {
			// generartion token
			const token = jsonwebtoken.sign(
				{
					enail: candidate.enail,
					userId: candidate._id
				},
				keys.jwt, //secret key
				{ expiresIn: 3600 } //lifetime token
			);
			res.status(200).json({
				token: `Bearer ${token}`
			});
		} else {
			// pass not match
			res.status(401).json({
				message: 'Password incorrect, try another'
			});
		}
	} else {
		res.status(404).json({
			message: 'User not found'
		});
	}

	try {
	} catch (error) {
		errorHandler(res, error);
	}
};

module.exports.register = async (req, res) => {
	// check existin user
	const candidate = await User.findOne({ email: req.body.email });
	if (candidate) {
		// if user exist throw error
		res.status(409).json({
			message: 'Email exist try another'
		});
	} else {
		// if user not exist create user
		const salt = bcrypt.genSaltSync(10); //generate hash for crypting
		const password = req.body.password;

		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt) // cripting pass by bcrypt
		});
		try {
			await user.save();
			res.status(201).json({
				message: 'User created'
			});
		} catch (error) {
			errorHandler(res, error);
		}
	}

	user.save().then(() => {
		console.log('****USER SAVE****');
	});
};
