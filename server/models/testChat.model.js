const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
	{
		chatName: { type: String, required: true },
		isGroupChat: { type: Boolean, required: true },
		accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
		latestMessage: { type: Schema.Types.ObjectId, ref: 'TestMessage' },
		groupAdmin: { type: Schema.Types.ObjectId, ref: 'Account' }
	},
	{ timestamps: true }
);

const TestChat = mongoose.model('TestChat', chatSchema);
module.exports = TestChat;
