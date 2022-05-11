import React, { FC, useState } from 'react';
import { Link } from 'react-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import styles from './Navbar.module.css'; // Todo fix import

const Navbar: FC = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className={ styles.navbar }>
			<div className={ styles.logo__container }>
				<Link className={ styles.link } to="/">
					<img className={ styles.logo } src="../assets/logo.png" alt="SnowGear"/>
				</Link>
				<FontAwesomeIcon
					className={ styles.menu__mobile_icon }
					icon={ faBars }
					onClick={ toggleMenu }
				/>
			</div>
			<div className={ `${ styles.link__wrapper } ${ showMenu ? styles.link__wrapper_mobile : false }` }>
				<Link className={ styles.link } to="/" onClick={ toggleMenu }>Main</Link>
				<Link className={ styles.link } to="/shop" onClick={ toggleMenu }>Shop</Link>
				<Link className={ styles.link } to="/contacts" onClick={ toggleMenu }>Contacts</Link>
				<Link className={ styles.link } to="/basket" onClick={ toggleMenu }>Basket</Link>
			</div>
		</div>
	);
};

export default Navbar;