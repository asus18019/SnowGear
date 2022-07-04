import React from 'react';
import styles from './Account.module.css';
import Cookies from 'js-cookie';
import { Outlet, Router, Link, useNavigate } from 'react-location';
import { location1, accountRoutes } from '../router/accountRouter';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/reducers/AuthenticatedUserSlice';
import { userState } from '../store/reducers/AuthenticatedUserSlice';
import { Loader } from '../components/UI';

const Account = () => {
	const dispatch = useAppDispatch();
	const userState: userState = useAppSelector(state => state.userReducer);
	const navigate = useNavigate();

	if(!userState.isAuthenticated) {
		navigate({ to: '../../login', fromCurrent: true });
	}

	const { isLoading } = useAppSelector(state => state.loaderReducer);


	const handleLogout = (e: any) => {
		e.preventDefault();
		Cookies.remove('token');
		dispatch(logout());
		navigate({ to: '../../', fromCurrent: true });
	};

	return (
		<div className={ styles.account__wrapper }>
			{ isLoading ? <Loader /> : false }
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
								{
									userState.user && userState.user?.role_id >= 2
										? <li className={ styles.menu__item }>
											<Link className={ styles.menu__item_link } to="/account/returnitem">
												<svg id="Layer_1" className={ styles.menu__icon } data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Back</title><path d="M352,170.667H94.17l70.249-70.248a21.334,21.334,0,1,0-30.171-30.171L27.581,176.915a21.336,21.336,0,0,0,0,30.171L134.248,313.752a21.334,21.334,0,1,0,30.171-30.171L94.17,213.333H352a96,96,0,0,1,0,192H128A21.333,21.333,0,1,0,128,448H352c76.461,0,138.667-62.205,138.667-138.667S428.461,170.667,352,170.667Z"/></svg>
												Return item
											</Link>
										</li>
										: false
								}
								{
									userState.user && userState.user?.role_id === 2
										? <><li className={ styles.menu__item }>
											<Link className={ styles.menu__item_link } to="/account/users">
												<svg id="Layer_1" className={ styles.menu__icon } xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 354.856 354.856" enableBackground="new 0 0 354.856 354.856" xmlSpace="preserve"><path fill="#333E48" d="M307.943,199.173c16.571-15.084,26.979-36.832,26.979-61.008c0-45.55-36.925-82.474-82.474-82.474c-33.914,0-63.045,20.476-75.713,49.737c15.541,17.534,24.992,40.582,24.992,65.8c0,21.149-6.804,41.654-19.089,58.524c11.606,10.24,21.178,22.617,28.169,36.35h144.049C348.867,237.946,331.568,213.976,307.943,199.173z"/><path fill="#61B4E4" d="M0,299.166h204.811c-5.986-28.155-23.285-52.126-46.912-66.929c16.573-15.084,26.979-36.832,26.979-61.009c0-45.549-36.924-82.474-82.474-82.474c-45.545,0-82.471,36.925-82.471,82.474c0,24.177,10.404,45.925,26.978,61.009C23.284,247.04,5.986,271.01,0,299.166z"/></svg>
												Users list
											</Link>
										</li>
										<li className={ styles.menu__item }>
											<Link className={ styles.menu__item_link } to="/account/equipments">
												<svg className={ styles.menu__icon } version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 414.93 414.93" xmlSpace="preserve"><path d="M393.832,21.097C379.603,6.868,359.894-0.798,339.809,0.066c-20.12,0.865-39.099,10.201-52.07,25.616C208.28,120.109,120.111,208.277,25.682,287.738C10.267,300.71,0.93,319.689,0.066,339.809c-0.863,20.104,6.803,39.794,21.032,54.024c13.505,13.505,31.928,21.097,50.955,21.097c1.021,0,2.044-0.022,3.067-0.066c20.12-0.864,39.1-10.201,52.071-25.617c79.459-94.427,167.628-182.595,262.056-262.055c15.415-12.972,24.752-31.952,25.616-52.072C415.728,55.017,408.062,35.326,393.832,21.097z M271.902,62.563V216.87c-5.084,4.906-10.147,9.833-15.184,14.788V79.781C261.811,74.067,266.872,68.328,271.902,62.563z M118.01,381.521c-10.973,13.039-26.388,20.623-43.404,21.354c-16.999,0.732-32.988-5.494-45.023-17.528c-12.033-12.033-18.258-28.023-17.527-45.023c0.73-17.017,8.314-32.432,21.354-43.404c31.849-26.8,62.97-54.607,93.31-83.285v157.651C123.812,374.695,120.893,378.095,118.01,381.521z M138.718,357.323v-155.09c36.595-35.12,71.972-71.551,106-109.101v150.399C208.013,280.208,172.633,318.208,138.718,357.323z M402.875,74.605c-0.731,17.018-8.315,32.433-21.354,43.405c-33.359,28.071-65.921,57.245-97.619,87.371V48.71c4.361-5.085,8.708-10.18,13.019-15.302c10.972-13.039,26.387-20.623,43.403-21.354c16.999-0.734,32.99,5.494,45.024,17.528C397.38,41.615,403.605,57.604,402.875,74.605z"/></svg>
												Equipments
											</Link>
										</li></>
										: false
								}

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