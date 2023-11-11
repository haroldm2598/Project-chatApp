import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import Axios from 'axios';

import avatar from '../../assets/images/man.png';
import { ChatState } from '../../context/ProtectedContext';

import Button from '../Button';

function UpdateGroupModal({ fetchAgain, setFetchAgain, fetchMessages }) {
	const [groupChatName, setGroupChatName] = useState();
	const [search, setSearch] = useState();
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [renameLoading, setRenameLoading] = useState(false);
	const { selectedChat, setSelectedChat, user } = ChatState();
	// gawa ka ng state saan mag error kapag hindi admin yun mag command and pakita mo sa UI

	const handleRename = async () => {
		if (!groupChatName) return;

		try {
			setRenameLoading(true);
			const token = localStorage.getItem('token');
			const { data } = await Axios({
				method: 'PUT',
				url: `http://localhost:3000/api/chat/rename`,
				headers: { Authorization: token },
				data: {
					chatId: selectedChat._id,
					chatName: groupChatName
				},
				withCredentials: true
			});

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);
		} catch (err) {
			console.log(err);
			setRenameLoading(false);
		}

		setGroupChatName('');
	};

	const handleSearch = async (query) => {
		setSearch(query);
		if (!query) return;

		try {
			setLoading(true);
			const token = localStorage.getItem('token');
			const { data } = await Axios({
				method: 'GET',
				url: `http://localhost:3000/api/account/s?search=${search}`,
				headers: { Authorization: token },
				withCredentials: true
			});

			setLoading(false);
			setSearchResult(data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddUser = async (addUser) => {
		if (selectedChat.accounts.find((u) => u._id === addUser._id))
			return console.log('user is already in the group');

		if (selectedChat.groupAdmin._id !== user.account.id) {
			console.log('only admin can add a person in a group');
		} else {
			console.log(addUser);
		}

		try {
			setLoading(true);
			const token = localStorage.getItem('token');
			const { data } = await Axios({
				method: 'PUT',
				url: `http://localhost:3000/api/chat/groupadd`,
				headers: { Authorization: token },
				data: {
					chatId: selectedChat._id,
					userId: addUser._id
				},
				withCredentials: true
			});

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const handleRemove = async (removeUser) => {
		if (
			selectedChat.groupAdmin._id !== user.account.id &&
			removeUser._id !== user.account.id
		) {
			console.log('Only admin can remove person');
		}

		try {
			setLoading(true);
			const token = localStorage.getItem('token');
			const { data } = await Axios({
				method: 'PUT',
				url: `http://localhost:3000/api/chat/groupremove`,
				headers: { Authorization: token },
				data: {
					chatId: selectedChat._id,
					userId: removeUser._id
				},
				withCredentials: true
			});

			removeUser?._id === user.account.id || removeUser?.id === user.account.id
				? setSelectedChat()
				: setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			fetchMessages();
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<>
			<Button
				icons={<FaEyeSlash />}
				className='btn'
				handleClick={() => window.profileModal.showModal()}
			/>
			<dialog id='profileModal' className='modal'>
				<div className='modal-box text-black flex flex-col gap-4'>
					<h3 className='font-semibold text-2xl flex justify-center'>
						{selectedChat.chatName}
					</h3>

					<div className='flex flex-row self-start gap-2 h-[2.5rem]'>
						{selectedChat.accounts.map((user, index) => (
							<div
								className='bg-slate-400 px-4 py-2 h-[100%] rounded-md flex flex-row items-center justify-center gap-2'
								key={index}
							>
								<h6 className='text-sm'>{user.name}</h6>
								<FaTimes
									className='text-sm'
									onClick={() => handleRemove(user)}
								/>
							</div>
						))}
					</div>

					<div className='join w-full'>
						<input
							type='text'
							className='input input-bordered join-item flex-1'
							placeholder='Rename Group Chat'
							onChange={(e) => setGroupChatName(e.target.value)}
						/>
						<Button
							name={renameLoading ? ' ' : 'update'}
							className={`${
								renameLoading
									? 'loading loading-dots loading-md'
									: 'btn join-item'
							}  `}
							handleClick={handleRename}
						/>
					</div>

					<input
						type='text'
						className='input input-bordered w-full'
						placeholder='Add Person.....'
						onChange={(e) => handleSearch(e.target.value)}
					/>

					{loading ? (
						<span className='loading loading-dots loading-md'></span>
					) : (
						searchResult.map((user, index) => (
							<div
								key={index}
								className='w-full px-5 py-3 flex flex-row justify-center items-center gap-4 bg-slate-400 rounded-md'
								onClick={() => handleAddUser(user)}
							>
								<img src={avatar} className='w-16 h-16' alt='avatar-icon' />
								<div className='flex-1'>
									<h3 className='text-sm font-medium'>{user.name}</h3>
									<h4 className='text-sm font-medium'>email: {user.email}</h4>
								</div>
							</div>
						))
					)}
					{/* leave group having a bug where can't leave if the admin is targeted */}
					<Button
						name='Leave group'
						className='btn btn-error self-end'
						handleClick={() => handleRemove(user.account)}
					/>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default UpdateGroupModal;
