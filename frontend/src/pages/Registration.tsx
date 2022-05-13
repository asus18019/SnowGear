import React, { FC, useState } from 'react';
// @ts-ignore
import styles from './Registration.module.css';
import { Link } from 'react-location';

const Registration: FC = () => {
	const [phone, setPhone] = useState<number>(+380);
	const [age, setAge] = useState<number | undefined>(0);

	const handlePhoneNumber = (e: string) => {
		if(Number(e.substring(0, 3)) === +380 && e.length <= 12) {
			setPhone(Number(e));
		}
	};

	const handleAge = (e: string) => {
		const age: number = Number(e);
		if(age >= 1 && age <= 99) {
			setAge(age);
		} else if(e === '') {
			setAge(undefined);
		}
	};

	const handleRegistration = (e: any) => {
		e.preventDefault();
		console.log('Registration...');
	};

	return (
		<div className={ styles.registration_page__wrapper }>
			<div className={ styles.registration }>
				<h1 className={ styles.registration__title }>Sign up</h1>

				<form onSubmit={ e => handleRegistration(e) }>
					<div className={ styles.registration__credentials }>
						<label htmlFor="email_input" className={ styles.registration__input_title }>Your
							email...</label>
						<div className={ styles.registration__input_wrapper }>
							<input id="email_input" type="email" placeholder="Email" required/>
						</div>
						<label htmlFor="password_input" className={ styles.registration__input_title }>Your
							password...</label>
						<div className={ styles.registration__input_wrapper }>
							<input id="password_input" type="password" placeholder="Password" required/>
						</div>
					</div>

					<div className={ styles.registration__name }>
						<div className={ styles.registration__container }>
							<label htmlFor="password_input" className={ styles.registration__input_title }>Your
								name...</label>
							<div
								className={ `${ styles.registration__input_wrapper } ${ styles.registration__small_input }` }>
								<input id="password_input" type="text" placeholder="Name"/>
							</div>
						</div>
						<div className={ styles.registration__container }>
							<label htmlFor="password_input" className={ styles.registration__input_title }>Your
								name...</label>
							<div
								className={ `${ styles.registration__input_wrapper } ${ styles.registration__small_input }` }>
								<input id="password_input" type="text" placeholder="Name"/>
							</div>
						</div>
					</div>

					<div className={ styles.registration__name }>
						<div className={ styles.registration__container }>
							<label htmlFor="password_input" className={ styles.registration__input_title }>Your
								phone...</label>
							<div className={ `${ styles.registration__input_wrapper }` }>
								<input id="password_input"
								       value={ phone }
								       type="number"
								       placeholder="Phone"
								       onChange={ e => handlePhoneNumber(e.target.value) }
								/>
							</div>
						</div>
						<div className={ styles.registration__container }>
							<label htmlFor="password_input" className={ styles.registration__input_title }>Your
								age...</label>
							<div
								className={ `${ styles.registration__input_wrapper } ${ styles.registration__age_input }` }>
								<input
									id="password_input"
									type="number"
									placeholder="Age"
									value={ age ? age : undefined }
									onChange={ e => handleAge(e.target.value) }
								/>
							</div>
						</div>
					</div>
					<div className={ styles.registration__address_container }>
						<label htmlFor="email_input" className={ styles.registration__input_title }>Your
							address...</label>
						<div className={ styles.registration__input_wrapper }>
							<input id="email_input" type="text" placeholder="Address"/>
						</div>
					</div>
					<button className={ styles.registration__submit }>Submit</button>
				</form>
				<div className={ styles.registration__to_login_wrapper }>
					<h3 className={ styles.registration__to_login }>Already have an account?
						<Link className={ styles.registration__link } to="/login">Log in</Link>
					</h3>
				</div>
			</div>
		</div>
	);
};

export default Registration;