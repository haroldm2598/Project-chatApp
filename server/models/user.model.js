const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		accountUser: {
			type: Schema.Types.ObjectId,
			ref: 'Account',
			required: true
		},
		recipient: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
		message: { type: String, required: true }
		// messageTo: [{ message: String, accountMsgTo: String }]
	},
	{ timestamps: true }
);

const User = mongoose.model('Message', UserSchema);
module.exports = User;
