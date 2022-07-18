import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-location';
import styles from './Registration.module.css';
import fetchResource from '../api/apiWrapper';
import { IModal } from './Login';
import { ModalTypes, validateBodyObject, handleAgeInput } from '../utils';
import { ModalWindow, Loader } from '../components/UI';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { changeLoader } from '../store';

const Registration: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [surname, setSurname] = useState<string>('');
	const [phone, setPhone] = useState<number>(+380);
	const [age, setAge] = useState<number | undefined>(undefined);
	const [address, setAddress] = useState<string>('');

	const [modal, setModal] = useState<IModal | undefined>(undefined);
	const { isLoading } = useAppSelector(state => state.loaderReducer);

	const handlePhoneNumber = (e: string) => {
		if(Number(e.substring(0, 3)) === +380 && e.length <= 12) {
			setPhone(Number(e));
		}
	};

	const handleAge = (e: string) => {
		const age: number | undefined = handleAgeInput(e);
		setAge(age);
	};

	const handleRegistration = (e: any) => {
		e.preventDefault();
		dispatch(changeLoader(true));

		const fields = { name, surname, email, password, age: age ? age.toString() : 0, phone: phone.toString(), address };
		const body = validateBodyObject(fields);

		fetchResource('register', {
			method: 'POST',
			body: JSON.stringify(body),
		}, false)
			.then(() => navigate({ to: '../login', fromCurrent: true }))
			.catch(e => setModal({ type: ModalTypes.fail, information: [e.message] }))
			.finally(() => dispatch(changeLoader(false)));
	};

	return (
		<div className={ styles.registration_page__wrapper }>
			{
				isLoading ? <Loader/> : false
			}
			{
				modal
					? <ModalWindow type={ modal.type } information={ modal.information } closeHandler={ () => setModal(undefined) }/>
					: false
			}
			<div className={ styles.registration }>
				<h1 className={ styles.registration__title }>Sign up</h1>

				<form onSubmit={ e => handleRegistration(e) }>
					<div className={ styles.registration__credentials }>
						<label htmlFor="email_input" className={ styles.registration__input_title }>Your
							email...</label>
						<div className={ styles.registration__input_wrapper }>
							<input id="email_input" onChange={ e => setEmail(e.target.value) } type="email" placeholder="Email" required/>
						</div>
						<label htmlFor="password_input" className={ styles.registration__input_title }>Your
							password...</label>
						<div className={ styles.registration__input_wrapper }>
							<input id="password_input" onChange={ e => setPassword(e.target.value) } type="password" placeholder="Password" required/>
						</div>
					</div>

					<div className={ styles.registration__name }>
						<div className={ styles.registration__container }>
							<label htmlFor="password_input" className={ styles.registration__input_title }>Your
								name...</label>
							<div
								className={ `${ styles.registration__input_wrapper } ${ styles.registration__small_input }` }>
								<input id="password_input" onChange={ e => setName(e.target.value) } type="text" placeholder="Name"/>
							</div>
						</div>
						<div className={ styles.registration__container }>
							<label htmlFor="password_input" className={ styles.registration__input_title }>Your
								surname...</label>
							<div
								className={ `${ styles.registration__input_wrapper } ${ styles.registration__small_input }` }>
								<input id="password_input" onChange={ e => setSurname(e.target.value) } type="text" placeholder="Surname"/>
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
							<input id="email_input" onChange={ e => setAddress(e.target.value) } type="text" placeholder="Address"/>
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