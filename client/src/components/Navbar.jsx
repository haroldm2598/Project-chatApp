import { ChatState } from '../context/ProtectedContext';
import Profile from './TestChat/Profile';

import SearchModal from './TestChat/SearchModal';

function Navbar() {
	const { loggedIn } = ChatState();

	return (
		<nav className='header__navbar w-full h-16 md:h-20 px-5 md:px-10 flex items-center'>
			{loggedIn === undefined || loggedIn === false ? (
				<h1 className='text-4xl font-medium text-white'>Message App</h1>
			) : (
				<ul className='w-[100%] flex flex-row justify-between items-center text-2xl text-white'>
					<li className='flex flex-row items-center [&>*]:mr-4'>
						<SearchModal />
					</li>
					<li className='text 2-xl md:text-4xl font-medium'>Message App</li>
					<li>
						<Profile />
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navbar;
