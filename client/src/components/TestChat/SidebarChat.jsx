import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Axios from 'axios';

import { ChatState } from '../../context/ProtectedContext';

import Button from '../Button';
import GroupModal from './GroupModal';
import { getSender } from '../../config/ChatConfig';

function SidebarChat({ fetchAgain }) {
	const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

	const fetchChats = async () => {
		try {
			const token = localStorage.getItem('token');
			const { data } = await Axios({
				method: 'GET',
				url: `http://localhost:3000/api/chat/`,
				headers: { Authorization: token }
				// withCredentials: true
			});

			setChats(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchChats();
	}, [fetchAgain]);

	return (
		<div
			className={`${
				selectedChat ? 'hidden md:block' : 'block'
			} sidebar w-[100%] md:w-[30%] h-screen p-4 rounded-md`}
		>
			<div className='mb-4 flex flex-row items-center justify-between'>
				<h1 className='text-3xl font-medium text-white'>Chats</h1>
				<Button
					name='New Group Chat'
					icons={<FaPlus />}
					className='btn '
					handleClick={() => window.groupModal.showModal()}
				/>
			</div>

			{chats ? (
				chats.map((chat) => (
					<div
						key={chat._id}
						className={`mb-2 p-2 flex flex-col rounded-md ${
							selectedChat === chat ? 'bg-slate-400 text-white' : 'bg-white'
						}`}
						onClick={() => setSelectedChat(chat)}
					>
						<h3>
							{!chat.isGroupChat
								? getSender(user?.account, chat?.accounts)
								: chat?.chatName}
						</h3>
						<h4>Last message sender: Wala pa</h4>
					</div>
				))
			) : (
				<span className='loading loading-dots loading-md'></span>
			)}

			<GroupModal />
		</div>
	);
}

export default SidebarChat;
