import { useEffect, useState } from 'react';
import { FaArrowLeft, FaEyeSlash } from 'react-icons/fa6';
import Axios from 'axios';
import { io } from 'socket.io-client';

import { ChatState } from '../../context/ProtectedContext';
import { getSender, getSenderFull } from '../../config/ChatConfig';

import ProfileModal from './ProfileModal';
import UpdateGroupModal from './UpdateGroupModal';
import Button from '../Button';
import Spinner from '../animation/Spinner';
import ScrollableChat from './ScrollableChat';

const ENDPOINT = 'http://localhost:3000';
let socket;
let selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState();
	const [loading, setLoading] = useState(false);
	const [socketConnected, setSocketConnected] = useState(false);
	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);

	const { user, selectedChat, setSelectedChat } = ChatState();

	const fetchMessages = async () => {
		if (!selectedChat) return;

		try {
			setLoading(true);
			const token = localStorage.getItem('token');
			const { data } = await Axios({
				method: 'GET',
				url: `http://localhost:3000/api/message/${selectedChat._id}`,
				headers: { Authorization: token },
				withCredentials: true
			});

			setMessages(data);
			setLoading(false);

			socket.emit('join chat', selectedChat._id);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit('setup', user);
		socket.on('connected', () => setSocketConnected(true));
		socket.on('typing', () => setIsTyping(true));
		socket.on('stop typing', () => setIsTyping(false));
	}, [user]);

	useEffect(() => {
		fetchMessages();

		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		socket.on('message recieved', (newMessageRecieved) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare._id !== newMessageRecieved.chat._id
			) {
				// give notification
			} else {
				setMessages([...messages, newMessageRecieved]);
			}
		});
	});

	const sendMessage = async (event) => {
		if (event.key === 'Enter' && newMessage) {
			socket.emit('stop typing', selectedChat._id);
			try {
				setNewMessage('');
				const token = localStorage.getItem('token');
				const { data } = await Axios({
					method: 'POST',
					url: `http://localhost:3000/api/message`,
					headers: {
						'Content-Type': 'application/json',
						'Authorization': token
					},
					data: {
						content: newMessage,
						chatId: selectedChat._id
					},
					withCredentials: true
				});

				console.log(data);

				socket.emit('new message', data);
				setMessages([...messages, data]);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const typingHandler = (e) => {
		setNewMessage(e.target.value);

		// typing handler logic
		if (!socketConnected) return;

		if (!typing) {
			setTyping(true);
			socket.emit('typing', selectedChat._id);
		}

		const lastTypingTime = new Date().getTime();
		const timerLength = 3000;

		setTimeout(() => {
			let timeNow = new Date().getTime();
			let timeDiff = timeNow - lastTypingTime;

			if (timeDiff >= timerLength && typing) {
				socket.emit('stop typing', selectedChat._id);
				setTyping(false);
			}
		}, timerLength);
	};

	const preventReload = (e) => {
		e.preventDefault();
	};

	return (
		<>
			{selectedChat ? (
				<>
					<div className='flex justify-between w-full text-2xl md:text-3xl px-4 py-6'>
						<FaArrowLeft
							className='flex md:hidden'
							onClick={() => setSelectedChat('')}
						/>
						{!selectedChat.isGroupChat ? (
							<>
								{getSender(user.account, selectedChat.accounts)}
								<Button
									icons={<FaEyeSlash />}
									className='btn'
									handleClick={() => window.profileModal.showModal()}
								/>

								<ProfileModal
									user={getSenderFull(user.account, selectedChat?.accounts)}
								/>
							</>
						) : (
							<>
								{selectedChat.chatName.toUpperCase()}
								<UpdateGroupModal
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
									fetchMessages={fetchMessages}
								/>
							</>
						)}
					</div>
					<div className='flex flex-col justify-end w-[100%] h-[100%] p-6 bg-slate-300 rounded-lg overflow-y-hidden'>
						{loading ? (
							<Spinner size='loading-lg self-center m-auto' />
						) : (
							<div className='messages'>
								<ScrollableChat messages={messages} />
							</div>
						)}

						<form
							onKeyDown={sendMessage}
							onSubmit={preventReload}
							className='mt-3'
						>
							{isTyping ? <div>Loading....</div> : <></>}
							<input
								className='input input-bordered w-full text-black'
								placeholder='Enter a message'
								onChange={typingHandler}
								value={newMessage || ''}
							/>
						</form>
					</div>
				</>
			) : (
				<div className='flex justify-center items-center'>
					<h1 className='text-4xl font-medium'>
						select user to start a conversation
					</h1>
				</div>
			)}
		</>
	);
}

export default SingleChat;
