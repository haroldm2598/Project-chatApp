import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import ImgSrc from '../assets/images/Tablet-login-amico.png';
import Button from '../components/Button';

function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const submit = async () => {
		try {
			const { data } = await Axios({
				method: 'POST',
				url: 'http://localhost:3000/api/account/register',
				data: {
					email: email,
					name: name,
					password: password
				},
				withCredentials: true
			});

			console.log(data);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='homepage h-full md:h-[50rem] md:px-10 flex flex-col md:flex-row md:items-center md:gap-4'>
			<div className='w-[100%]'>
				<img src={ImgSrc} alt='image homepage' className='w-full' />
			</div>

			<div className='login w-full min-h-16 md:h-96 md:rounded-lg p-10 md:mx-auto [&>*]:mb-5'>
				<input
					className='w-full h-12 pl-2 text-2xl font-medium rounded-lg'
					placeholder='Name'
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className='w-full h-12 pl-2 text-2xl font-medium rounded-lg'
					placeholder='Email address'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className='w-full h-12 pl-2 text-2xl font-medium rounded-lg'
					placeholder='Password'
					type='password'
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					name='Register'
					className='w-full btn btn-outline text-white text-xl'
					handleClick={submit}
				/>
			</div>
		</div>
	);
}

export default Register;
