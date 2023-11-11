// const chats = require('../config/data');
const Account = require('../models/account.model');
const TestChat = require('../models/testChat.model');
const asyncHandler = require('express-async-handler');

// exports.sendChat = (req, res) => {
// 	res.send(chats);
// };

// exports.sendGroup = (req, res) => {
// 	const singleChat = chats.find((group) => group.id === req.params.id);
// 	res.send(singleChat);
// };

exports.accessChat = asyncHandler(async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		console.log('UserId param not sent with request');
		return res.status(400);
	}

	let isChat = await TestChat.find({
		isGroupChat: false,
		$and: [
			{ accounts: { $elemMatch: { $eq: req.user._id } } },
			{ accounts: { $elemMatch: { $eq: userId } } }
		]
	})
		.populate('accounts', '-password')
		.populate('latestMessage');

	console.log(req.user._id);
	isChat = await Account.populate(isChat, {
		path: 'latestMessage.sender',
		select: 'name email'
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} else {
		let chatData = {
			chatName: 'sender',
			isGroupChat: false,
			accounts: [req.user._id, userId]
		};

		try {
			const createChat = await TestChat.create(chatData);

			const fullChat = await TestChat.findOne({ _id: createChat.id }).populate(
				'accounts',
				'-password'
			);

			res.send(fullChat);
		} catch (err) {
			console.log(err);
		}
	}
});

exports.fetchChat = asyncHandler(async (req, res) => {
	// console.log(req.user);
	try {
		TestChat.find({ accounts: { $elemMatch: { $eq: req.user._id } } })
			.populate('accounts', '-password')
			.populate('groupAdmin', '-password')
			.populate('latestMessage')
			.sort({ updatedAt: -1 })
			.then(async (results) => {
				results = await Account.populate(results, {
					path: 'latestMessage.sender',
					select: 'name email'
				});
				res.status(200).send(results);
			});

		// const getChat = await TestChat.find({
		// 	accounts: { $elemMatch: { $eq: req.user._id } }
		// })
		// 	.populate('accounts', '-password')
		// 	.populate('groupAdmin', '-password')
		// 	.populate('latestMessage')
		// 	.sort({ updatedAt: -1 });

		// const result = await Account.populate(getChat, {
		// 	path: 'latestMessage.sender',
		// 	select: 'name email'
		// });

		// res.send(result);

		// TestChat.find({ accounts: { $elemMatch: { $eq: req.user._id } } })
		// 	.populate('accounts', '-password')
		// 	.populate('groupAdmin', '-password')
		// 	.populate('latestMessage')
		// 	.sort({ updatedAt: -1 })
		// 	.then(async (results) => {
		// 		results = await Account.populate(results, {
		// 			path: 'latestMessage.sender',
		// 			select: 'name pic email'
		// 		});

		// 		console.log(results);
		// 		res.status(200).send(results);
		// 	});
	} catch (err) {
		res.send(err);
	}
});

exports.createGroupChat = asyncHandler(async (req, res) => {
	if (!req.body.users || !req.body.name) {
		return res.send({ message: 'please be fill all the fields' });
	}

	let users = JSON.parse(req.body.users);

	if (users.length < 2) {
		res.send('More than 2 users are required in group');
	}

	users.push(req.user);
	// console.log(users);
	// console.log(req.user);
	try {
		const groupChat = await TestChat.create({
			chatName: req.body.name,
			accounts: users,
			isGroupChat: true,
			groupAdmin: req.user
		});

		// console.log(req.users);

		const fullGroupChat = await TestChat.findOne({ _id: groupChat._id })
			.populate('accounts', '-password')
			.populate('groupAdmin', '-password');

		res.json(fullGroupChat);
	} catch (err) {
		console.log(err);
	}
});

exports.renameGroup = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body;

	const updatedChat = await TestChat.findByIdAndUpdate(
		chatId,
		{
			chatName: chatName
		},
		{
			new: true
		}
	)
		.populate('accounts', '-password')
		.populate('groupAdmin', '-password');

	if (!updatedChat) {
		res.status(404);
		throw new Error('Chat Not Found');
	} else {
		res.json(updatedChat);
	}
});

exports.removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	// check if the requester is admin

	const removed = await TestChat.findByIdAndUpdate(
		chatId,
		{
			$pull: { accounts: userId }
		},
		{
			new: true
		}
	)
		.populate('accounts', '-password')
		.populate('groupAdmin', '-password');

	if (!removed) {
		res.status(404);
		throw new Error('Chat Not Found');
	} else {
		res.json(removed);
	}
});

exports.addToGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	// check if the requester is admin
	const added = await TestChat.findByIdAndUpdate(
		chatId,
		{
			$push: { accounts: userId }
		},
		{
			new: true
		}
	)
		.populate('accounts', '-password')
		.populate('groupAdmin', '-password');

	if (!added) {
		res.status(404);
		throw new Error('Chat Not Found');
	} else {
		res.json(added);
	}
});
