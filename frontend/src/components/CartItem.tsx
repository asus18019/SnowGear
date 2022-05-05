import React, { FC } from 'react';
// @ts-ignore
import styles from './CartItem.module.css';
// @ts-ignore
import test1 from '../assets/test1.jpg'; // Todo fix import
// @ts-ignore
import cancel from '../assets/cancel-item.png'; // Todo fix import
import SetPrice from './UI/SetPrice';

const CartItem: FC = () => {
	return (
		<div className={ styles.cart_item }>
			<div className={ styles.cart_item__info }>
				<img className={ styles.cart_item__prev } src={ test1 } alt="prev"/>
				<h2 className={ styles.cart_item__title }>Atomic Vantage 77 Ti Skis w/ M10 GW Bindings Womens</h2>
			</div>
			<div className={ styles.cart_item__pricing }>
				<SetPrice />
				<h4 className={ styles.cart_item__hours }>hours</h4>
				<h2 className={ styles.cart_item__price }>75$</h2>
				<img className={ styles.cart_item__cancel } src={ cancel } alt=""/>
			</div>
		</div>
	);
};

export default CartItem;