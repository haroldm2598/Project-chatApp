import { useState } from 'react';

import SidebarChat from './SidebarChat';
import MainbarChat from './MainbarChat';

function Chat() {
	const [fetchAgain, setFetchAgain] = useState(false);

	return (
		<div className='homepage p-10 flex flex-row gap-4'>
			<SidebarChat fetchAgain={fetchAgain} />
			<MainbarChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</div>
	);
}

export default Chat;

{
	/* 
	import { useNavigate } from 'react-router-dom';
	import Axios from 'axios';

	const [chats, setChats] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				// const response = await axios.get('http://localhost:3000/api/chat');
				const token = localStorage.getItem('token');
				const response = await Axios({
					method: 'GET',
					url: 'http://localhost:3000/api/chat/find',
					headers: { Authorization: token },
					withCredentials: true
				});

				setChats(response.data);
				navigate('/chat');
			} catch (err) {
				console.log(err);
				navigate('/');
			}
		};

		fetchData();
	}, [navigate]);

	// JSX
	{typeof chats === 'undefined' ? (
				<p>Loading....</p>
			) : (
				chats.map((user, index) => (
					<Fragment key={index}>
						<h1>{user.chatName}</h1>
					</Fragment>
				))
			)} */
}
