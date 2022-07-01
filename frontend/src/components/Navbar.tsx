import React, { FC, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import styles from './Navbar.module.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout, userState } from '../store/reducers/AuthenticatedUserSlice';

const Navbar: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const dropdownRef = useRef(null);
	const menuRef = useRef(null);

	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	const userState: userState = useAppSelector(state => state.userReducer);

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if(dropdownRef && dropdownRef.current) {
				// @ts-ignore
				dropdownRef.current.contains(e.target) || setShowDropdown(false);
			}
		};

		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if(menuRef && menuRef.current) {
				// @ts-ignore
				menuRef.current.contains(e.target) || setShowMenu(false);
			}
		};

		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const handleLogout = (e: any) => {
		e.preventDefault();
		Cookies.remove('token');
		dispatch(logout());
		navigate({ to: '../../', fromCurrent: true });
	};

	return (
		<div className={ styles.navbar } ref={ menuRef }>
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
				<div className={ styles.link__wrapper1 }>
					<Link className={ styles.link } to="/" onClick={ toggleMenu }>Main</Link>
					<Link className={ styles.link } to="/shop" onClick={ toggleMenu }>Shop</Link>
					<Link className={ styles.link } to="/contacts" onClick={ toggleMenu }>Contacts</Link>
					<Link className={ styles.link } to="/basket" onClick={ toggleMenu }>Basket</Link>
				</div>
				<div className={ styles.auth }>
					{ userState.isAuthenticated
						? <>
							<div className={ styles.menu__account_wrapper }
							     onClick={ () => setShowDropdown(!showDropdown) }
							     ref={ dropdownRef }>
								{ userState.user?.name }
								<FontAwesomeIcon
									className={ styles.menu__account_icon }
									icon={ faUser }
								/>
								{ showDropdown
									? <div className={ styles.menu__account_options }>
										<Link className={ styles.menu__account_link } to="/account/profile">Account</Link>
										<a className={ styles.menu__account_link }
										   onClick={ e => handleLogout(e) }>Logout</a>
									</div>
									: false
								}
							</div>

							{/* For mobile */ }
							<div className={ `${ styles.auth__link_wrapper } ${ styles.auth__account__mobile }` }>
								<Link className={ styles.link } to="/account/profile" onClick={ toggleMenu }>Account</Link>
								<a className={ styles.link } onClick={ e => {
									handleLogout(e);
									toggleMenu();
								} }>Logout</a>
							</div>
						</>
						: <div className={ styles.auth__link_wrapper }>
							<Link className={ styles.link } to="/login" onClick={ toggleMenu }>Log in</Link>
							<Link className={ styles.link } to="/registration" onClick={ toggleMenu }>Sign up</Link>
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default Navbar;