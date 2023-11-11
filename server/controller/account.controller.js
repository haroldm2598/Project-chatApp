const Account = require('../models/account.model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = asyncHandler(async (req, res) => {
	try {
		const findAccount = await Account.findOne({ email: req.body.email });

		if (!findAccount) {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(req.body.password, salt);
			const newAccount = new Account({
				name: req.body.name,
				email: req.body.email,
				password: hashPassword
			});

			await newAccount.save();
			res.send({
				success: true,
				message: 'Account is created',
				account: {
					id: newAccount._id,
					name: newAccount.name,
					email: newAccount.email
				}
			});
		} else {
			res.send('Account already created please try another');
		}
	} catch (err) {
		res.send({
			success: false,
			message: 'Something went wrong',
			error: err
		});
	}
});

exports.login = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body;
		const findAccount = await Account.findOne({ email: email });
		const passwordCorrect = await bcrypt.compare(
			password,
			findAccount.password
		);
		// wrong password
		if (!passwordCorrect) {
			return res.status(401).send({
				success: false,
				message: 'Incorrect email or password'
			});
		}

		const payload = {
			email: findAccount.email,
			id: findAccount._id
		};
		const token = jwt.sign(payload, 'sansa', { expiresIn: '1d' });

		return res.status(200).send({
			sucess: true,
			message: 'Logged in successfully',
			token: 'Bearer ' + token
		});
	} catch (err) {
		res.status(500).send({
			success: false,
			message: 'Server Error'
		});
	}
});

exports.protected = (req, res) => {
	// console.log(req.user);
	return res.status(200).send({
		success: true,
		account: {
			id: req.user._id,
			email: req.user.email,
			name: req.user.name,
			isAdmin: req.user.isAdmin
		}
	});
};

exports.allAccount = asyncHandler(async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: 'i' } },
					{ email: { $regex: req.query.search, $options: 'i' } }
				]
		  }
		: {};

	const account = await Account.find(keyword).find({
		_id: { $ne: req.user._id }
	});
	res.send(account);
});
