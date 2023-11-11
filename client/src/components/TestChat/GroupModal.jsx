import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Axios from 'axios';

import { ChatState } from '../../context/ProtectedContext';

import avatar from '../../assets/images/man.png';

import Spinner from '../animation/Spinner';
import Button from '../Button';

function GroupModal() {
	const [groupChatName, setGroupChatName] = useState();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const { chats, setChats } = ChatState();
	// user.account.id kailangan makasama to para kasama sa groupchat
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

	const addUser = (userId) => {
		if (selectedUsers.includes(userId)) {
			return;
		}
		setSelectedUsers([...selectedUsers, userId]);
	};

	const deleteUser = (userId) => {
		setSelectedUsers(selectedUsers.filter((user) => user._id !== userId._id));
	};

	const handleSubmit = async () => {
		if (!groupChatName || !selectedUsers) {
			return;
		}

		try {
			const token = localStorage.getItem('token');
			const { data } = await Axios({
				method: 'POST',
				url: `http://localhost:3000/api/chat/group`,
				headers: { Authorization: token },
				data: {
					name: groupChatName,
					users: JSON.stringify(selectedUsers.map((u) => u?._id))
				},
				withCredentials: true
			});

			setChats([data, ...chats]);
			console.log(selectedUsers);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<dialog id='groupModal' className='modal '>
			<div className='modal-box flex flex-col items-center gap-4'>
				<h1 className='text-4xl'>Create Group Chat</h1>
				<input
					type='text'
					className='input input-bordered w-full'
					placeholder='Group name.....'
					onChange={(e) => setGroupChatName(e.target.value)}
				/>
				<input
					type='text'
					className='input input-bordered w-full'
					placeholder='Add Person.....'
					onChange={(e) => handleSearch(e.target.value)}
				/>
				<div className='flex flex-row self-start gap-2'>
					{selectedUsers.map((user, index) => (
						<div
							className='bg-slate-400 px-4 py-2 rounded-md flex flex-row items-center justify-center gap-2'
							key={index}
						>
							<h6>{user.name}</h6>
							<FaTimes onClick={() => deleteUser(user)} />
						</div>
					))}
				</div>
				{loading ? (
					<Spinner />
				) : (
					searchResult.map((user, index) => (
						<div
							key={index}
							className='w-full px-5 py-3 flex flex-row justify-center items-center gap-4 bg-slate-400 rounded-md'
							onClick={() => addUser(user)}
						>
							<img src={avatar} className='w-16 h-16' alt='avatar-icon' />
							<div className='flex-1'>
								<h3>{user.name}</h3>
								<h4>email: {user.email}</h4>
							</div>
						</div>
					))
				)}

				<Button
					name='create group'
					className='btn btn-primary self-end'
					handleClick={handleSubmit}
				/>

				{/* <Button
					name='testing add'
					className='btn btn-primary self-start'
					handleClick={testingOnly}
				/> */}
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}

export default GroupModal;
