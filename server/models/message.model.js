const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		sender: { type: Schema.Types.ObjectId, ref: 'Account' },
		content: { type: String, required: true },
		chat: { type: Schema.Types.ObjectId, ref: 'TestChat' }
	},
	{ timestamps: true }
);

const TestMessage = mongoose.model('TestMessage', messageSchema);
module.exports = TestMessage;
