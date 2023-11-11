export const getSender = (loggedUser, accounts) => {
	// console.log(loggedUser);
	return accounts[0]?._id === loggedUser?.id
		? accounts[1].name
		: accounts[0].name;
};

export const getSenderFull = (loggedUser, accounts) => {
	return accounts[0]?._id === loggedUser?.id ? accounts[1] : accounts[0];
};

export const isSameSender = (message, currentMessage, index, userId) => {
	return (
		index < message.length - 1 &&
		(message[index + 1].sender._id !== currentMessage.sender._id ||
			(message[index + 1].sender._id === undefined &&
				message[index].sender._id !== userId))
	);
};

export const isLastMessage = (messages, index, userId) => {
	return (
		index === messages.length - 1 &&
		messages[messages.length - 1].sender._id !== userId &&
		messages[messages.length - 1].sender._id
	);
};

export const isSameSenderMargin = (messages, currentMessage, index, userId) => {
	if (
		index < messages.length - 1 &&
		messages[index + 1].sender._id === currentMessage.sender._id &&
		messages[index].sender._id !== userId
	)
		return '33%';
	else if (
		(index < messages.length - 1 &&
			messages[index + 1].sender._id !== currentMessage.sender._id &&
			messages[index].sender._id !== userId) ||
		(index === messages.length - 1 && messages[index].sender._id !== userId)
	)
		return '0';
	else return 'auto';
};

export const isSameUser = (messages, currentMessage, index) => {
	return (
		index > 0 && messages[index - 1].sender._id === currentMessage.sender._id
	);
};
