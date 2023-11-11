const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');

exports.getMessage = asyncHandler(async (req, res) => {
	try {
		const msg = await User.findOne({ accountUser: req.user._id })
			.populate('accountUser')
			.exec();

		res.status(200).json({ msg });
	} catch (err) {
		console.log(err);
	}
});

exports.createMessage = asyncHandler(async (req, res) => {
	try {
		const newMessage = new User({
			accountUser: req.user._id,
			recipient: req.body.recipient,
			message: req.body.message
		});

		await newMessage.save();
		console.log('message is sent');
	} catch (err) {
		console.log(err);
	}
});
