import ScrollableFeed from 'react-scrollable-feed';

import {
	isLastMessage,
	isSameSender,
	isSameSenderMargin,
	isSameUser
} from '../../config/ChatConfig';

import { ChatState } from '../../context/ProtectedContext';
import avatar from '../../assets/images/man.png';

function ScrollableChat({ messages }) {
	const { user } = ChatState();

	return (
		<ScrollableFeed>
			{messages &&
				messages.map((m, index) => (
					<div key={m._id} className='flex '>
						{isSameSender(messages, m, index, user?.account?.id) ||
							(isLastMessage(messages, index, user?.account?.id) && (
								<div className='avatar mt-3 mr-1'>
									<div className='w-10 h-10 rounded-full'>
										<img src={avatar} alt={m.sender.name} />
									</div>
								</div>
							))}

						<span
							className={`rounded-lg py-2 px-4 max-w-[75%] ${
								m.sender._id === user?.account?.id ? 'bg-orange-300' : 'person2'
							}  `}
							style={{
								marginLeft: isSameSenderMargin(
									messages,
									m,
									index,
									user?.account?.id
								),
								marginTop: isSameUser(messages, m, index, user?.account?.id)
									? 3
									: 10
							}}
						>
							{m.content}
						</span>
					</div>
				))}
		</ScrollableFeed>
	);
}

export default ScrollableChat;

// ml-[${isSameSenderMargin(
// 	messages,
// 	m,
// 	index,
// 	user?.account?.id
// )}]

// mt-${
// 	isSameUser(messages, m, index, user?.account?.id) ? '3' : '10'
// }
