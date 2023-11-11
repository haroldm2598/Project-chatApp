function ProfileModal({ user }) {
	return (
		<>
			<dialog id='profileModal' className='modal'>
				<div className='modal-box text-black'>
					<h3 className='font-bold text-lg'>Name: {user.name}</h3>
					<h3 className='font-bold text-lg'>Email: {user.email}</h3>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ProfileModal;
