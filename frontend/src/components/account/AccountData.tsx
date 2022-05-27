import React from 'react';
// @ts-ignore
import styles from './AccountData.module.css';
import { useAppSelector } from '../../hooks/redux';
import { userState } from '../../store/reducers/AuthenticatedUserSlice';

const AccountData = () => {
	const userState: userState = useAppSelector(state => state.userReducer);

	return (
		<div className={ styles.account_data__wrapper }>
			<h2 className={ styles.component__title }>Account</h2>
			<div className={ styles.line }></div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Email</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ userState.user?.email } type="email"/>
				</div>
				<p className={ styles.property__subtitle }>You have set your email address to private. To toggle email privacy, go to email settings and uncheck "Keep my email address private."</p>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Password</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } type="password"/>
				</div>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Name</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ userState.user?.name } type="text"/>
				</div>
				<p className={ styles.property__subtitle }>Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.</p>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Surname</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ userState.user?.surname } type="text"/>
				</div>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Phone</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ userState.user?.phone ? `+${ userState.user?.phone }`: undefined } type="text"/>
				</div>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Location</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue={ userState.user?.address } type="text"/>
				</div>
			</div>
			<p className={ styles.property__subtitle }>Please see our privacy statement to learn more about how we use this information.</p>
			<div className={ styles.update__profile }>Update profile</div>
		</div>
	);
};

export default AccountData;