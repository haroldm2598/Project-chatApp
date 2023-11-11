import { FaMagnifyingGlass } from 'react-icons/fa6';
import Button from '../Button';
import SearchModal from '../TestChat/SearchModal';
// OLD SEARCH BUTTON NOW BACK UP ONLY
function SearchButton() {
	return (
		<>
			<Button
				icons={<FaMagnifyingGlass />}
				name='Search'
				className='btn btn-outline text-white'
				handleClick={() => window.searchModal.showModal()}
			/>

			<SearchModal />
		</>
	);
}

export default SearchButton;

// <dialog id='searchModal' className='modal '>
// 	<div className='modal-box h-screen text-black flex flex-col gap-5 absolute top-0 left-0 rounded-none'>
// 		<h1 className='text-3xl font-medium'>Search Users</h1>

// 		<hr />

// 		<div className='join'>
// 			<input
// 				type='text'
// 				className='input input-bordered join-item flex-1'
// 				placeholder='search....'
// 			/>
// 			<button className='btn join-item'>Go</button>
// 		</div>

// 		<div className='px-5 py-3 flex flex-row justify-center items-center gap-4 bg-slate-400 rounded-md'>
// 			<img src={avatar} className='w-16 h-16' alt='avatar-icon' />
// 			<div className='flex-1'>
// 				<h3>person name</h3>
// 				<h4>email: email address</h4>
// 			</div>
// 		</div>

// 		<div className='px-5 py-3 flex flex-row justify-center items-center gap-4 bg-slate-400 rounded-md'>
// 			<img src={avatar} className='w-16 h-16' alt='avatar-icon' />
// 			<div className='flex-1'>
// 				<h3>person name</h3>
// 				<h4>email: email address</h4>
// 			</div>
// 		</div>
// 	</div>
// 	<form method='dialog' className='modal-backdrop'>
// 		<button>close</button>
// 	</form>
// </dialog>
