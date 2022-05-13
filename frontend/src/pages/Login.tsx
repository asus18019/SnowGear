import React, { FC } from 'react';
// @ts-ignore
import styles from './Login.module.css';
import { Link } from 'react-location';

const Login: FC = () => {
	const handleLogin = (e: any) => {
		e.preventDefault();
		console.log('Login...');
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
							<input id="email_input" type="email" placeholder="Email" required/>
						</div>
						<label htmlFor="password_input" className={ styles.login__input_title }>Your
							password...</label>
						<div className={ styles.login__input_wrapper }>
							<input id="password_input" type="password" placeholder="Password" required/>
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