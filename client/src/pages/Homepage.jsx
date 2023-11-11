import { useRef } from 'react';
import Imgsrc1 from '../assets/images/Chat-cuate.png';
import Imgsrc2 from '../assets/images/Tablet-login-amico.png';
import Login from '../components/Login';

function Homepage() {
	const ref = useRef(null);

	const handleClick = () => {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<>
			<div className='homepage md:px-auto py-10 min-h-full md:h-[50rem] flex flex-col md:flex-row md:flex-wrap md:justify-center'>
				<div className='md:w-[50rem] order-1 md:order-2'>
					<img
						src={Imgsrc1}
						alt='image homepage'
						className='w-full md:h-[40rem] object-contain'
					/>
				</div>

				<div className='mx-5 [&>*]:my-2 md:[&>*]:my-4 md:my-auto md:w-[40rem] md:px-40 flex flex-col items-center order-2 md:order-1'>
					<h1 className='text-3xl md:text-5xl font-medium'>Message app</h1>
					<p className='text-xl md:text-3xl'>
						let’s you connect to the real world and friends
					</p>
					<button
						className='button w-96 md:h-16 btn btn-outline text-white md:text-xl'
						onClick={handleClick}
					>
						Get started
					</button>
				</div>
			</div>

			<div
				className='homepage h-full md:h-[50rem] md:px-10 flex flex-col md:flex-row md:items-center md:gap-4'
				ref={ref}
			>
				<Login imgSrc={Imgsrc2} />
			</div>
		</>
	);
}

export default Homepage;
