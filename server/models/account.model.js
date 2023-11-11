const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	}
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
