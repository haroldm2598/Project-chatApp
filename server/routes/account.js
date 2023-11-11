const express = require('express');
const passport = require('passport');
const account = require('../controller/account.controller');

const router = express.Router();

router.post('/register', account.register);
router.post('/login', account.login);
router.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	account.protected
);
router.get(
	'/s',
	passport.authenticate('jwt', { session: false }),
	account.allAccount
);

// [
// 	account.allAccount,
// 	account.protected
// ]
// parehas kasing get. kaya nag error
// router.get(
// 	'/',
// 	passport.authenticate('jwt', { session: false }),
// 	account.allAccount
// );

module.exports = router;
