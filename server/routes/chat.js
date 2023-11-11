const express = require('express');
const testChat = require('../controller/testChat.controller');
const passport = require('passport');

const router = express.Router();

// router.get(
// 	'/',
// 	passport.authenticate('jwt', { session: false }),
// 	testChat.sendChat
// );
// router.get('/:id', testChat.sendGroup);
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	testChat.fetchChat
);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	testChat.accessChat
);

router.post(
	'/group',
	passport.authenticate('jwt', { session: false }),
	testChat.createGroupChat
);
router.put(
	'/rename',
	passport.authenticate('jwt', { session: false }),
	testChat.renameGroup
);
router.put(
	'/groupremove',
	passport.authenticate('jwt', { session: false }),
	testChat.removeFromGroup
);
router.put(
	'/groupadd',
	passport.authenticate('jwt', { session: false }),
	testChat.addToGroup
);

module.exports = router;
