import React from 'react';
// @ts-ignore
import styles from './Account.module.css';
import { Outlet, Router, Link, useNavigate } from 'react-location';
import { location1, accountRoutes } from '../router/accountRouter';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/reducers/AuthenticatedUserSlice';
import { userState } from '../store/reducers/AuthenticatedUserSlice';

const Account = () => {
	const dispatch = useAppDispatch();
	const userState: userState = useAppSelector(state => state.userReducer);
	const navigate = useNavigate();

	const handleLogout = (e: any) => {
		e.preventDefault();
		Cookies.remove('token');
		dispatch(logout());
		navigate({ to: '../../', fromCurrent: true });
	};

	// @ts-ignore
	return (
		<div className={ styles.account__wrapper }>
			<Router routes={ accountRoutes } location={ location1 }>
				<div className={ styles.account }>
					<div className={ styles.account__topbar }>
						<div className={ styles.navbar__name_wrapper }>
							<h3 className={ styles.navbar__name }>{ userState.user?.name } { userState.user?.surname }</h3>
							<p className={ styles.navbar__subtitle }>Your personal account</p>
						</div>
						<div className={ styles.navbar__exit } onClick={ e => handleLogout(e) }>Sign out</div>
					</div>
					<div className={ styles.account__content }>
						<div className={ styles.account__navbar }>
							<ul>
								<li className={ styles.menu__item }>
									<Link className={ styles.menu__item_link } to="account/profile">
										<svg className={ styles.menu__icon } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"/></svg>
										Account
									</Link>
								</li>
								<li className={ styles.menu__item }>
									<Link className={ styles.menu__item_link } to="/account/currentorders">
										<svg className={ styles.menu__icon } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>My_order</title><g id="My_order"><path d="M424.2246,48H129.834a7.9979,7.9979,0,0,0-8,8V354.4609a134.7167,134.7167,0,0,1-39.7148,95.8829A7.9993,7.9993,0,0,0,87.7754,464H382.17a8.0011,8.0011,0,0,0,5.6563-2.3437,150.6035,150.6035,0,0,0,44.3984-107.1954V56A7.9979,7.9979,0,0,0,424.2246,48Zm-8,306.4609A134.68,134.68,0,0,1,378.8027,448H105.5645a150.4468,150.4468,0,0,0,32.27-93.5391V64H416.2246Z"/><path d="M185.2715,164.7656H368.7871a8,8,0,0,0,0-16H185.2715a8,8,0,0,0,0,16Z"/><path d="M185.2715,218.9688H368.7871a8,8,0,0,0,0-16H185.2715a8,8,0,0,0,0,16Z"/><path d="M185.2715,273.1719H368.7871a8,8,0,0,0,0-16H185.2715a8,8,0,0,0,0,16Z"/><path d="M185.2715,327.375H368.7871a8,8,0,0,0,0-16H185.2715a8,8,0,0,0,0,16Z"/></g></svg>
										Current orders
									</Link>
								</li>
								<li className={ styles.menu__item }>
									<Link className={ styles.menu__item_link } to="/account/returnitem">
										<svg id="Layer_1" className={ styles.menu__icon } data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Back</title><path d="M352,170.667H94.17l70.249-70.248a21.334,21.334,0,1,0-30.171-30.171L27.581,176.915a21.336,21.336,0,0,0,0,30.171L134.248,313.752a21.334,21.334,0,1,0,30.171-30.171L94.17,213.333H352a96,96,0,0,1,0,192H128A21.333,21.333,0,1,0,128,448H352c76.461,0,138.667-62.205,138.667-138.667S428.461,170.667,352,170.667Z"/></svg>
										Return item
									</Link>
								</li>
							</ul>
						</div>
						<div className={ styles.account__info }>
							<Outlet />

						</div>
					</div>
				</div>
			</Router>
		</div>
	);
};

export default Account;