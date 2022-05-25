import React from 'react';
// @ts-ignore
import styles from './AccountData.module.css';

const AccountData = () => {
	return (
		<div className={ styles.account_data__wrapper }>
			<h2 className={ styles.component__title }>Account</h2>
			<div className={ styles.line }></div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Email</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue="viktor.volokhan@nure.ua" type="email"/>
				</div>
				<p className={ styles.property__subtitle }>You have set your email address to private. To toggle email privacy, go to email settings and uncheck "Keep my email address private."</p>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Password</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue="Test12345678" type="password"/>
				</div>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Name</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue="Viktor" type="text"/>
				</div>
				<p className={ styles.property__subtitle }>Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.</p>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Surname</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue="Volokhan" type="text"/>
				</div>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Phone</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue="+380503456789" type="text"/>
				</div>
			</div>
			<div className={styles.property__container }>
				<h3 className={ styles.property__title }>Location</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } defaultValue="Ukraine" type="text"/>
				</div>
			</div>
			<p className={ styles.property__subtitle }>All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our privacy statement to learn more about how we use this information.</p>
			<div className={ styles.update__profile }>Update profile</div>
		</div>
	);
};

export default AccountData;