import React, { FC, useState } from 'react';
import { useMatch, useNavigate } from 'react-location';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { OnApproveData, OnApproveActions, CreateOrderActions } from '@paypal/paypal-js/types/components/buttons';
import styles from './Basket.module.css';
import { cart as cartImg } from '../assets';
import CartItem from '../components/CartItem';
import { LocationGenerics } from '../router/router';
import { ICartItem } from '../models';
import { useAppSelector } from '../hooks/redux';
import fetchResource from '../api/apiWrapper';
import moment from 'moment';
import { IModal } from './Login';
import { ModalWindow } from '../components/UI';
import { ModalTypes } from '../utils';

const Basket: FC = () => {
	const navigate = useNavigate();
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
		if(cart.length) {
			const res: number = cart.reduce((sum, current) => {
				return sum + current.checkout;
			}, 0);

			return Number(res.toFixed(2));
		}

		return 0;
	}

	const handleCreateOrder = (data: Record<string, unknown>, actions: CreateOrderActions): Promise<string> => {
		if(!userState.isAuthenticated) {
			navigate({ to: '../login', fromCurrent: true });
			return Promise.resolve('0');
		}

		return fetchResource('paypal/order/create', {
			method: 'POST',
			body: JSON.stringify({ id: userState.user?.id, equipments: getCartItems() }),
		}, true)
			.then(response => {
				console.log(response);
				return response.id;
			});
	};

	const handleOnApprove = (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
		return fetchResource(`paypal/${data.orderID}/capture`, {
			method: 'POST'
		}, true)
			.then(res => {
				console.log(res);
				localStorage.removeItem('cart');
				setCart([]);
				setModal({ type: ModalTypes.success, information: ['Successfully payed. Check your account rents'] });
			});
	};

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
					cart.length
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
										createOrder={ (data: Record<string, unknown>, actions: CreateOrderActions) => handleCreateOrder(data, actions) }
										onApprove={ (data: OnApproveData, actions: OnApproveActions) => handleOnApprove(data, actions) }
									/>
								</PayPalScriptProvider>
							</div>
						</>
						: <div className={ styles.empty_basket }>
							<img className={ styles.empty_basket_logo } src={ cartImg } alt="empty"/>
							<h4 className={ styles.empty_basket__header }>The cart is empty</h4>
							<p className={ styles.empty_basket__subtitle }>But it's never too late to fix it :)</p>
						</div>
				}
			</div>
		</div>
	);
};

export default Basket;