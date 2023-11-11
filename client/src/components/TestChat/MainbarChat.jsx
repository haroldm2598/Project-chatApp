import { ChatState } from '../../context/ProtectedContext';
import SingleChat from './SingleChat';

function MainbarChat({ fetchAgain, setFetchAgain }) {
	const { selectedChat } = ChatState();
	return (
		<div
			className={`${
				selectedChat ? 'flex' : 'hidden md:flex'
			} sidebar w-[100%] md:w-[70%] h-screen flex-col item-center  text-white rounded-md p-2`}
		>
			<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</div>
	);
}

export default MainbarChat;
