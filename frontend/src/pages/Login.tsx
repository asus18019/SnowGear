import React, { FC, useState } from 'react';
// @ts-ignore
import styles from './Login.module.css';
import { Link } from 'react-location';
import fetchResource from '../api/apiWrapper';
import { fetchToken, fetchUser, setErrors, startFetching } from '../store/reducers/AuthenticatedUserSlice';
import { useAppDispatch } from '../hooks/redux';
import { IFetchedTokenFailed, IFetchedTokenSuccess } from '../models/IFetchedData';
// @ts-ignore
import Cookies from 'js-cookie';
import { IUser } from '../models/IUser';

const Login: FC = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();

	const handleLogin = (e: any) => {
		e.preventDefault();
		dispatch(startFetching());
		Cookies.remove('token')

		fetchResource('login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		}, false)
			.then(async (res: IFetchedTokenSuccess) => {
				dispatch(fetchToken(res.token));
				Cookies.set('token', res.token);

				dispatch(startFetching());
				fetchResource('user', {}, true)
					.then((data: IUser) => {
						dispatch(fetchUser(data));
					}).catch(error => {
						dispatch(setErrors(error.toString()));
					});

			})
			.catch((error: IFetchedTokenFailed) => {
				dispatch(setErrors(error.message));
			});
	};

	return (
		<div className={ styles.login_page__wrapper }>
			<div className={ styles.login }>
				<h1 className={ styles.login__title }>Log in</h1>

				<form onSubmit={ e => handleLogin(e) }>
					<div className={ styles.login__credentials }>
						<label htmlFor="email_input" className={ styles.login__input_title }>Your
							email...</label>
						<div className={ styles.login__input_wrapper }>
							<input
								id="email_input"
								type="email"
								placeholder="Email"
								onChange={ e => setEmail(e.target.value) }
								required
							/>
						</div>
						<label htmlFor="password_input" className={ styles.login__input_title }>Your
							password...</label>
						<div className={ styles.login__input_wrapper }>
							<input
								id="password_input"
								type="password"
								placeholder="Password"
								onChange={ e => setPassword(e.target.value) }
								required
							/>
						</div>
					</div>

					<button className={ styles.login__submit }>Submit</button>

					<div className={ styles.login__to_registration_wrapper }>
						<h3 className={ styles.login__to_registration }>Don`t have an account?
							<Link className={ styles.login_link } to="/registration">Sign up</Link>
						</h3>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;