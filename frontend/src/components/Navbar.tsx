import React, { FC, useRef, useState } from 'react';
import { Link } from 'react-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import styles from './Navbar.module.css'; // Todo fix import

const Navbar: FC = () => {
	const toggleMenuButton = useRef<HTMLDivElement>();
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};


	const links =
		<div className={ `${ styles.link__wrapper } ${ styles.link__wrapper_mobile }` }>
			<Link className={ styles.link } to="/" onClick={ () => setShowMenu(false) }>Main</Link>
			<Link className={ styles.link } to="/shop" onClick={ () => setShowMenu(false) }>Shop</Link>
			<Link className={ styles.link } to="/contacts" onClick={ () => setShowMenu(false) }>Contacts</Link>
			<Link className={ styles.link } to="/basket" onClick={ () => setShowMenu(false) }>Basket</Link>
		</div>;

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
			<div className={ styles.link__wrapper }>
				<Link className={ styles.link } to="/">Main</Link>
				<Link className={ styles.link } to="/shop">Shop</Link>
				<Link className={ styles.link } to="/contacts">Contacts</Link>
				<Link className={ styles.link } to="/basket">Basket</Link>
			</div>
			{ showMenu ? links : false }
		</div>
	);
};

export default Navbar;