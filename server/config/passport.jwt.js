const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Account = require('../models/account.model');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'sansa';

passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		Account.findById(jwt_payload.id)
			.then((account) => {
				if (account) {
					// const testUser = { account, jwtFromRequest: opts.jwtFromRequest };
					// console.log(testUser.jwtFromRequest === opts.jwtFromRequest);
					return done(null, account);
				}
				return done(null, false);
			})
			.catch((error) => console.log(error));
	})
);
