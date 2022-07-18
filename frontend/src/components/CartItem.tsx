import React, { FC, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { Link } from 'react-location';
import styles from './CartItem.module.css';
import { removeItem, noImage } from '../assets';
import { SetPrice } from './UI';
import { ICartItem } from '../models';
import {
	getCurrentCart,
	changeDateStart,
	changeDuration,
	removeFromCart,
	addHoursToDatetime,
	flatpickrConfig,
} from '../utils';

interface CartItemProps extends ICartItem {
	updateCartState: any,
	recalculateCheckout: any,
	setNewCheckout: any
}

const CartItem: FC<CartItemProps> = ({
	item,
	itemId,
	size,
	duration,
	start,
	checkout,
	updateCartState,
	recalculateCheckout,
	setNewCheckout,
}) => {
	const [expiresDatetime, setExpiresDatetime] = useState<undefined | Date>(undefined);

	const setExpiresDatetimeFunction = (selectedDates: any, dateStr: any, newDuration: number) => {
		const expiredDatetime: string | null = addHoursToDatetime(selectedDates, dateStr, newDuration);
		expiredDatetime && setExpiresDatetime(new Date(expiredDatetime));
	};

	const changeDateHandler = (selectedDates: any, dateStr: any, duration1: number = duration) => {
		const currentDateTime: string = selectedDates[0];
		changeDateStart(itemId, currentDateTime);
		setExpiresDatetimeFunction(selectedDates, dateStr, duration1);
		updateCartState(getCurrentCart());
	};

	const removeItemHandler = () => {
		removeFromCart(itemId);
		updateCartStateAndRecalculate();
	};

	const changeHour = (e: any) => {
		const updatedDuration: number = Number(e);

		changeDuration(itemId, updatedDuration);
		changeDateHandler([new Date(start)], new Date(start), updatedDuration);
		updateCartStateAndRecalculate();
	};

	const updateCartStateAndRecalculate = () => {
		const currentCart: ICartItem[] = getCurrentCart();

		updateCartState(currentCart);
		setNewCheckout(recalculateCheckout(currentCart));
	};

	return (
		<div className={ styles.cart_item }>
			<div className={ styles.cart_item__info }>
				<div className={ styles.cart_item__prev__wrapper }>
					<img className={ styles.cart_item__prev } src={ item?.image || noImage } alt="prev"/>
				</div>
				<div className={ styles.cart_item__info_container }>
					<Link className={ styles.cart_item__title } to={ `/item/${ item?.eid }` }>{ item?.title }</Link>
					<div className={ styles.cart_item__datetime_container }>
						<h3 className={ styles.cart_item__datetime_text }>From: </h3>
						<Flatpickr
							className={ styles.cart_item__datetime_starts }
							placeholder="Rent ends..."
							onReady={ (selectedDates, datesStr) => setExpiresDatetimeFunction(selectedDates, datesStr, duration) }
							onChange={ (selectedDates, datesStr) => changeDateHandler(selectedDates, datesStr) }
							options={ flatpickrConfig }
							defaultValue={ flatpickr.formatDate(new Date(start), 'F j, Y H:i') }
						/>
						<h3 className={ styles.cart_item__datetime_text }>To: </h3>
						<Flatpickr
							className={ styles.cart_item__datetime_starts }
							placeholder="Rent ends..."
							value={ expiresDatetime }
							disabled
							options={ flatpickrConfig }
						/>
					</div>
				</div>
			</div>
			<div className={ styles.cart_item__pricing }>
				<SetPrice value={ duration } changeValue={ changeHour }/>
				<h4 className={ styles.cart_item__hours }>hours</h4>
				<h2 className={ styles.cart_item__price }>{ checkout }$</h2>
				<img className={ styles.cart_item__cancel } src={ removeItem } alt="Remove"
				     onClick={ removeItemHandler }/>
			</div>
		</div>
	);
};

export default CartItem;