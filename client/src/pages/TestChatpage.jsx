import { useEffect } from 'react';

import { ChatState } from '../context/ProtectedContext';
import Chat from '../components/TestChat/Chat';

function TestChatpage() {
	const { getProtected } = ChatState();

	useEffect(() => {
		getProtected();
	}, []);

	return <>{getProtected && <Chat />}</>;
}

export default TestChatpage;

{
	/* <div className='m-10 text-2xl'>
				{typeof chats === 'undefined' ? (
					<p>Loading....</p>
				) : (
					chats.map((user, index) => (
						<Fragment key={index}>
							<h1>{user.chatName}</h1>
						</Fragment>
					))
				)}
			</div> */
}

{
	/* HINDI SIYA GUMANA YUN getProtected */
}
{
	/* {getProtected && (
				<div className='m-10 text-2xl'>
					{typeof chats === 'undefined' ? (
						<p>Loading....</p>
					) : (
						chats.map((user, index) => (
							<Fragment key={index}>
								<h1>{user.chatName}</h1>
							</Fragment>
						))
					)}
				</div>
			)} */
}
