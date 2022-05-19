import React, { FC, useState } from 'react';
import { useMatch } from 'react-location';
// @ts-ignore
import styles from './Basket.module.css';
// @ts-ignore
import cartpng from '../assets/cart.png'; // Todo fix import
// @ts-ignore
import test1 from '../assets/test1.jpg'; // Todo fix import
import CartItem from '../components/CartItem';
import { LocationGenerics } from '../router/router';
import { ICartItem } from '../models/ICartItem';

const Basket: FC = () => {
	const { cartGoods } = useMatch<LocationGenerics>().data;

	const [cart, setCart] = useState<ICartItem[]>((cartGoods && cartGoods) || []);

	const [totalCheckout, setTotalCheckout] = useState<number>(countTotalCheckout(cart));

	function countTotalCheckout(cart: ICartItem[]): number {
		if(cart[0]) {
			return cart.reduce((sum, current) => {
				return sum + current.checkout;
			}, 0);
		}

		return 0;
	}

	return (
		<div className={ styles.basket__wrapper }>
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
										changeCart={ setCart }
										recalculateCheckout={ countTotalCheckout }
										setNewCheckout={ setTotalCheckout }
									/>;
								})
							}
							<div className={ styles.checkout }>
								<h3 className={ styles.price }>{ totalCheckout }<span> $</span></h3>
								<div className={ styles.checkout__button }>Checkout</div>
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