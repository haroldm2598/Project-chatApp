import { Fragment, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Axios from 'axios';

import { ChatState } from '../../context/ProtectedContext';
import UserChat from '../userChat/UserChat';

function SearchModal() {
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState(false);

	const { chats, setChats, setSelectedChat } = ChatState();

	const handleClick = async () => {
		setLoading(true);
		try {
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

	const accessChat = async (userId) => {
		try {
			setLoadingChat(true);

			const token = localStorage.getItem('token');
			const { data } = await Axios({
				method: 'POST',
				url: `http://localhost:3000/api/chat/`,
				headers: { 'Content-Type': 'application/json', 'Authorization': token },
				data: {
					userId: userId
				},
				withCredentials: true
			});

			if (!chats.find((c) => c._id === data._id)) {
				setChats([data, ...chats]);
			}

			setSelectedChat(data);
			setLoadingChat(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='drawer'>
			<input id='my-drawer' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				{/* Page content here */}
				<label
					htmlFor='my-drawer'
					className='btn btn-outline text-white drawer-button'
				>
					<FaMagnifyingGlass /> Open drawer
				</label>
			</div>
			<div className='drawer-side'>
				<label
					htmlFor='my-drawer'
					aria-label='close sidebar'
					className='drawer-overlay'
				></label>
				<div className='menu p-4 w-96 min-h-full flex flex-col gap-5 bg-base-200 text-base-content'>
					{/* Sidebar content here */}
					<h1 className='text-3xl font-medium'>Search Users</h1>

					<hr />

					<div className='join'>
						<input
							type='text'
							className='input input-bordered join-item flex-1'
							placeholder='search....'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button className='btn join-item' onClick={handleClick}>
							Go
						</button>
					</div>

					{loading ? (
						<span className='loading loading-dots loading-md'></span>
					) : (
						searchResult.map((user, index) => (
							<Fragment key={index}>
								<UserChat
									user={user}
									handleClick={() => accessChat(user._id)}
								/>
							</Fragment>
						))
					)}

					{loadingChat && (
						<span className='loading loading-dots loading-md'></span>
					)}
				</div>
			</div>
		</div>
	);
}

export default SearchModal;
