import React, { FC, useState } from 'react';
// @ts-ignore
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-location';
import fetchResource from '../api/apiWrapper';
import {
	fetchToken,
	fetchUser,
	setErrors,
	startFetching,
	stopFetching,
} from '../store/reducers/AuthenticatedUserSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import Cookies from 'js-cookie';
import { IFetchedTokenFailed, IFetchedTokenSuccess } from '../models/IFetchedData';
import { IUser } from '../models/IUser';
import ModalWindow from '../components/UI/ModalWindow';
import { ModalTypes } from '../utils/modalTypes';
import Loader from '../components/UI/Loader';

export interface IModal {
	type: ModalTypes,
	information: string[]
}

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoading } = useAppSelector(state => state.userReducer);

	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [modal, setModal] = useState<IModal | undefined>(undefined);

	const handleLogin = (e: any) => {
		e.preventDefault();
		dispatch(startFetching());

		fetchResource('login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		}, false)
			.then((res: IFetchedTokenSuccess) => {
				dispatch(fetchToken(res.token));
				Cookies.set('token', res.token);
			})
			.then(fetchUserFn)
			.then(() => navigate({ to: '../account/profile', fromCurrent: true }))
			.catch((error: IFetchedTokenFailed) => {
				dispatch(setErrors(error.message));
				dispatch(stopFetching());
				setModal({ type: ModalTypes.fail, information: [error.message] });
			});
	};

	const fetchUserFn = () => {
		return fetchResource('user', {}, true)
			.then((data: IUser) => {
				dispatch(fetchUser(data));
			})
			.catch(error => {
				dispatch(setErrors(error.toString()));
			})
			.finally(() => dispatch(stopFetching()));
	};

	return (
		<div className={ styles.login_page__wrapper }>
			{
				isLoading ? <Loader/> : false
			}
			{
				modal
					? <ModalWindow type={ modal.type } information={ modal.information } closeHandler={ () => setModal(undefined) }/>
					: false
			}
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