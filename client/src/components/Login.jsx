import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Button from './Button';

function Login(props) {
	const { imgSrc } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const submit = async () => {
		try {
			const user = await Axios({
				method: 'POST',
				data: {
					email: email,
					password: password
				},
				withCredentials: true,
				url: 'http://localhost:3000/api/account/login'
			});
			localStorage.setItem('token', user.data.token);
			navigate('/chat');
		} catch (err) {
			console.log(err);
			navigate('/');
		}
	};

	const register = () => {
		navigate('/register');
	};
	return (
		<>
			<div className='w-[100%]'>
				<img src={imgSrc} alt='image homepage' className='w-full' />
			</div>

			<div className='login w-full min-h-16 md:h-96 md:rounded-lg p-10 md:mx-auto [&>*]:mb-5'>
				<input
					className='w-full h-12 pl-2 text-2xl font-medium rounded-lg'
					type='text'
					placeholder='Email address'
					name='email'
					id='emailLogin'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className='w-full h-12 pl-2 text-2xl font-medium rounded-lg'
					type='password'
					placeholder='Password'
					name='password'
					id='passwordLogin'
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					name='Login'
					className='w-full btn btn-outline text-white text-xl'
					handleClick={submit}
				/>

				<hr />

				<Button
					name='Create an account'
					className='w-full btn btn-outline text-white text-xl'
					handleClick={register}
				/>
			</div>
		</>
	);
}

export default Login;
