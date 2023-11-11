import Axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const ProtectedContext = createContext();

export function ProtectedContextProvider({ children }) {
	const [loggedIn, setLoggedIn] = useState(undefined);
	const [selectedChat, setSelectedChat] = useState();
	const [user, setUser] = useState();
	const [notification, setNotification] = useState([]);
	const [chats, setChats] = useState([]);

	const getProtected = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await Axios({
				method: 'GET',
				url: 'http://localhost:3000/api/account/protected',
				headers: { Authorization: token },
				withCredentials: true
			});

			setUser(response.data);
			setLoggedIn(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (loggedIn) {
			getProtected();
		}
		return;
	}, []);
	return (
		<ProtectedContext.Provider
			value={{
				user,
				notification,
				setNotification,
				chats,
				setChats,
				selectedChat,
				setSelectedChat,
				loggedIn,
				setLoggedIn,
				getProtected
			}}
		>
			{children}
		</ProtectedContext.Provider>
	);
}

export const ChatState = () => {
	return useContext(ProtectedContext);
};
