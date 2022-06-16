import React, { useState } from 'react';
// @ts-ignore
import styles from './AccountData.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUser, setErrors, stopFetching, userState } from '../../store/reducers/AuthenticatedUserSlice';
import fetchResource from '../../api/apiWrapper';
import { IUser } from '../../models/IUser';
import { IModal } from '../../pages/Login';
import ModalWindow from '../UI/ModalWindow';
import { ModalTypes } from '../../utils/modalTypes';
import { validateBodyObject } from '../../utils/validateBodyObject';
import { handleAgeInput } from '../../utils/inputHandlers';
import { changeLoader } from '../../store/reducers/LoaderSlice';

const AccountData = () => {
	const dispatch = useAppDispatch();
	const userState: userState = useAppSelector(state => state.userReducer);

	const [modal, setModal] = useState<IModal | undefined>(undefined);

	const [email, setEmail] = useState<string>(userState.user?.email || '');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>(userState.user?.name || '');
	const [surname, setSurname] = useState<string>(userState.user?.surname || '');
	const [phone, setPhone] = useState<string>(userState.user?.phone || '380');
	const [age, setAge] = useState<number | undefined>(userState.user?.age || 0);
	const [address, setAddress] = useState<string>(userState.user?.address || '');

	const handlePhoneNumber = (e: string) => {
		if(Number(e.substring(0, 3)) === +380 && e.length <= 12) {
			setPhone(e);
		}
	};

	const handleAge = (e: string) => {
		const age: number | undefined = handleAgeInput(e);
		setAge(age);
	};

	const handleUpdateProfile = () => {
		const fields = {
			name: name === userState.user?.name ? undefined : name,
			surname: surname === userState.user?.surname ? undefined : surname,
			email: email === userState.user?.email ? undefined : email,
			password,
			age: age === userState.user?.age ? undefined : age,
			phone: phone === userState.user?.phone ? undefined : phone,
			address: address === userState.user?.address ? undefined : address
		};

		const body = validateBodyObject(fields);

		if(Object.keys(body).length) {
			dispatch(changeLoader(true));

			fetchResource('user/updateuser', {
				method: 'PUT',
				body: JSON.stringify(body),
			}, true)
				.then(fetchUserFn)
				.catch(e => setModal({ type: ModalTypes.fail, information: [e.message] }))
				.finally(() => dispatch(changeLoader(false)));
		} else {
			console.log('empty body');
		}
	};

	const fetchUserFn = () => {
		return fetchResource('user', {}, true)
			.then((data: IUser[]) => {
				dispatch(fetchUser(data[0]));
				setModal({ type: ModalTypes.success, information: ['Succesfully updated'] });
			})
			.catch(error => {
				dispatch(setErrors(error.toString()));
			})
			.finally(() => dispatch(stopFetching()));
	};

	return (
		<div className={ styles.account_data__wrapper }>
			{
				modal
					? <ModalWindow type={ modal.type } information={ modal.information } closeHandler={ () => setModal(undefined) }/>
					: false
			}
			<h2 className={ styles.component__title }>Account</h2>
			<div className={ styles.line }></div>
			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Email</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ email }
					       onChange={ e => setEmail(e.target.value) } type="email"/>
				</div>
				<p className={ styles.property__subtitle }>You have set your email address to private. To toggle email
					privacy, go to email settings and uncheck "Keep my email address private."</p>
			</div>
			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Password</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } onChange={ e => setPassword(e.target.value) }
					       type="password"/>
				</div>
			</div>
			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Name</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ name }
					       onChange={ e => setName(e.target.value) } type="text"/>
				</div>
				<p className={ styles.property__subtitle }>Your name may appear around GitHub where you contribute or
					are mentioned. You can remove it at any time.</p>
			</div>
			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Surname</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ surname }
					       onChange={ e => setSurname(e.target.value) } type="text"/>
				</div>
			</div>
			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Age</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } value={ age } onChange={ e => handleAge(e.target.value) } type="number"/>
				</div>
			</div>
			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Phone</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } value={ phone ? Number(phone) : undefined }
					       onChange={ e => handlePhoneNumber(e.target.value) } type="number"/>
				</div>
			</div>
			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Location</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ address }
					       onChange={ e => setAddress(e.target.value) } type="text"/>
				</div>
			</div>
			<p className={ styles.property__subtitle }>Please see our privacy statement to learn more about how we use
				this information.</p>
			<div className={ styles.update__profile } onClick={ handleUpdateProfile }>Update profile</div>
		</div>
	);
};

export default AccountData;