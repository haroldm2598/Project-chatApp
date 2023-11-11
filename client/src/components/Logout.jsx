import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ProtectedContext';
import Button from './Button';

function Logout() {
	const { setLoggedIn } = ChatState();
	const navigate = useNavigate();
	const logout = async () => {
		try {
			localStorage.removeItem('token');
			setLoggedIn(undefined);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Button
			name='Logout'
			className='btn btn-outline btn-neutral w-full'
			handleClick={logout}
		/>
	);
}

export default Logout;
