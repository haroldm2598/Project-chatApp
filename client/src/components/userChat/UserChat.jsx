import avatar from '../../assets/images/man.png';

function UserChat({ handleClick, user }) {
	return (
		<div
			className='px-5 py-3 flex flex-row justify-center items-center gap-4 bg-slate-400 rounded-md hover:bg-slate-100 transition delay-100 duration-400 ease-in-out'
			onClick={handleClick}
		>
			<img src={avatar} className='w-16 h-16' alt='avatar-icon' />
			<div className='flex-1'>
				<h3>{user.name}</h3>
				<h4>email: {user.email}</h4>
			</div>
		</div>
	);
}

export default UserChat;
