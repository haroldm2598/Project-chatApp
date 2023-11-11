const asyncHandler = require('express-async-handler');
const TestMessage = require('../models/message.model');
const Account = require('../models/account.model');
const TestChat = require('../models/testChat.model');

exports.sendMessage = asyncHandler(async (req, res) => {
	const { content, chatId } = req.body;

	if (!content || !chatId) {
		console.log('Invalid data passed into request');
		return res.sendStatus(400);
	}

	let newMessage = {
		sender: req.user._id,
		content: content,
		chat: chatId
	};

	try {
		let message = await TestMessage.create(newMessage);

		message = await message.populate('sender', 'name');
		message = await message.populate('chat');
		message = await Account.populate(message, {
			path: 'chat.accounts',
			select: 'name email'
		});

		await TestChat.findByIdAndUpdate(req.body.chatId, {
			latestMessage: message
		});

		res.json(message);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

exports.allMessages = asyncHandler(async (req, res) => {
	try {
		const message = await TestMessage.find({ chat: req.params.chatId })
			.populate('sender', 'name email')
			.populate('chat');

		res.json(message);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});
