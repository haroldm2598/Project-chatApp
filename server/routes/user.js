const express = require('express');
const passport = require('passport');
const user = require('../controller/user.controller');

const router = express.Router();

router.get(
	'/message',
	passport.authenticate('jwt', { session: false }),
	user.getMessage
);
router.post(
	'/message',
	passport.authenticate('jwt', { session: false }),
	user.createMessage
);

module.exports = router;
