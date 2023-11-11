import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements
} from 'react-router-dom';
// LAYOUT
import RootLayout from './layout/RootLayout';
// PAGES
import './assets/styles/index.scss';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import TestChatpage from './pages/TestChatpage';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Homepage />} />
				<Route path='register' element={<Register />} />
				<Route path='chat' element={<TestChatpage />} />
			</Route>
		)
	);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
