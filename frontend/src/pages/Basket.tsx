import React, { FC } from 'react';
// @ts-ignore
import styles from './Basket.module.css';
// @ts-ignore
import cartpng from '../assets/cart.png'; // Todo fix import
// @ts-ignore
import test1 from '../assets/test1.jpg'; // Todo fix import
import CartItem from '../components/CartItem';

const Basket: FC = () => {
	return (
		<div className={ styles.basket__wrapper }>
			<div className={ styles.basket }>
				{/*<div className={ styles.empty_basket }>*/}
				{/*	<img className={ styles.empty_basket_logo } src={ cartpng } alt="empty"/>*/}
				{/*	<h4 className={ styles.empty_basket__header }>The cart is empty</h4>*/}
				{/*	<p className={ styles.empty_basket__subtitle }>But it's never too late to fix it :)</p>*/}
				{/*</div>*/}

				<CartItem />
				<CartItem />
				<CartItem />
				<CartItem />

				<div className={styles.checkout}>
					<h3 className={styles.price}>375<span> $</span></h3>
					<div className={styles.checkout__button}>Checkout</div>
				</div>
			</div>
		</div>
	);
};

export default Basket;