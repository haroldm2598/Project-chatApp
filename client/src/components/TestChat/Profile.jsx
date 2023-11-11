import { ChatState } from '../../context/ProtectedContext';
import Logout from '../Logout';

function Profile() {
	const { user } = ChatState();

	return (
		// <ul className='menu w-56 rounded-box'>
		// 	<li>
		// 		<details>
		// 			<summary>Profile</summary>
		// 			<ul className='flex flex-col items-center gap-4'>
		// 				<li>{user.account.name}</li>
		// 				<li>
		// 					<Logout />
		// 				</li>
		// 			</ul>
		// 		</details>
		// 	</li>
		// </ul>
		<details className='dropdown dropdown-end'>
			<summary tabIndex={0} className='btn m-1'>
				Profile
			</summary>
			<ul
				tabIndex={0}
				className='dropdown-content z-[1] p-2 w-52 [&>*]:mb-2 bg-base-100 flex flex-col shadow rounded-box '
			>
				<li>
					<h3 className='text-black'>{user.account.name}</h3>
				</li>
				<li>
					<Logout />
				</li>
			</ul>
		</details>
	);
}

export default Profile;
