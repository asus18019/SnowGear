import React, { FC } from 'react';
import { Link } from 'react-location';
// @ts-ignore
import styles from './Navbar.module.css'; // Todo fix import

const Basket: FC = () => {
	return (
		<div className={ styles.navbar }>
			<Link className={styles.link } to="/">
				<img className={ styles.logo } src="../assets/logo.png" alt="SnowGear"/>
			</Link>
			<Link className={ styles.link } to="/">Main</Link>
			<Link className={ styles.link } to="/shop">Shop</Link>
			<Link className={ styles.link } to="/contacts">Contacts</Link>
			<Link className={ styles.link } to="/basket">Basket</Link>
		</div>
	);
};

export default Basket;