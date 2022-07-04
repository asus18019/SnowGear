import React, { FC, useState } from 'react';
import { useMatch, useNavigate } from 'react-location';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import styles from './Basket.module.css';
import cartpng from '../assets/cart.png';
import CartItem from '../components/CartItem';
import { LocationGenerics } from '../router/router';
import { ICartItem } from '../models/ICartItem';
import { useAppSelector } from '../hooks/redux';
import fetchResource from '../api/apiWrapper';
import moment from 'moment';
import { IModal } from './Login';
import ModalWindow from '../components/UI/ModalWindow';
import { ModalTypes } from '../utils/modalTypes';

const Basket: FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAppSelector(state => state.userReducer);
	const { cartGoods } = useMatch<LocationGenerics>().data;
	const userState = useAppSelector(state => state.userReducer);

	const [cart, setCart] = useState<ICartItem[]>(cartGoods || []);
	const [modal, setModal] = useState<IModal | undefined>(undefined);

	const [totalCheckout, setTotalCheckout] = useState<number>(countTotalCheckout(cart));

	const initialOptions = {
		'client-id': 'AReEDraM-UKgnUXLV7OVtJKzjt-Wv0WdhtNl77e6sTF2xFuCwWPW6vdrY-OPZKnP9Hru-yVNrO2kbREk',
		currency: 'USD',
		intent: 'capture',
	};

	const getCartItems = () => {
		const cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') || '{}');
		return cart?.map(elem => {
			const date_end = moment(elem.start).add(elem.duration, 'hours').format();
			return { eid: elem.item?.eid, date_start: elem.start, date_end, duration: Number(elem.duration) };
		});
	};

	function countTotalCheckout(cart: ICartItem[]): number {
		if(cart[0]) {
			const res: number = cart.reduce((sum, current) => {
				return sum + current.checkout;
			}, 0);

			return Number(res.toFixed(2));
		}

		return 0;
	}

	return (
		<div className={ styles.basket__wrapper }>
			{
				modal
					? <ModalWindow type={ modal.type } information={ modal.information }
					               closeHandler={ () => setModal(undefined) }/>
					: false
			}
			<div className={ styles.basket }>
				{
					cart[0]
						? <>
							{
								cart.map(item => {
									return <CartItem
										key={ item.itemId }
										itemId={ item.itemId }
										item={ item.item }
										size={ item.size }
										duration={ item.duration }
										start={ item.start }
										checkout={ item.checkout }
										updateCartState={ setCart }
										recalculateCheckout={ countTotalCheckout }
										setNewCheckout={ setTotalCheckout }
									/>;
								})
							}
							<div className={ styles.checkout }>
								<h3 className={ styles.price }>{ totalCheckout }<span> $</span></h3>
								<PayPalScriptProvider options={ initialOptions }>
									<PayPalButtons
										style={ { layout: 'vertical' } }
										// @ts-ignore
										createOrder={ (data, actions) => {
											if(!isAuthenticated) {
												return navigate({ to: '../login', fromCurrent: true });
											}

											return fetchResource('paypal/order/create', {
												method: 'POST',
												body: JSON.stringify({ id: userState.user?.id, equipments: getCartItems() }),
											}, true)
												.then((response) => {
													console.log(response);
													return response.id;
												});
										} }
										onApprove={ (data, actions) => {
											console.log(data);
											return fetchResource(`paypal/${data.orderID}/capture`, {
												method: 'POST'
											}, true)
												.then(res => {
													console.log(res);
													localStorage.removeItem('cart');
													setCart([]);
													setModal({ type: ModalTypes.success, information: ['Successfully payed. Check your account rents'] });
												});
										} }
									/>
								</PayPalScriptProvider>
							</div>
						</>
						: <div className={ styles.empty_basket }>
							<img className={ styles.empty_basket_logo } src={ cartpng } alt="empty"/>
							<h4 className={ styles.empty_basket__header }>The cart is empty</h4>
							<p className={ styles.empty_basket__subtitle }>But it's never too late to fix it :)</p>
						</div>
				}
			</div>
		</div>
	);
};

export default Basket;