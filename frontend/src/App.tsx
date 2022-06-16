import React, { useEffect, useState } from 'react';
import { Router, Outlet } from 'react-location';
import Cookies from 'js-cookie';
import './App.css';
import { useAppDispatch } from './hooks/redux';
import { fetchUser, setErrors } from './store/reducers/AuthenticatedUserSlice';
import { routes, location } from './router/router';
import Navbar from './components/Navbar';
import fetchResource from './api/apiWrapper';
import { IUser } from './models/IUser';

function App() {
	const dispatch = useAppDispatch();
	const [isPreLoading, setIsPreLoading] = useState<boolean>(true);

	useEffect(() => {
		const token: string | undefined = Cookies.get('token');
		if(token) {
			fetchResource('user', {}, true)
				.then(data => {
					dispatch(fetchUser(data[0]));
				})
				.catch(error => {
					dispatch(setErrors(error.toString()));
				})
				.finally(() => {
					setIsPreLoading(false);
				});
		} else {
			setIsPreLoading(false);
		}
	}, []);

	return (
		<Router routes={ routes } location={ location }>
			{ isPreLoading
				? <div>Loading...</div>
				: <>
					<Navbar />
					<Outlet />
				</>
			}

		</Router>
	);
}

export default App;
