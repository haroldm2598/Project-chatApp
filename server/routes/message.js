const express = require('express');
const passport = require('passport');
const chat = require('../controller/message.controller');

const router = express.Router();

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	chat.sendMessage
);

router.get(
	'/:chatId',
	passport.authenticate('jwt', { session: false }),
	chat.allMessages
);

module.exports = router;
